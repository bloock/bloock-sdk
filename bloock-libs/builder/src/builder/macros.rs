#[macro_export]
macro_rules! impl_builder {
    ($b:ident, $bp:ident, $n:ident, $p:ty, $d:ty) => {
        #[derive(Default)]
        pub struct $n {
            signer: Option<Box<dyn Signer>>,
            encrypter: Option<Box<dyn Encrypter>>,
            publisher: Option<Box<dyn Publisher>>,
            payload: $p,
        }

        impl $n {
            pub fn new(payload: $p) -> Self {
                Self {
                    payload,
                    ..$n::default()
                }
            }

            pub fn new_from_bytes(payload: Vec<u8>) -> Self {
                todo!();
                Self {
                    payload: <$p>::default(),
                    ..$n::default()
                }
            }
        }

        impl Builder for $n {
            type Document = $d;
            type PayloadType = $p;

            fn get_payload(&mut self) -> $p {
                self.payload.clone()
            }

            fn get_signer(&self) -> Option<&Box<dyn Signer>> {
                self.signer.as_ref()
            }
            fn get_encrypter(&self) -> Option<&Box<dyn Encrypter>> {
                self.encrypter.as_ref()
            }
            fn get_publisher(&self) -> Option<&Box<dyn Publisher>> {
                self.publisher.as_ref()
            }

            fn with_signer<S: Signer + 'static>(&mut self, signer: S) -> &mut Self {
                self.signer = Some(Box::new(signer));
                self
            }
            fn with_encrypter<E: Encrypter + 'static>(&mut self, encrypter: E) -> &mut Self {
                self.encrypter = Some(Box::new(encrypter));
                self
            }
            fn with_publisher<P: Publisher + 'static>(&mut self, publisher: P) -> &mut Self {
                self.publisher = Some(Box::new(publisher));
                self
            }
        }

        impl RecordBuilder {
            pub fn $b(&self, payload: $p) -> $n {
                $n::new(payload)
            }

            pub fn $bp(&self, uri: String) -> Result<$n> {
                let publisher = HostedPublisher::new(HostedPublisherArgs::default());
                let payload = publisher.retrieve(uri)?;
                Ok($n::new_from_bytes(payload))
            }
        }
    };
}
