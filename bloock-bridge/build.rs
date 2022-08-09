extern crate prost_build;
use convert_case::{Case, Casing};
use prost_build::{Service, ServiceGenerator};
use std::collections::HashMap;
use std::io::Result;

fn main() -> Result<()> {
    prost_build::Config::new()
        .service_generator(Box::new(BloockBridgeServiceGenerator {
            service_methods: HashMap::new(),
        }))
        .compile_protos(
            &[
                "proto/bloock.proto",
                "proto/config.proto",
                "proto/anchor.proto",
            ],
            &["proto/"],
        )?;
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
        buf.push_str(&format!("\n#[async_trait(?Send)]"));
        buf.push_str(&format!("\npub trait {}Handler {{", service.name));

        // Make match arms for each type
        for method in service.methods.iter() {
            buf.push_str(&format!(
                "\n   \
                async fn {}(&self, input: {}) -> {};",
                method.name, method.input_type, method.output_type
            ));
        }
        // Final 404 arm and end fn
        buf.push_str(&format!("\n}}"));
    }

    fn finalize_package(&mut self, _package: &str, buf: &mut String) {
        let enum_name = format!("{}Server", _package.to_case(Case::UpperCamel));
        buf.push_str("\n\n");
        buf.push_str("use async_trait::async_trait;");
        buf.push_str("\n\n");
        buf.push_str("#[derive(Clone, Copy, Debug, PartialEq, Eq, Hash, PartialOrd, Ord, ::prost::Enumeration)]\n");
        buf.push_str("#[repr(i32)]\n");
        buf.push_str(&format!("pub enum {} {{\n", enum_name));

        let mut i = 0;
        for service in self.service_methods.iter() {
            for method in service.1 {
                let method_name = format!("{}_{}", service.0, method).to_case(Case::UpperCamel);
                buf.push_str(&format!("\t{} = {},\n", method_name, i));
                i += 1;
            }
        }

        buf.push_str(&format!("\tUnknown = {},\n", i));
        buf.push_str(&format!("}}\n"));

        buf.push_str("\n\n");
        buf.push_str(&format!("impl {} {{\n", enum_name));
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
                buf.push_str(&format!(
                    "\t\t\t{}::{} => {},\n",
                    enum_name, method_name, method_str
                ));
            }
        }
        buf.push_str("\t\t\t_ => \"unknown\",\n");

        buf.push_str(&format!("\t\t}}\n"));
        buf.push_str(&format!("\t}}\n"));

        buf.push_str(&format!("\n"));

        buf.push_str(&format!("\tpub fn from_str(s: &str) -> {} {{\n", enum_name));
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
                buf.push_str(&format!(
                    "\t\t\t {} => {}::{},\n",
                    method_str, enum_name, method_name
                ));
            }
        }
        buf.push_str("\t\t\t _ => BloockServer::Unknown,\n");

        buf.push_str(&format!("\t\t}}\n"));
        buf.push_str(&format!("\t}}\n"));
        buf.push_str(&format!("}}\n"));
    }
}
