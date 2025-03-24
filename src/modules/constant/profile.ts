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
