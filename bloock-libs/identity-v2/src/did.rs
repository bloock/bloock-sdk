use std::{collections::HashMap, sync::Mutex};

use base58::FromBase58;
use lazy_static::lazy_static;
use serde::{Deserialize, Serialize};

pub const DID_ID_LEN: usize = 31;
pub const EMPTY_ID: [u8; 31] = [0u8; 31];

pub type Id = [u8; DID_ID_LEN];

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, Hash)]
pub enum DIDMethod {
    Iden3,
    PolygonID,
}

impl DIDMethod {
    pub fn new(method: &str) -> Result<DIDMethod, String> {
        match method {
            "iden3" => Ok(DIDMethod::Iden3),
            "polygonid" => Ok(DIDMethod::PolygonID),
            _ => Err("Invalid did method provided".to_string()),
        }
    }

    pub fn get_method_type(&self) -> String {
        match self {
            DIDMethod::Iden3 => "iden3".to_string(),
            DIDMethod::PolygonID => "polygonid".to_string(),
        }
    }
}

type DidMethodByteMap = HashMap<DIDMethod, u8>;

lazy_static! {
    static ref DID_METHOD_BYTE: Mutex<DidMethodByteMap> = {
        let mut map = DidMethodByteMap::new();
        map.insert(DIDMethod::Iden3, 0b00000001);
        map.insert(DIDMethod::PolygonID, 0b00000010);
        Mutex::new(map)
    };
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, Hash)]
pub enum Blockchain {
    Ethereum,
    Polygon,
}

impl Blockchain {
    pub fn new(method: &str) -> Result<Blockchain, String> {
        match method {
            "eth" => Ok(Blockchain::Ethereum),
            "polygon" => Ok(Blockchain::Polygon),
            _ => Err("Invalid bloockchain type provided".to_string()),
        }
    }

    pub fn get_bloockchain_type(&self) -> String {
        match self {
            Blockchain::Ethereum => "eth".to_string(),
            Blockchain::Polygon => "polygon".to_string(),
        }
    }
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, Hash)]
pub enum Network {
    Main,
    Mumbai,
    Goerli,
}

impl Network {
    pub fn new(method: &str) -> Result<Network, String> {
        match method {
            "main" => Ok(Network::Main),
            "mumbai" => Ok(Network::Mumbai),
            "goerli" => Ok(Network::Goerli),
            _ => Err("Invalid network type provided".to_string()),
        }
    }

    pub fn get_network_id_type(&self) -> String {
        match self {
            Network::Main => "main".to_string(),
            Network::Mumbai => "mumbai".to_string(),
            Network::Goerli => "goerli".to_string(),
        }
    }
}
#[derive(Debug, Clone, PartialEq, Eq, Hash)]
struct DIDNetworkFlag {
    blockchain: Blockchain,
    network_id: Network,
}

type DIDNetworkMap = HashMap<DIDNetworkFlag, u8>;
type DIDMethodNetworkMap = HashMap<DIDMethod, DIDNetworkMap>;

lazy_static! {
    static ref DID_METHOD_NETWORK: Mutex<DIDMethodNetworkMap> = {
        let mut did_method_network = DIDMethodNetworkMap::new();

        let mut iden3_map = DIDNetworkMap::new();
        iden3_map.insert(
            DIDNetworkFlag {
                blockchain: Blockchain::Polygon,
                network_id: Network::Main,
            },
            0b00010000 | 0b00000001,
        );
        iden3_map.insert(
            DIDNetworkFlag {
                blockchain: Blockchain::Polygon,
                network_id: Network::Mumbai,
            },
            0b00010000 | 0b00000010,
        );
        iden3_map.insert(
            DIDNetworkFlag {
                blockchain: Blockchain::Ethereum,
                network_id: Network::Main,
            },
            0b00100000 | 0b00000001,
        );
        iden3_map.insert(
            DIDNetworkFlag {
                blockchain: Blockchain::Ethereum,
                network_id: Network::Goerli,
            },
            0b00100000 | 0b00000010,
        );
        did_method_network.insert(DIDMethod::Iden3, iden3_map);

        let mut polygon_id_map = DIDNetworkMap::new();
        polygon_id_map.insert(
            DIDNetworkFlag {
                blockchain: Blockchain::Polygon,
                network_id: Network::Main,
            },
            0b00010000 | 0b00000001,
        );
        polygon_id_map.insert(
            DIDNetworkFlag {
                blockchain: Blockchain::Polygon,
                network_id: Network::Mumbai,
            },
            0b00010000 | 0b00000010,
        );
        did_method_network.insert(DIDMethod::PolygonID, polygon_id_map);

        Mutex::new(did_method_network)
    };
}

pub struct Did {
    pub method: DIDMethod,
    pub blockchain: Blockchain,
    pub network_id: Network,
    pub id: Id,
}

impl Did {
    pub fn default() -> Self {
        Self {
            method: DIDMethod::Iden3,
            blockchain: Blockchain::Ethereum,
            network_id: Network::Main,
            id: [0u8; DID_ID_LEN],
        }
    }

    fn validate(&self) -> Result<(), String> {
        let d = parse_did_from_id(self.id)?;

        if d.method != self.method {
            return Err(format!(
                "Did method of core identity {0} differs from given did method {1}",
                d.method.get_method_type(),
                self.method.get_method_type(),
            ));
        }

        if d.network_id != self.network_id {
            return Err(format!(
                "Network method of core identity {0} differs from given did network specific id {1}",
                d.network_id.get_network_id_type(),
                self.network_id.get_network_id_type(),
            ));
        }

        if d.blockchain != self.blockchain {
            return Err(format!(
                "Blockchain network of core identity {0} differs from given did blockchain network {1}",
                d.blockchain.get_bloockchain_type(),
                self.blockchain.get_bloockchain_type(),
            ));
        }

        Ok(())
    }
}

pub fn parse_did(did_str: String) -> Result<Did, String> {
    let mut did = Did::default();
    let args: Vec<&str> = did_str.split(':').collect();
    if args.len() <= 1 {
        return Err("Invalid did format".to_string());
    }

    did.method = DIDMethod::new(args[1])?;

    match args.len() {
        5 => {
            did.blockchain = Blockchain::new(args[2])?;
            did.network_id = Network::new(args[3])?;

            did.id = id_from_string(args[4].to_owned())?;
        }
        3 => {
            did.id = id_from_string(args[4].to_owned())?;
        }
        _ => return Err("Invalid did format".to_string()),
    }

    did.validate()?;

    Ok(did)
}

fn parse_did_from_id(id: Id) -> Result<Did, String> {
    let mut did = Did {
        id,
        ..Did::default()
    };
    let typ = get_type(&id); // Use a different method name if "Type" has a conflict

    did.method = find_did_method_by_value(typ[0])?;
    did.blockchain = find_blockchain_for_did_method_by_value(did.method.clone(), typ[1])?;
    did.network_id = find_network_id_for_did_method_by_value(did.method.clone(), typ[1])?;

    Ok(did)
}

fn get_type(id: &Id) -> [u8; 2] {
    let mut typ = [0; 2];
    typ.copy_from_slice(&id[..2]);
    typ
}

fn find_did_method_by_value(value: u8) -> Result<DIDMethod, String> {
    let did_method_byte = DID_METHOD_BYTE.lock().unwrap();

    for (method, &v) in did_method_byte.iter() {
        if v == value {
            return Ok(method.clone());
        }
    }

    Err("Invalid did method".to_string())
}

fn find_blockchain_for_did_method_by_value(
    method: DIDMethod,
    value: u8,
) -> Result<Blockchain, String> {
    let did_method_network = DID_METHOD_NETWORK.lock().unwrap();
    match did_method_network.get(&method) {
        Some(network_map) => {
            for (network_flag, &v) in network_map.iter() {
                if v == value {
                    return Ok(network_flag.blockchain.clone());
                }
            }
            Err("Network is not supported for did".to_string())
        }
        None => Err("Invalid did method".to_string()),
    }
}

fn find_network_id_for_did_method_by_value(
    method: DIDMethod,
    value: u8,
) -> Result<Network, String> {
    let did_method_network = DID_METHOD_NETWORK.lock().unwrap();
    match did_method_network.get(&method) {
        Some(network_map) => {
            for (network_flag, &v) in network_map.iter() {
                if v == value {
                    return Ok(network_flag.network_id.clone());
                }
            }
            Err("Network is not supported for did".to_string())
        }
        None => Err("Invalid did method".to_string()),
    }
}

fn id_from_string(s: String) -> Result<Id, String> {
    let b = s.from_base58().unwrap();
    if b.len() != 31 {
        return Err("ID byte array incorrect length".to_string());
    }
    if b == &EMPTY_ID {
        return Err("ID byte array incorrect length".to_string());
    }

    let mut b_id = [0u8; DID_ID_LEN];
    b_id.copy_from_slice(&b[0..DID_ID_LEN]);

    if !check_checksum(b_id)? {
        return Err("Invalid checksum".to_string());
    }

    Ok(b_id)
}

fn check_checksum(id: Id) -> Result<bool, String> {
    let (typ, genesis, checksum) = decompose_id(id);

    if checksum == [0, 0] {
        return Ok(false);
    }

    let c = calculate_checksum(typ, genesis);

    Ok(checksum == c)
}

fn calculate_checksum(typ: [u8; 2], genesis: [u8; 27]) -> [u8; 2] {
    let mut to_checksum = [0u8; 29];
    to_checksum[..2].copy_from_slice(&typ);
    to_checksum[2..].copy_from_slice(&genesis);

    let mut s: u16 = 0;
    for b in to_checksum.iter() {
        s += u16::from(*b);
    }

    s = s.to_le(); // Convert to little-endian representation

    let checksum_bytes: [u8; 2] = s.to_le_bytes();
    checksum_bytes.try_into().unwrap()
}

fn decompose_id(id: Id) -> ([u8; 2], [u8; 27], [u8; 2]) {
    let mut typ = [0u8; 2];
    let mut genesis = [0u8; 27];
    let mut checksum = [0u8; 2];

    typ.copy_from_slice(&id[..2]);
    genesis.copy_from_slice(&id[2..29]);
    checksum.copy_from_slice(&id[29..]);

    (typ, genesis, checksum)
}
