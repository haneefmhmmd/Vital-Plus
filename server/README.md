Add Patient (/patient)

# mutation {
#   addPatient(
#     firstName: "John"
#     lastName: "Doe"
#     dateOfBirth: "1990-01-01"
#     email: "john.doe@example.com"
#     password: "password123"
#     phoneNumber: "1234567890"
#     address: "123 Main Street"
#     postalCode: "12345"
#     country: "USA"
#     image: "https://example.com/profile.jpg"
#     emergencyContactName: "Jane Doe"
#     emergencyContactNumber: "9876543210"
#     emergencyContactRelationship: "Spouse"
#   ) {
#     id
#     firstName
#     lastName
#     email
#     phoneNumber
#   }
# }


Update Patient

# mutation {
#   updatePatient(
#     id: "6617091ad42778f0cfc97319"
#     firstName: ""
#     lastName: ""
#     dateOfBirth: ""
#     email: ""
#     password: ""
#     phoneNumber: ""
#     address: ""
#     postalCode: ""
#     country: ""
#     image: ""
#     emergencyContactName: ""
#     emergencyContactNumber: ""
#     emergencyContactRelationship: ""
#   ) {
#     id
#     firstName
#     lastName
#     dateOfBirth
#     email
#     phoneNumber
#     address
#     postalCode
#     country
#     image
#     emergencyContactName
#     emergencyContactNumber
#     emergencyContactRelationship
#   }
# }

Get All Patients

# query {
#   patients {
#     id
#     firstName
#     lastName
#     dateOfBirth
#     email
#     phoneNumber
#     address
#     postalCode
#     country
#     image
#     emergencyContactName
#     emergencyContactNumber
#     emergencyContactRelationship
#   }
# }

Get Patient By ID

# query {
#   patient(id: "6617091ad42778f0cfc97319") {
#     id
#     firstName
#     lastName
#     dateOfBirth
#     email
#     phoneNumber
#     address
#     postalCode
#     country
#     image
#     emergencyContactName
#     emergencyContactNumber
#     emergencyContactRelationship
#   }
# }


Delete Patient by ID

# mutation {
#   deletePatient(id: "6617091ad42778f0cfc97319") {
#     id
#     firstName
#     lastName
#   }
# }

------------------------------------------------------------------------------------

Add Nurse (/nurse)

# mutation {
#   addNurse(
#     firstName: "Dalton"
#     lastName: "Miller"
#     dateOfBirth: "1966-12-23"
#     email: "daltonmiller@gmail.com"
#     password: "daltonmiller"
#     phoneNumber: "437-598-8955"
#     address: "357 Bay Street"
#     postalCode: "M1X2B1"
#     country: "Canada"
#     image: ""
#   ) {
#     id
#     firstName
#     lastName
#     dateOfBirth
#     email
#     phoneNumber
#     address
#     postalCode
#     country
#     image
#   }
# }

Update Nurse (/nurse)

# mutation {
#   updateNurse(
#     id: "**NURSE_ID**"
#     firstName: "Dalton"
#     lastName: "Miller"
#     dateOfBirth: "1966-12-23"
#     email: "daltonmiller@gmail.com"
#     password: "daltonmiller"
#     phoneNumber: "437-598-8955"
#     address: "357 Bay Street"
#     postalCode: "M1X2B1"
#     country: "Canada"
#     image: ""
#   ) {
#     id
#     firstName
#     lastName
#     dateOfBirth
#     email
#     phoneNumber
#     address
#     postalCode
#     country
#     image
#   }
# }

Delete Nurse (/nurse - provide Id)

# mutation {
#   deleteNurse(id: "**NURSE_ID**") {
#     id
#     firstName
#     lastName
#     dateOfBirth
#     email
#     phoneNumber
#     address
#     postalCode
#     country
#     image
#   }
# }

Get Nurse by ID

# query  {
#   nurse(id: "**NURSE_ID**") {
#     id
#     firstName
#     lastName
#     dateOfBirth
#     email
#     phoneNumber
#     address
#     postalCode
#     country
#     image
#   }
# }

Get All Nurses

# query  {
#   nurses {
#     id
#     firstName
#     lastName
#     dateOfBirth
#     email
#     phoneNumber
#     address
#     postalCode
#     country
#     image
#   }
# }


Add patients to a nurse
# mutation {
#   addPatientsToNurse(nurseId: "NURSE_ID_HERE", patientIds: ["PATIENT_ID_1", "PATIENT_ID_2"]) {
#     id
#     firstName
#     lastName
#     patients
#   }
# }

Delete patients from a nurse

# mutation {
#   deletePatientsFromNurse(nurseId: "NURSE_ID_HERE", patientIds: ["PATIENT_ID_1"]) {
#     id
#     firstName
#     lastName
#     patients
#   }
# }


------------------------------------------------------------------------------------

Add Admin (/admin)

# mutation {
#   addAdmin(
#     firstName: "Dalton"
#     lastName: "Miller"
#     email: "daltonmiller@gmail.com"
#     password: "daltonmiller"
#   ) {
#     id
#     firstName
#     lastName
#     email
#   }
# }

Update Admin (/admin)

# mutation {
#   updateAdmin(
#     id: "**NURSE_ID**"
#     firstName: "Dalton"
#     lastName: "Miller"
#     email: "daltonmiller@gmail.com"
#     password: "daltonmiller"
#   ) {
#     id
#     firstName
#     lastName
#     email
#   }
# }

Delete Admin (/admin - provide Id)

# mutation {
#   deleteAdmin(id: "**NURSE_ID**") {
#     id
#     firstName
#     lastName
#     email
#   }
# }

Get Admin by ID

# query  {
#   admin(id: "**ADMIN_ID**") {
#     id
#     firstName
#     lastName
#     email
#   }
# }

Get All Admins

# query  {
#   admins {
#     id
#     firstName
#     lastName
#     email
#   }
# }

-----------------------------------------------------------------------------

Login

# mutation  {
#   admins {
#     userId
#     roleId
#     email
#     token
#   }
# }