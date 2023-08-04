use rand::{self, RngCore};
use uuid::Uuid;

pub fn rand_int64() -> Result<u64, String> {
    let mut rng = rand::thread_rng();
    let mut buf: [u8; 8] = [0; 8];

    // Fill the first 4 bytes of the buffer with random data
    rng.fill_bytes(&mut buf[..4]);

    // Convert the first 8 bytes of the buffer into a u64 number (Little Endian)
    let num = u64::from_le_bytes(buf);

    Ok(num)
}

pub fn new_uuid() -> String {
    let uuid = Uuid::new_v4();

    uuid.to_string()
}
