// macro_rules! proto_response_type_from {
//     ($res:ident) => {
//         impl From<Result<$res, String>> for ResponseType {
//             fn from(res: $res) -> Self {
//                 ResponseType::$res(res)
//             }
//         }
//     };
// }

macro_rules! response_type_event {
    ($req:ident, $res:ident) => {
        impl ResponseTypeEvent<$req> for $res {}

        #[async_trait(?Send)]
        impl RequestConfigData for $req {
            fn get_config_data(
                &self,
            ) -> Result<bloock_core::config::config_data::ConfigData, String> {
                map_config(self.config_data.clone()).map_err(|_| "Invalid config data".to_string())
            }
        }

        #[async_trait(?Send)]
        impl ToResponseType<$req> for Result<$res, String> {
            async fn to_response_type(self, req: &$req) -> ResponseType {
                let res = match self {
                    Ok(res) => $res::new_success(req, res).await,
                    Err(e) => $res::new_error(req, e).await,
                };

                ResponseType::$res(res)
            }
        }
    };
}
