use iref::IriBuf;
use locspan::Span;
use rdf_types::{BlankId, Quad, QuadRef};
use ssi::ldp::LinkedDataDocument;
use ssi::vc::Credential;
use ssi_json_ld::urdna2015::{
    hash_first_degree_quads, hash_n_degree_quads, issue_identifier, BlankNodeComponents,
    HashNDegreeQuadsOutput, IdentifierIssuer, NormalizationState,
};
use ssi_json_ld::{json_to_dataset, parse_ld_context, rdf::DataSet, ToRdfError};
use std::collections::BTreeMap;
use std::collections::HashSet;

pub async fn to_dataset_for_signing<L>(
    credential: &Credential,
    parent: Option<&(dyn LinkedDataDocument + Sync)>,
    context_loader: &mut L,
) -> Result<DataSet, Box<ToRdfError<L::Error, L::ContextError>>>
where
    L: json_ld::Loader<IriBuf, Span> + json_ld::ContextLoader<IriBuf, Span> + Send + Sync,
    L::Output: Into<json_ld::syntax::Value<Span>>,
    L::Error: Send,
    L::Context: Into<json_ld::syntax::context::Value<Span>>,
    L::ContextError: Send,
{
    let mut copy = credential.clone();
    copy.proof = None;
    let json = ssi_json_ld::syntax::to_value_with(copy, Default::default).unwrap();
    Ok(json_to_dataset(
        json,
        context_loader,
        parent
            .map(LinkedDataDocument::get_contexts)
            .transpose()
            .unwrap()
            .flatten()
            .as_deref()
            .map(parse_ld_context)
            .transpose()
            .unwrap(),
    )
    .await?)
}

pub fn normalize<'a, Q: IntoIterator<Item = QuadRef<'a>>>(quads: Q) -> Vec<Quad>
where
    Q::IntoIter: Clone,
{
    // https://www.w3.org/TR/rdf-canon/#algorithm
    // 1
    let mut normalization_state = NormalizationState {
        blank_node_to_quads: BTreeMap::new(),
        hash_to_blank_nodes: BTreeMap::new(),
        canonical_issuer: IdentifierIssuer::new("_:c14n".to_string()),
    };
    // 2
    let quads = quads.into_iter();
    for quad in quads.clone() {
        // 2.1
        for blank_node_identifier in quad.blank_node_components() {
            normalization_state
                .blank_node_to_quads
                .entry(blank_node_identifier)
                .or_insert_with(Vec::new)
                .push(quad);
        }
    }
    // 3
    let mut non_normalized_identifiers: HashSet<&BlankId> = normalization_state
        .blank_node_to_quads
        .keys()
        .cloned()
        .collect();
    // 4
    let mut simple = true;
    // 5
    while simple {
        // 5.1
        simple = false;
        // 5.2
        normalization_state.hash_to_blank_nodes.clear();
        // 5.3
        for identifier in non_normalized_identifiers.iter() {
            // 5.3.1
            let hash = hash_first_degree_quads(&mut normalization_state, identifier);
            // 5.3.2
            normalization_state
                .hash_to_blank_nodes
                .entry(hash)
                .or_insert_with(Vec::new)
                .push(identifier);
        }
        // 5.4
        let mut hashes_to_remove = Vec::new();
        for (hash, identifier_list) in normalization_state.hash_to_blank_nodes.iter() {
            // 5.4.1
            if identifier_list.len() > 1 {
                continue;
            }
            // 5.4.2
            let identifier = match identifier_list.iter().next() {
                Some(id) => id,
                None => continue,
            };
            // note: canonical issuer is not passed
            issue_identifier(&mut normalization_state.canonical_issuer, identifier);
            // 5.4.3
            non_normalized_identifiers.remove(identifier);
            // 5.4.4
            // Cannot remove while iterating
            hashes_to_remove.push(hash.clone());
            // 5.4.5
            simple = true;
        }
        for hash in hashes_to_remove {
            normalization_state.hash_to_blank_nodes.remove(&hash);
        }
        // 6
        // Clone normalization_state to avoid mutable borrow
        for (_hash, identifier_list) in normalization_state.hash_to_blank_nodes.clone() {
            // 6.1
            let mut hash_path_list: Vec<HashNDegreeQuadsOutput> = Vec::new();
            // 6.2
            for identifier in identifier_list {
                // 6.2.1
                if normalization_state
                    .canonical_issuer
                    .find_issued_identifier(identifier)
                    .is_some()
                {
                    continue;
                }
                // 6.2.2
                let mut temporary_issuer = IdentifierIssuer::new("_:b".to_string());
                // 6.2.3
                issue_identifier(&mut temporary_issuer, identifier);
                // 6.2.4
                hash_path_list.push(
                    hash_n_degree_quads(
                        &mut normalization_state,
                        identifier,
                        &mut temporary_issuer,
                    )
                    .unwrap(),
                );
            }
            // 6.3
            hash_path_list.sort_by(|a, b| a.hash.cmp(&b.hash));
            for result in hash_path_list {
                // 6.3.1
                let identifier_issuer = result.issuer;
                for (_, existing_identifier) in identifier_issuer.issued_identifiers_list {
                    issue_identifier(
                        &mut normalization_state.canonical_issuer,
                        &existing_identifier,
                    );
                }
            }
        }
    }

    let mut quads: Vec<Quad> = quads.map(|q| q.into()).collect();
    quads.sort();
    quads
}
