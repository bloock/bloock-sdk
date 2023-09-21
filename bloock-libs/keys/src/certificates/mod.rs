pub mod local;
pub mod managed;

pub struct CertificateSubject {
    pub common_name: String,
    pub organizational_unit: Option<String>,
    pub organization: Option<String>,
    pub location: Option<String>,
    pub state: Option<String>,
    pub country: Option<String>,
}

impl CertificateSubject {
    pub fn serialize(&self) -> String {
        let mut subject_names = vec![];
        subject_names.push(format!("CN={}", self.common_name));

        if let Some(ou) = &self.organizational_unit {
            subject_names.push(format!("OU={}", ou));
        }

        if let Some(o) = &self.organization {
            subject_names.push(format!("O={}", o));
        }

        if let Some(l) = &self.location {
            subject_names.push(format!("L={}", l));
        }

        if let Some(s) = &self.state {
            subject_names.push(format!("S={}", s));
        }

        if let Some(c) = &self.country {
            subject_names.push(format!("C={}", c));
        }

        subject_names.join(",")
    }
}
