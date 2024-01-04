use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, Hash)]
pub enum PublishInterval {
    Interval1,
    Interval5,
    Interval15,
    Interval60,
}

impl PublishInterval {
    pub fn new(interval: i64) -> Result<PublishInterval, String> {
        match interval {
            1 => Ok(PublishInterval::Interval1),
            5 => Ok(PublishInterval::Interval5),
            15 => Ok(PublishInterval::Interval15),
            60 => Ok(PublishInterval::Interval60),
            _ => Err("Invalid publish interval provided".to_string()),
        }
    }

    pub fn get_publish_interval(&self) -> i64 {
        match self {
            PublishInterval::Interval1 => 1,
            PublishInterval::Interval5 => 5,
            PublishInterval::Interval15 => 15,
            PublishInterval::Interval60 => 60,
        }
    }
}
