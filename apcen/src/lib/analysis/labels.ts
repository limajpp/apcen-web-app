import type {
  ArtifactSeverity,
  GanglionCells,
  GanglionCellsAmount,
  InflammatoryAlteration,
  NerveBundleCharacteristic,
  OtherAlteration,
  PatchAdequacy,
  Plexus,
  Structure,
  TechnicalArtifact,
} from "./types";

export const fieldTitles = {
  patchAdequacy: "A amostra está adequada?",
  presentStructures: "Quais estruturas aparecem?",
  ganglionCells: "Tem célula ganglionar?",
  ganglionCellsAmount: "Quantas células ganglionares?",
  plexus: "Qual plexo aparece?",
  nerveBundleCharacteristics: "Como estão os feixes nervosos?",
  inflammatoryAlterations: "Quais alterações inflamatórias?",
  otherAlterations: "Quais outras alterações?",
  technicalArtifacts: "Quais artefatos técnicos?",
  artifactSeverity: "Os artefatos interferem na análise?",
} as const;

export const patchAdequacyLabels: Record<PatchAdequacy, string> = {
  adequate: "Adequada",
  partially_adequate: "Parcialmente adequada",
  inadequate_absense: "Inadequada — ausência de material",
  inadequate_artifact: "Inadequada — artefato",
  not_evaluable: "Não avaliável",
};

export const structureLabels: Record<Structure, string> = {
  mucosa: "Mucosa",
  muscularis_mucosae: "Muscular da mucosa",
  submucosa: "Submucosa",
  muscularis_propria: "Muscular própria",
  serous: "Serosa",
};

export const ganglionCellsLabels: Record<GanglionCells, string> = {
  present: "Presentes",
  absent: "Ausentes",
  doubtful: "Duvidosas",
  not_evaluable: "Não avaliável",
};

export const ganglionCellsAmountLabels: Record<GanglionCellsAmount, string> = {
  zero: "Nenhuma",
  one: "Uma",
  two_to_five: "De duas a cinco",
  more_than_five: "Mais de cinco",
  not_evaluable: "Não avaliável",
};

export const plexusLabels: Record<Plexus, string> = {
  submucosal: "Submucoso",
  myenteric: "Mientérico",
  two_plexus: "Ambos os plexos",
  structural_absense: "Ausência estrutural",
  not_visible: "Não visível",
  not_evaluable: "Não avaliável",
};

export const nerveBundleLabels: Record<NerveBundleCharacteristic, string> = {
  present: "Presentes",
  hypertrofic: "Hipertróficos",
  absent: "Ausentes",
  not_evaluable: "Não avaliável",
};

export const inflammatoryLabels: Record<InflammatoryAlteration, string> = {
  acute_inflammation: "Inflamação aguda",
  chronic_inflammation: "Inflamação crônica",
  cryptitis: "Criptite",
  crypt_abscess: "Abscesso de cripta",
  crypt_dilation: "Dilatação de criptas",
  mucin_depletion: "Depleção de mucina",
  mucin_increase: "Aumento de mucina",
  erosion: "Erosão",
  ulceration: "Ulceração",
  necrosis: "Necrose",
  no_alteration: "Sem alterações",
};

export const otherAlterationLabels: Record<OtherAlteration, string> = {
  fibrosis: "Fibrose",
  edema: "Edema",
  vascular_congestion: "Congestão vascular",
  bleeding: "Hemorragia",
  muscular_hipertrofy: "Hipertrofia muscular",
  lymphoid_hyperplasia: "Hiperplasia linfoide",
  ischemic_change: "Alteração isquêmica",
  microorganism: "Microrganismos",
  neoplasm: "Neoplasia",
  dysplasia: "Displasia",
  other: "Outra",
};

export const technicalArtifactLabels: Record<TechnicalArtifact, string> = {
  fold: "Dobra",
  overlap: "Sobreposição",
  irregular_cut: "Corte irregular",
  bubble: "Bolha",
  dirt_or_precipitate: "Sujidade ou precipitado",
  inadequate_coloring: "Coloração inadequada",
  crush_artifact: "Artefato de esmagamento",
  thermal_cauterization: "Cauterização térmica",
  tear: "Rasgo",
  inadequate_fixation: "Fixação inadequada",
  injection_artifacts: "Artefatos de injeção",
  needle_paths: "Trajetos de agulha",
  sample_border: "Borda da amostra",
  absent_tissue: "Ausência de tecido",
  no_artifact: "Sem artefatos",
};

export const artifactSeverityLabels: Record<ArtifactSeverity, string> = {
  no_interference: "Não interfere",
  interference: "Interfere",
};

export const optionLabels: Record<string, string> = {
  ...patchAdequacyLabels,
  ...structureLabels,
  ...ganglionCellsAmountLabels,
  ...plexusLabels,
  ...inflammatoryLabels,
  ...otherAlterationLabels,
  ...technicalArtifactLabels,
  ...artifactSeverityLabels,
};

export const perFieldOptionLabels: Record<string, Record<string, string>> = {
  ganglionCells: ganglionCellsLabels,
  nerveBundleCharacteristics: nerveBundleLabels,
};

export const noneOptionLabels: Record<string, string> = {
  presentStructures: "Nenhuma estrutura",
  otherAlterations: "Nenhuma alteração",
};

export const uiCopy = {
  heading: "Selecione as opções corretas:",
  answeredCounter: (answered: number, total: number) =>
    `${answered}/${total} respondidas`,
  dropdownEmpty: "Nenhum selecionado",
  dropdownCount: (count: number) =>
    count === 1 ? "1 selecionado" : `${count} selecionados`,
} as const;
