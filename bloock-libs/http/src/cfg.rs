macro_rules! cfg_wasm {
    ($($item:item)*) => {$(
        #[cfg(any(target_arch = "wasm32", target_arch = "wasm64"))]
        $item
    )*}
}

macro_rules! cfg_default {
    ($($item:item)*) => {$(
        #[cfg(not(any(target_arch = "wasm32", target_arch = "wasm64")))]
        $item
    )*}
}
