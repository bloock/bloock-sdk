macro_rules! block_on {
    ($body:block) => {
        tokio::runtime::Builder::new_current_thread()
            .enable_all()
            .build()
            .unwrap()
            .block_on(async { $body.await })
    };
}

pub(crate) use block_on;
