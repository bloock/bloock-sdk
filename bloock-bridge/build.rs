extern crate prost_build;
use convert_case::{Case, Casing};
use prost_build::{Service, ServiceGenerator};
use std::collections::HashMap;
use std::fmt::Write;
use std::io::Result;
use std::{env, fs};

fn main() -> Result<()> {
    let paths: Vec<String> = fs::read_dir("./proto")
        .unwrap()
        .into_iter()
        .map(|e| e.unwrap().path().display().to_string())
        .collect();

    prost_build::Config::new()
        .service_generator(Box::new(BloockBridgeServiceGenerator {
            service_methods: HashMap::new(),
        }))
        .compile_protos(paths.as_slice(), &["proto/"])?;

    let crate_dir = env::var("CARGO_MANIFEST_DIR").unwrap();

    cbindgen::Builder::new()
        .with_crate(crate_dir)
        .with_language(cbindgen::Language::C)
        .with_no_includes()
        .with_parse_expand(&["bloock-bridge"])
        .generate()
        .expect("Unable to generate bindings")
        .write_to_file("./build/native/bloock_bridge.h");

    Ok(())
}

struct BloockBridgeServiceGenerator {
    service_methods: HashMap<String, Vec<String>>,
}
impl ServiceGenerator for BloockBridgeServiceGenerator {
    fn generate(&mut self, service: Service, buf: &mut String) {
        self.service_methods.insert(
            service.name.clone(),
            service.methods.iter().map(|m| m.name.clone()).collect(),
        );
        buf.push_str("\n#[async_trait(?Send)]");
        write!(buf, "\npub trait {}Handler {{", service.name).unwrap();

        // Make match arms for each type
        for method in service.methods.iter() {
            write!(
                buf,
                "\n   \
                async fn {}(&self, input: &{}) -> Result<{}, String>;",
                method.name, method.input_type, method.output_type
            )
            .unwrap();
        }

        buf.push_str("\n}\n\n");

        for method in service.methods.iter() {
            write!(
                buf,
                "\nresponse_type_event!({}, {});",
                method.input_type, method.output_type
            )
            .unwrap();
        }

        buf.push_str("\n\n");
    }

    fn finalize_package(&mut self, _package: &str, buf: &mut String) {
        buf.push_str("use crate::server::response_types::{ResponseType, RequestConfigData, ToResponseType, ResponseTypeEvent};\n\n");
        buf.push_str("use crate::server::config::entity::{map_config};\n\n");

        let enum_name = format!("{}Server", _package.to_case(Case::UpperCamel));
        buf.push_str("\n\n");
        buf.push_str("use async_trait::async_trait;");
        buf.push_str("\n\n");
        buf.push_str("#[derive(Clone, Copy, Debug, PartialEq, Eq, Hash, PartialOrd, Ord, ::prost::Enumeration)]\n");
        buf.push_str("#[repr(i32)]\n");
        writeln!(buf, "pub enum {enum_name} {{").unwrap();

        let mut i = 0;
        for service in self.service_methods.iter() {
            for method in service.1 {
                let method_name = format!("{}_{}", service.0, method).to_case(Case::UpperCamel);
                writeln!(buf, "\t{method_name} = {i},").unwrap();
                i += 1;
            }
        }

        writeln!(buf, "\tUnknown = {i},").unwrap();
        buf.push_str("}\n");

        buf.push_str("\n\n");
        writeln!(buf, "impl {enum_name} {{").unwrap();
        buf.push_str("\tpub fn as_str(&self) -> &'static str {\n");
        buf.push_str("\t\tmatch self {\n");

        for service in self.service_methods.iter() {
            for method in service.1 {
                let method_name = format!("{}_{}", service.0, method).to_case(Case::UpperCamel);
                let method_str = format!(
                    "\"/{}.{}/{}\"",
                    _package,
                    service.0,
                    method.to_case(Case::UpperCamel)
                );
                writeln!(buf, "\t\t\t{enum_name}::{method_name} => {method_str},\n").unwrap();
            }
        }
        buf.push_str("\t\t\t_ => \"unknown\",\n");

        buf.push_str("\t\t}\n");
        buf.push_str("\t}\n");

        writeln!(buf).unwrap();

        writeln!(buf, "\tpub fn from_str(s: &str) -> {enum_name} {{").unwrap();
        buf.push_str("\t\tmatch s {\n");
        for service in self.service_methods.iter() {
            for method in service.1 {
                let method_name = format!("{}_{}", service.0, method).to_case(Case::UpperCamel);
                let method_str = format!(
                    "\"/{}.{}/{}\"",
                    _package,
                    service.0,
                    method.to_case(Case::UpperCamel)
                );
                writeln!(buf, "\t\t\t {method_str} => {enum_name}::{method_name},").unwrap();
            }
        }
        buf.push_str("\t\t\t _ => BloockServer::Unknown,\n");

        buf.push_str("\t\t}\n");
        buf.push_str("\t}\n");
        buf.push_str("}\n");
    }
}
