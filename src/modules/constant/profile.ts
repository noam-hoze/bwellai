export const LanguageObjectData = [
  { label: "English", value: "English" },
  { label: "日本語", value: "Japanese" },
  { label: "廣東話 / 广东话", value: "Cantonese" },
  { label: "Čeština", value: "Czech" },
  { label: "Deutsch", value: "German" },
  { label: "Français", value: "French" },
  { label: "Español", value: "Spanish" },
  { label: "中文", value: "Mandarin" },
  { label: "العربية", value: "Arabic" },
  { label: "עברית", value: "Hebrew" },
  { label: "Русский", value: "Russian" },
  { label: "Українська", value: "Ukrainian" },
];

export const ExerciseFrequency = {
  "Intense (5-6 days per week)": "daily",
  "Moderate (3-4 days per week)": "weekly",
  "Light (1-2 days per week)": "rarely",
  None: "never",
};

export const currentMedicationOptionsData = [
  { id: "No current medications", label: "No current medications" },
  { id: "Antibiotics", label: "Antibiotics (e.g., Amoxicillin, Penicillin)" },
  { id: "Antidepressants", label: "Antidepressants (e.g., Prozac, Zoloft)" },
  {
    id: "Anti-inflammatory",
    label: "Anti-inflammatory (e.g., Ibuprofen, Naproxen)",
  },
  { id: "Antihistamines", label: "Antihistamines (e.g., Benadryl, Claritin)" },
  { id: "Asthma inhalers", label: "Asthma inhalers (e.g., Albuterol)" },
  {
    id: "Blood pressure medications",
    label: "Blood pressure medications (e.g., Lisinopril, Amlodipine)",
  },
  { id: "Blood thinners", label: "Blood thinners (e.g., Warfarin, Aspirin)" },
  {
    id: "Cholesterol medications",
    label: "Cholesterol medications (e.g., Statins)",
  },
  {
    id: "Diabetes medications",
    label: "Diabetes medications (e.g., Insulin, Metformin)",
  },
  {
    id: "Hormonal treatments",
    label: "Hormonal treatments (e.g., Birth control, HRT)",
  },
  { id: "Pain relief", label: "Pain relief (e.g., Acetaminophen, Oxycodone)" },
  {
    id: "Thyroid medications",
    label: "Thyroid medications (e.g., Levothyroxine)",
  },
  {
    id: "Vitamins and supplements",
    label: "Vitamins and supplements (e.g., Vitamin D, Iron)",
  },
];

export const CommonGeneVariantsDataDescriptionMapping = {
  "APOE ε4 Allele":
    "APOE ε4 Allele (Apolipoprotein E ε4, APOE4, Alzheimer's Risk Gene)\nAssociated Risks: Higher risk for late-onset Alzheimer's disease and cardiovascular disease.\nActions: Lifestyle modifications (diet, exercise), cognitive training, cholesterol management, potential participation in clinical trials.",
  "MTHFR Mutation":
    "MTHFR Mutation (Methylenetetrahydrofolate Reductase, C677T, A1298C, MTHFR polymorphism)\nAssociated Risks: Can affect folate metabolism, potentially associated with homocysteine elevation, pregnancy complications, and blood clotting disorders.\nActions: Supplementation with appropriate B vitamins (e.g., folate, B6, B12), lifestyle adjustments, medical monitoring for clot risk",
  "Lactase Persistence":
    "Lactase Persistence (LCT) Mutation (Lactase Gene, Lactose Intolerance Gene, LCT-13910C>T polymorphism)\nAssociated Risks: Determines lactase enzyme production, impacting lactose intolerance.\nActions: Dietary management to avoid or incorporate lactose-containing foods, lactase supplements.",
  G6PD: "G6PD (Glucose-6-Phosphate Dehydrogenase) Deficiency (G6PD deficiency, Favism Gene, Glucose-6-Phosphate Dehydrogenase Deficiency)\n  Associated Risks: Hemolytic anemia triggered by certain foods, infections, or medications.\n  Actions: Avoidance of known triggers, such as certain medications (e.g., sulfa drugs) and fava beans, and medical monitoring.",
  "Factor V Leiden Mutation":
    "Factor V Leiden Mutation (FVL, Factor V R506Q mutation, APC Resistance Mutation)\nAssociated Risks: Increased risk of venous thromboembolism (blood clots).\nActions: Lifestyle adjustments, blood thinners for high-risk situations such as surgery, pregnancy, or immobility.",
  "HFE Gene":
    "HFE Gene (Hemochromatosis) Mutation (C282Y mutation, H63D mutation, Hereditary Hemochromatosis, HFE-related Hemochromatosis)\nAssociated Risks: Iron overload leading to potential organ damage.\nActions: Regular blood donations, dietary modifications, and close monitoring of iron levels.",
  "BRCA1 and BRCA2 Mutations":
    "BRCA1 and BRCA2 Mutations (BRCA1 - Breast Cancer 1, BRCA2 - Breast Cancer 2, Hereditary Breast and Ovarian Cancer Syndrome - HBOC)\nAssociated Risks: Increased risk for breast, ovarian, prostate, and other cancers.\nActions: Increased surveillance, preventive mastectomy, salpingo-oophorectomy, targeted therapies, lifestyle changes.",
  "CYP2D6 Mutation":
    "CYP2D6 Mutation (Cytochrome P450 2D6, CYP2D64, CYP2D610, Poor/Intermediate/Rapid/Ultrarapid Metabolizer)\nAssociated Risks: Affects drug metabolism, impacting opioids, antidepressants, and antipsychotics.\nActions: Personalized drug dosing or alternative medication options based on metabolizer status.",
  "CYP2C19 Mutation":
    "CYP2C19 Mutation (Cytochrome P450 2C19, CYP2C192, CYP2C1917)\nAssociated Risks: Influences metabolism of certain drugs, such as clopidogrel (Plavix), and some antidepressants.\nActions: Adjustments in drug dosing, selection of alternative medications",
  SLCO1B1:
    "SLCO1B1 (Statin-Induced Myopathy) (Organic Anion Transporting Polypeptide 1B1, OATP1B1 polymorphism, SLCO1B1*5 allele)\nAssociated Risks: Increased risk of muscle toxicity and side effects from statin use.\nActions: Lower statin doses, alternative lipid-lowering therapies.",
  "CFTR Mutation":
    "CFTR Mutation (Cystic Fibrosis Transmembrane Conductance Regulator, ΔF508 mutation)\nAssociated Risks: Carrier status for cystic fibrosis; risk for CF if both parents carry a mutation.\nActions: Genetic counseling for family planning, prenatal screening.",
  Prothrombin:
    "Prothrombin (F2) Mutation (Prothrombin G20210A, Factor II mutation)\nAssociated Risks: Increased risk of blood clots.\nActions: Lifestyle modifications, anticoagulation therapy during high-risk periods.",
  "UGT1A1*28":
    "UGT1A1*28 (Gilbert Syndrome) (UGT1A1 polymorphism, TA repeat polymorphism, Gilbert's Syndrome)\nAssociated Risks: Benign elevation of bilirubin, causing mild jaundice.\nActions: Generally not harmful; monitoring during illness or fasting",
  "PCSK9 Mutation":
    "PCSK9 Mutation (Familial Hypercholesterolemia) (PCSK9 Gain-of-Function mutation, FH Mutation)\nAssociated Risks: Elevated cholesterol levels, increased risk of cardiovascular disease.\nActions: Lifestyle modifications, statin therapy, other cholesterol-lowering agents.",
  TTR: "TTR (Transthyretin Amyloidosis) Mutation (Transthyretin Gene Mutation, Hereditary Amyloidosis, Familial Amyloid Polyneuropathy - FAP)\nAssociated Risks: Potential amyloid deposits in organs, affecting heart and nerves.\nActions: Monitoring and targeted treatments like tafamidis.",
  "Lynch Syndrome":
    "Lynch Syndrome (MLH1, MSH2, MSH6, PMS2) Mutations (Hereditary Nonpolyposis Colorectal Cancer - HNPCC, MLH1 mutation, MSH2 mutation, MSH6 mutation, PMS2 mutation)\nAssociated Risks: Increased risk of colorectal, endometrial, and other cancers.\nActions: Increased cancer screenings, preventive surgeries, targeted therapies.",
  "HER2 Gene Amplification":
    "HER2 Gene Amplification (Human Epidermal Growth Factor Receptor 2, erbB-2, Neu Gene)\nAssociated Risks: Aggressive form of breast cancer.\nActions: Targeted therapies like trastuzumab (Herceptin), increased monitoring.",
  TPMT: "TPMT (Thiopurine Methyltransferase) Mutation (TPMT polymorphism, TPMT2, TPMT3A, TPMT*3C)\nAssociated Risks: Impacts metabolism of thiopurine drugs, used in leukemia, autoimmune diseases.\nActions: Adjusted drug dosages to minimize toxicity.",
  "CYP1A2 Gene":
    "CYP1A2 Gene (Cytochrome P450 1A2, CYP1A2*1F, Slow Caffeine Metabolism Gene)\nAssociated Risks: Affects caffeine metabolism, influencing cardiovascular risks based on caffeine intake.\nActions: Adjusting caffeine consumption based on metabolizer status.",
};

export const CommonGeneVariantsData = [
  {
    title: `APOE ε4 Allele`,
    description: `APOE ε4 Allele (Apolipoprotein E ε4, APOE4, Alzheimer's Risk Gene)
Associated Risks: Higher risk for late-onset Alzheimer's disease and cardiovascular disease.
Actions: Lifestyle modifications (diet, exercise), cognitive training, cholesterol management, potential participation in clinical trials.`,
  },
  {
    title: `MTHFR Mutation`,
    description: `MTHFR Mutation (Methylenetetrahydrofolate Reductase, C677T, A1298C, MTHFR polymorphism)
Associated Risks: Can affect folate metabolism, potentially associated with homocysteine elevation, pregnancy complications, and blood clotting disorders.
Actions: Supplementation with appropriate B vitamins (e.g., folate, B6, B12), lifestyle adjustments, medical monitoring for clot risk`,
  },
  {
    title: `Lactase Persistence`,
    description: `Lactase Persistence (LCT) Mutation (Lactase Gene, Lactose Intolerance Gene, LCT-13910C>T polymorphism)
Associated Risks: Determines lactase enzyme production, impacting lactose intolerance.
Actions: Dietary management to avoid or incorporate lactose-containing foods, lactase supplements.`,
  },
  {
    title: `G6PD`,
    description: `G6PD (Glucose-6-Phosphate Dehydrogenase) Deficiency (G6PD deficiency, Favism Gene, Glucose-6-Phosphate Dehydrogenase Deficiency)
  Associated Risks: Hemolytic anemia triggered by certain foods, infections, or medications.
  Actions: Avoidance of known triggers, such as certain medications (e.g., sulfa drugs) and fava beans, and medical monitoring.`,
  },
  {
    title: `Factor V Leiden Mutation`,
    description: `Factor V Leiden Mutation (FVL, Factor V R506Q mutation, APC Resistance Mutation)
Associated Risks: Increased risk of venous thromboembolism (blood clots).
Actions: Lifestyle adjustments, blood thinners for high-risk situations such as surgery, pregnancy, or immobility.`,
  },
  {
    title: `HFE Gene`,
    description: `HFE Gene (Hemochromatosis) Mutation (C282Y mutation, H63D mutation, Hereditary Hemochromatosis, HFE-related Hemochromatosis)
Associated Risks: Iron overload leading to potential organ damage.
Actions: Regular blood donations, dietary modifications, and close monitoring of iron levels.`,
  },
  {
    title: `BRCA1 and BRCA2 Mutations`,
    description: `BRCA1 and BRCA2 Mutations (BRCA1 - Breast Cancer 1, BRCA2 - Breast Cancer 2, Hereditary Breast and Ovarian Cancer Syndrome - HBOC)
Associated Risks: Increased risk for breast, ovarian, prostate, and other cancers.
Actions: Increased surveillance, preventive mastectomy, salpingo-oophorectomy, targeted therapies, lifestyle changes.`,
  },
  {
    title: `CYP2D6 Mutation`,
    description: `CYP2D6 Mutation (Cytochrome P450 2D6, CYP2D64, CYP2D610, Poor/Intermediate/Rapid/Ultrarapid Metabolizer)
Associated Risks: Affects drug metabolism, impacting opioids, antidepressants, and antipsychotics.
Actions: Personalized drug dosing or alternative medication options based on metabolizer status.`,
  },
  {
    title: `CYP2C19 Mutation`,
    description: `CYP2C19 Mutation (Cytochrome P450 2C19, CYP2C192, CYP2C1917)
Associated Risks: Influences metabolism of certain drugs, such as clopidogrel (Plavix), and some antidepressants.
Actions: Adjustments in drug dosing, selection of alternative medications`,
  },
  {
    title: `SLCO1B1`,
    description: `SLCO1B1 (Statin-Induced Myopathy) (Organic Anion Transporting Polypeptide 1B1, OATP1B1 polymorphism, SLCO1B1*5 allele)
Associated Risks: Increased risk of muscle toxicity and side effects from statin use.
Actions: Lower statin doses, alternative lipid-lowering therapies.`,
  },
  {
    title: `CFTR Mutation`,
    description: `CFTR Mutation (Cystic Fibrosis Transmembrane Conductance Regulator, ΔF508 mutation)
Associated Risks: Carrier status for cystic fibrosis; risk for CF if both parents carry a mutation.
Actions: Genetic counseling for family planning, prenatal screening.`,
  },
  {
    title: `Prothrombin`,
    description: `Prothrombin (F2) Mutation (Prothrombin G20210A, Factor II mutation)
Associated Risks: Increased risk of blood clots.
Actions: Lifestyle modifications, anticoagulation therapy during high-risk periods.`,
  },
  {
    title: `UGT1A1*28`,
    description: `UGT1A1*28 (Gilbert Syndrome) (UGT1A1 polymorphism, TA repeat polymorphism, Gilbert's Syndrome)
Associated Risks: Benign elevation of bilirubin, causing mild jaundice.
Actions: Generally not harmful; monitoring during illness or fasting`,
  },
  {
    title: `PCSK9 Mutation`,
    description: `PCSK9 Mutation (Familial Hypercholesterolemia) (PCSK9 Gain-of-Function mutation, FH Mutation)
Associated Risks: Elevated cholesterol levels, increased risk of cardiovascular disease.
Actions: Lifestyle modifications, statin therapy, other cholesterol-lowering agents.`,
  },
  {
    title: `TTR`,
    description: `TTR (Transthyretin Amyloidosis) Mutation (Transthyretin Gene Mutation, Hereditary Amyloidosis, Familial Amyloid Polyneuropathy - FAP)
Associated Risks: Potential amyloid deposits in organs, affecting heart and nerves.
Actions: Monitoring and targeted treatments like tafamidis.`,
  },
  {
    title: `Lynch Syndrome`,
    description: `Lynch Syndrome (MLH1, MSH2, MSH6, PMS2) Mutations (Hereditary Nonpolyposis Colorectal Cancer - HNPCC, MLH1 mutation, MSH2 mutation, MSH6 mutation, PMS2 mutation)
Associated Risks: Increased risk of colorectal, endometrial, and other cancers.
Actions: Increased cancer screenings, preventive surgeries, targeted therapies.`,
  },
  {
    title: `HER2 Gene Amplification`,
    description: `HER2 Gene Amplification (Human Epidermal Growth Factor Receptor 2, erbB-2, Neu Gene)
Associated Risks: Aggressive form of breast cancer.
Actions: Targeted therapies like trastuzumab (Herceptin), increased monitoring.`,
  },
  {
    title: `TPMT`,
    description: `TPMT (Thiopurine Methyltransferase) Mutation (TPMT polymorphism, TPMT2, TPMT3A, TPMT*3C)
Associated Risks: Impacts metabolism of thiopurine drugs, used in leukemia, autoimmune diseases.
Actions: Adjusted drug dosages to minimize toxicity.`,
  },
  {
    title: `CYP1A2 Gene`,
    description: `CYP1A2 Gene (Cytochrome P450 1A2, CYP1A2*1F, Slow Caffeine Metabolism Gene)
Associated Risks: Affects caffeine metabolism, influencing cardiovascular risks based on caffeine intake.
Actions: Adjusting caffeine consumption based on metabolizer status.`,
  },
];

export const allergiesData = [
  {
    group: "Food Allergies",
    subgroup: "Dairy",
    label: "Cheese",
  },
  {
    group: "Food Allergies",
    subgroup: "Dairy",
    label: "Yogurt",
  },
  {
    group: "Food Allergies",
    subgroup: "Dairy",
    label: "Butter",
  },
  {
    group: "Food Allergies",
    subgroup: "Dairy",
    label: "Casein",
  },
  {
    group: "Food Allergies",
    subgroup: "Dairy",
    label: "Whey",
  },
  {
    group: "Food Allergies",
    subgroup: "Eggs",
    label: "Egg Whites",
  },
  {
    group: "Food Allergies",
    subgroup: "Eggs",
    label: "Egg Yolks",
  },
  {
    group: "Food Allergies",
    subgroup: "Seafood",
    label: "Shrimp",
  },
  {
    group: "Food Allergies",
    subgroup: "Seafood",
    label: "Crab",
  },
  {
    group: "Food Allergies",
    subgroup: "Seafood",
    label: "Lobster",
  },
  {
    group: "Food Allergies",
    subgroup: "Seafood",
    label: "Crayfish",
  },
  {
    group: "Food Allergies",
    subgroup: "Seafood",
    label: "Clams",
  },
  {
    group: "Food Allergies",
    subgroup: "Seafood",
    label: "Mussels",
  },
  {
    group: "Food Allergies",
    subgroup: "Seafood",
    label: "Oysters",
  },
  {
    group: "Food Allergies",
    subgroup: "Seafood",
    label: "Scallops",
  },
  {
    group: "Food Allergies",
    subgroup: "Seafood",
    label: "Squid",
  },
  {
    group: "Food Allergies",
    subgroup: "Seafood",
    label: "Octopus",
  },
  {
    group: "Food Allergies",
    subgroup: "Seafood",
    label: "Abalone",
  },
  {
    group: "Food Allergies",
    subgroup: "Seafood",
    label: "Cockles",
  },
  {
    group: "Food Allergies",
    subgroup: "Seafood",
    label: "Snails (Escargot)",
  },
  {
    group: "Food Allergies",
    subgroup: "Seafood",
    label: "Cuttlefish",
  },
  {
    group: "Food Allergies",
    subgroup: "Seafood",
    label: "Periwinkles",
  },
  {
    group: "Food Allergies",
    subgroup: "Seafood",
    label: "Whelks",
  },
  {
    group: "Food Allergies",
    subgroup: "Nuts",
    label: "Peanuts",
  },
  {
    group: "Food Allergies",
    subgroup: "Nuts",
    label: "Almonds",
  },
  {
    group: "Food Allergies",
    subgroup: "Nuts",
    label: "Cashews",
  },
  {
    group: "Food Allergies",
    subgroup: "Nuts",
    label: "Walnuts",
  },
  {
    group: "Food Allergies",
    subgroup: "Nuts",
    label: "Pistachios",
  },
  {
    group: "Food Allergies",
    subgroup: "Nuts",
    label: "Pecans",
  },
  {
    group: "Food Allergies",
    subgroup: "Nuts",
    label: "Hazelnuts",
  },
  {
    group: "Food Allergies",
    subgroup: "Nuts",
    label: "Macadamia Nuts",
  },
  {
    group: "Food Allergies",
    subgroup: "Nuts",
    label: "Brazil Nuts",
  },
  {
    group: "Food Allergies",
    subgroup: "Seeds",
    label: "Sesame",
  },
  {
    group: "Food Allergies",
    subgroup: "Seeds",
    label: "Sunflower",
  },
  {
    group: "Food Allergies",
    subgroup: "Seeds",
    label: "Pumpkin",
  },
  {
    group: "Food Allergies",
    subgroup: "Seeds",
    label: "Chia",
  },
  {
    group: "Food Allergies",
    subgroup: "Seeds",
    label: "Flaxseed",
  },
  {
    group: "Food Allergies",
    subgroup: "Legumes",
    label: "Soy",
  },
  {
    group: "Food Allergies",
    subgroup: "Legumes",
    label: "Lentils",
  },
  {
    group: "Food Allergies",
    subgroup: "Legumes",
    label: "Chickpeas",
  },
  {
    group: "Food Allergies",
    subgroup: "Legumes",
    label: "Green Peas",
  },
  {
    group: "Food Allergies",
    subgroup: "Grains",
    label: "Wheat",
  },
  {
    group: "Food Allergies",
    subgroup: "Grains",
    label: "Barley",
  },
  {
    group: "Food Allergies",
    subgroup: "Grains",
    label: "Rye",
  },
  {
    group: "Food Allergies",
    subgroup: "Grains",
    label: "Oats",
  },
  {
    group: "Food Allergies",
    subgroup: "Fruits",
    label: "Oranges",
  },
  {
    group: "Food Allergies",
    subgroup: "Fruits",
    label: "Lemons",
  },
  {
    group: "Food Allergies",
    subgroup: "Fruits",
    label: "Limes",
  },
  {
    group: "Food Allergies",
    subgroup: "Fruits",
    label: "Grapefruits",
  },
  {
    group: "Food Allergies",
    subgroup: "Fruits",
    label: "Apples",
  },
  {
    group: "Food Allergies",
    subgroup: "Fruits",
    label: "Bananas",
  },
  {
    group: "Food Allergies",
    subgroup: "Fruits",
    label: "Strawberries",
  },
  {
    group: "Food Allergies",
    subgroup: "Fruits",
    label: "Kiwi",
  },
  {
    group: "Food Allergies",
    subgroup: "Fruits",
    label: "Avocado",
  },
  {
    group: "Food Allergies",
    subgroup: "Fruits",
    label: "Peaches",
  },
  {
    group: "Food Allergies",
    subgroup: "Fruits",
    label: "Pineapples",
  },
  {
    group: "Food Allergies",
    subgroup: "Vegetables",
    label: "Tomatoes",
  },
  {
    group: "Food Allergies",
    subgroup: "Vegetables",
    label: "Potatoes",
  },
  {
    group: "Food Allergies",
    subgroup: "Vegetables",
    label: "Carrots",
  },
  {
    group: "Food Allergies",
    subgroup: "Vegetables",
    label: "Celery",
  },
  {
    group: "Food Allergies",
    subgroup: "Vegetables",
    label: "Bell Peppers",
  },
  {
    group: "Food Allergies",
    subgroup: "Vegetables",
    label: "Eggplant",
  },
  {
    group: "Food Allergies",
    subgroup: "Additives",
    label: "Sulfites",
  },
  {
    group: "Food Allergies",
    subgroup: "Additives",
    label: "MSG",
  },
  {
    group: "Food Allergies",
    subgroup: "Additives",
    label: "Red Food Dye (Red 40)",
  },
  {
    group: "Food Allergies",
    subgroup: "Additives",
    label: "Yellow Food Dye (Yellow 5)",
  },
  {
    group: "Food Allergies",
    subgroup: "Additives",
    label: "Blue Food Dye (Blue 1)",
  },
  {
    group: "Environmental Allergies",
    subgroup: "Pollens",
    label: "Birch Pollen",
  },
  {
    group: "Environmental Allergies",
    subgroup: "Pollens",
    label: "Oak Pollen",
  },
  {
    group: "Environmental Allergies",
    subgroup: "Pollens",
    label: "Pine Pollen",
  },
  {
    group: "Environmental Allergies",
    subgroup: "Pollens",
    label: "Bermuda Grass Pollen",
  },
  {
    group: "Environmental Allergies",
    subgroup: "Pollens",
    label: "Timothy Grass Pollen",
  },
  {
    group: "Environmental Allergies",
    subgroup: "Pollens",
    label: "Ragweed Pollen",
  },
  {
    group: "Environmental Allergies",
    subgroup: "Pollens",
    label: "Sagebrush Pollen",
  },
  {
    group: "Environmental Allergies",
    subgroup: "Mold",
    label: "Aspergillus",
  },
  {
    group: "Environmental Allergies",
    subgroup: "Mold",
    label: "Cladosporium",
  },
  {
    group: "Environmental Allergies",
    subgroup: "Mold",
    label: "Penicillium",
  },
  {
    group: "Environmental Allergies",
    subgroup: "Mold",
    label: "Alternaria",
  },
  {
    group: "Environmental Allergies",
    subgroup: "Dust",
    label: "Dust Mites",
  },
  {
    group: "Environmental Allergies",
    subgroup: "Animal Dander",
    label: "Cat Dander",
  },
  {
    group: "Environmental Allergies",
    subgroup: "Animal Dander",
    label: "Dog Dander",
  },
  {
    group: "Environmental Allergies",
    subgroup: "Animal Dander",
    label: "Horse Dander",
  },
  {
    group: "Environmental Allergies",
    subgroup: "Animal Dander",
    label: "Rabbit Dander",
  },
  {
    group: "Environmental Allergies",
    subgroup: "Animal Dander",
    label: "Rodent Dander",
  },
  {
    group: "Environmental Allergies",
    subgroup: "Insect Stings",
    label: "Bee Stings",
  },
  {
    group: "Environmental Allergies",
    subgroup: "Insect Stings",
    label: "Wasp Stings",
  },
  {
    group: "Environmental Allergies",
    subgroup: "Insect Stings",
    label: "Hornet Stings",
  },
  {
    group: "Environmental Allergies",
    subgroup: "Insect Stings",
    label: "Fire Ant Stings",
  },
  {
    group: "Environmental Allergies",
    subgroup: "Other Environmental Triggers",
    label: "Feathers",
  },
  {
    group: "Environmental Allergies",
    subgroup: "Other Environmental Triggers",
    label: "Smoke (Cigarette)",
  },
  {
    group: "Environmental Allergies",
    subgroup: "Other Environmental Triggers",
    label: "Smoke (Wood)",
  },
  {
    group: "Environmental Allergies",
    subgroup: "Other Environmental Triggers",
    label: "Latex",
  },
  {
    group: "Drug Allergies",
    subgroup: "Antibiotics",
    label: "Penicillin",
  },
  {
    group: "Drug Allergies",
    subgroup: "Antibiotics",
    label: "Amoxicillin",
  },
  {
    group: "Drug Allergies",
    subgroup: "Antibiotics",
    label: "Cephalosporins",
  },
  {
    group: "Drug Allergies",
    subgroup: "Antibiotics",
    label: "Sulfa Drugs",
  },
  {
    group: "Drug Allergies",
    subgroup: "Pain Relievers",
    label: "Aspirin",
  },
  {
    group: "Drug Allergies",
    subgroup: "Pain Relievers",
    label: "Ibuprofen",
  },
  {
    group: "Drug Allergies",
    subgroup: "Pain Relievers",
    label: "Acetaminophen",
  },
  {
    group: "Drug Allergies",
    subgroup: "Pain Relievers",
    label: "NSAIDs",
  },
  {
    group: "Drug Allergies",
    subgroup: "Anesthetics",
    label: "Lidocaine",
  },
  {
    group: "Drug Allergies",
    subgroup: "Anesthetics",
    label: "General Anesthesia Agents",
  },
  {
    group: "Drug Allergies",
    subgroup: "Vaccines",
    label: "Egg-based Vaccines",
  },
  {
    group: "Drug Allergies",
    subgroup: "Vaccines",
    label: "Gelatin-based Vaccines",
  },
  {
    group: "Drug Allergies",
    subgroup: "Other Drugs",
    label: "Contrast Dyes",
  },
  {
    group: "Drug Allergies",
    subgroup: "Other Drugs",
    label: "Chlorhexidine",
  },
  {
    group: "Skin Allergies",
    subgroup: "Nickel",
    label: "Nickel",
  },
  {
    group: "Skin Allergies",
    subgroup: "Nickel",
    label: "Chromium",
  },
  {
    group: "Skin Allergies",
    subgroup: "Nickel",
    label: "Cobalt",
  },
  {
    group: "Skin Allergies",
    subgroup: "Perfumes",
    label: "Scented Lotions",
  },
  {
    group: "Skin Allergies",
    subgroup: "Wool",
    label: "Synthetic Fibers",
  },
  {
    group: "Skin Allergies",
    subgroup: "Poison Ivy",
    label: "Poison Oak",
  },
  {
    group: "Skin Allergies",
    subgroup: "Poison Ivy",
    label: "Poison Sumac",
  },
  {
    group: "Skin Allergies",
    subgroup: "Cosmetics",
    label: "Lipsticks",
  },
  {
    group: "Skin Allergies",
    subgroup: "Cosmetics",
    label: "Foundations",
  },
  {
    group: "Skin Allergies",
    subgroup: "Cosmetics",
    label: "Eyeliners",
  },
  {
    group: "Skin Allergies",
    subgroup: "Soaps",
    label: "Detergents",
  },
  {
    group: "Skin Allergies",
    subgroup: "Soaps",
    label: "Cleaning Products",
  },
  {
    group: "Skin Allergies",
    subgroup: "Soaps",
    label: "Paint Fumes",
  },

  {
    group: "Rare Allergies",
    subgroup: "",
    label: "Sunlight (Photosensitivity)",
  },
  {
    group: "Rare Allergies",
    subgroup: "",
    label: "Water (Aquagenic Urticaria)",
  },
  {
    group: "Rare Allergies",
    subgroup: "",
    label: "Cold Temperatures (Cold Urticaria)",
  },
  {
    group: "Rare Allergies",
    subgroup: "",
    label: "Exercise-induced Anaphylaxis",
  },
  {
    group: "Rare Allergies",
    subgroup: "",
    label: "Alpha-Gal Syndrome (Red Meat)",
  },
  {
    group: "Rare Allergies",
    subgroup: "",
    label: "Tick Bites",
  },
];
