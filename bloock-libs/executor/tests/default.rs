#![cfg(not(target_arch = "wasm32"))]

use bloock_executor::Executor;

#[test]
fn test_block_on_function() {
    let res = Executor::block_on(async_function()).unwrap();

    assert_eq!(res, 64, "Invalid value returned by future.");
}

async fn async_function() -> i64 {
    64
}
