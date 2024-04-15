export const symptomsList = [
  "itching",
  "skin_rash",
  "nodal_skin_eruptions",
  "dischromic _patches",
  "continuous_sneezing",
  "shivering",
  "chills",
  "watering_from_eyes",
  "stomach_pain",
  "acidity",
  "ulcers_on_tongue",
  "vomiting",
  "cough",
  "chest_pain",
  "yellowish_skin",
  "nausea",
  "loss_of_appetite",
  "abdominal_pain",
  "yellowing_of_eyes",
  "burning_micturition",
  "spotting_ urination",
  "passage_of_gases",
  "internal_itching",
  "muscle_wasting",
  "patches_in_throat",
  "high_fever",
  "extra_marital_contacts",
  "fatigue",
  "weight_loss",
  "restlessness",
  "lethargy",
  "irregular_sugar_level",
  "blurred_and_distorted_vision",
  "obesity",
  "excessive_hunger",
  "increased_appetite",
  "polyuria",
  "sunken_eyes",
  "dehydration",
  "diarrhoea",
  "breathlessness",
  "family_history",
  "mucoid_sputum",
  "headache",
  "dizziness",
  "loss_of_balance",
  "lack_of_concentration",
  "indigestion",
  "stiff_neck",
  "depression",
  "irritability",
  "visual_disturbances",
];

export default [
  // Fungal infection
  {
    input: {
      itching: 1,
      skin_rash: 1,
      nodal_skin_eruptions: 1,
      "dischromic _patches": 1,
    },
    output: { "Fungal infection": 1 },
  },
  // Allergy
  {
    input: {
      continuous_sneezing: 1,
      shivering: 1,
      chills: 1,
      watering_from_eyes: 1,
    },
    output: { Allergy: 1 },
  },
  // GERD
  {
    input: {
      stomach_pain: 1,
      acidity: 1,
      ulcers_on_tongue: 1,
      vomiting: 1,
      cough: 1,
      chest_pain: 1,
    },
    output: { GERD: 1 },
  },
  // Chronic cholestasis
  {
    input: {
      itching: 1,
      vomiting: 1,
      yellowish_skin: 1,
      nausea: 1,
      loss_of_appetite: 1,
      abdominal_pain: 1,
      yellowing_of_eyes: 1,
    },
    output: { "Chronic cholestasis": 1 },
  },
  // Drug Reaction
  {
    input: {
      itching: 1,
      skin_rash: 1,
      stomach_pain: 1,
      burning_micturition: 1,
      "spotting_ urination": 1,
    },
    output: { "Drug Reaction": 1 },
  },
  // Peptic ulcer disease
  {
    input: {
      vomiting: 1,
      loss_of_appetite: 1,
      abdominal_pain: 1,
      passage_of_gases: 1,
      internal_itching: 1,
    },
    output: { "Peptic ulcer disease": 1 },
  },
  // AIDS
  {
    input: {
      muscle_wasting: 1,
      patches_in_throat: 1,
      high_fever: 1,
      extra_marital_contacts: 1,
    },
    output: { AIDS: 1 },
  },
  // Diabetes
  {
    input: {
      fatigue: 1,
      weight_loss: 1,
      restlessness: 1,
      lethargy: 1,
      irregular_sugar_level: 1,
      blurred_and_distorted_vision: 1,
      obesity: 1,
      excessive_hunger: 1,
      increased_appetite: 1,
      polyuria: 1,
    },
    output: { Diabetes: 1 },
  },
  // Gastroenteritis
  {
    input: { vomiting: 1, sunken_eyes: 1, dehydration: 1, diarrhoea: 1 },
    output: { Gastroenteritis: 1 },
  },
  // Bronchial Asthma
  {
    input: {
      fatigue: 1,
      cough: 1,
      high_fever: 1,
      breathlessness: 1,
      family_history: 1,
      mucoid_sputum: 1,
    },
    output: { "Bronchial Asthma": 1 },
  },
  // Hypertension
  {
    input: {
      headache: 1,
      chest_pain: 1,
      dizziness: 1,
      loss_of_balance: 1,
      lack_of_concentration: 1,
    },
    output: { Hypertension: 1 },
  },
  // Migraine
  {
    input: {
      acidity: 1,
      indigestion: 1,
      headache: 1,
      blurred_and_distorted_vision: 1,
      excessive_hunger: 1,
      stiff_neck: 1,
      depression: 1,
      irritability: 1,
      visual_disturbances: 1,
    },
    output: { Migraine: 1 },
  },
];
