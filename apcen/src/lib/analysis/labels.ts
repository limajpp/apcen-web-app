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
import type { ProgressStage } from "./progress";

export const fieldTitles = {
  presentStructures: "Quais estruturas anatômicas estão predominantes?",
  patchAdequacy: "Qual a adequação do recorte?",
  ganglionCells: "Existem células ganglionares?",
  ganglionCellsAmount: "Qual a quantidade de células ganglionares",
  nerveBundleCharacteristics: "Quais características dos feixes nervosos?",
  plexus: "Existe plexo ou localização neural",
  inflammatoryAlterations: "Existem alterações inflamatórias e mucosas?",
  otherAlterations: "Existem outras alterações histológicas?",
  technicalArtifacts: "os artefatos técnicos?",
  artifactSeverity: "Quais alterações aparecem?",
} as const;

export const patchAdequacyLabels: Record<PatchAdequacy, string> = {
  adequate: "Adequado",
  partially_adequate: "Parcialmente adequado",
  inadequate_absense: "Inadequado por ausência de tecido",
  inadequate_artifact: "Inadequado por artefato",
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
  doubtful: "Suspeitas/duvidosas",
  not_evaluable: "Não avaliável",
};

export const ganglionCellsAmountLabels: Record<GanglionCellsAmount, string> = {
  zero: "Nenhuma",
  one: "Uma",
  two_to_five: "Duas a cinco",
  more_than_five: "Mais de cinco",
  not_evaluable: "Não avaliável",
};

export const plexusLabels: Record<Plexus, string> = {
  submucosal: "Plexo submucoso",
  myenteric: "Plexo mioentérico",
  two_plexus: "Dois plexos",
  structural_absense: "Sem plexo definido",
  not_visible: "Nenhum vísivel",
  not_evaluable: "Não avaliável",
};

export const nerveBundleLabels: Record<NerveBundleCharacteristic, string> = {
  present: "Presente/normal",
  hypertrofic: "Aumentado/hipertrófico",
  absent: "Ausente",
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
  no_alteration: "Sem alteração",
};

export const otherAlterationLabels: Record<OtherAlteration, string> = {
  fibrosis: "Fibrose",
  edema: "Edema",
  vascular_congestion: "Congestão vascular",
  bleeding: "Hemorragia",
  muscular_hipertrofy: "Hipertrofia muscular",
  lymphoid_hyperplasia: "Hiperplasia linfoide",
  ischemic_change: "Alteração isquêmica",
  microorganism: "Microrganismo ou parasito",
  neoplasm: "Neoplasia",
  dysplasia: "Displasia",
  other: "Outro achado",
};

export const technicalArtifactLabels: Record<TechnicalArtifact, string> = {
  fold: "Dobra",
  overlap: "Sobreposição",
  irregular_cut: "Corte irregular",
  bubble: "Bolha",
  dirt_or_precipitate: "Sujeira",
  inadequate_coloring: "Coloração inadequada",
  crush_artifact: "Crush artifact (esmagamento)",
  thermal_cauterization: "Cauterização térmica",
  tear: "Fragmentação e rasgos",
  inadequate_fixation: "Fixação inadequada",
  injection_artifacts: "Artefatos de injeção (anestésicos)",
  needle_paths: "Trajetos de agulha",
  sample_border: "Borda da amostra",
  absent_tissue: "Área sem tecido",
  no_artifact: "Sem artefato",
};

export const artifactSeverityLabels: Record<ArtifactSeverity, string> = {
  no_interference: "Sem interferência",
  interference: "Com interferência",
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

export const progressLabels: Record<ProgressStage, string> = {
  start: "No começo...",
  nearHalf: "Quase na metade...",
  pastHalf: "Passou da metade...",
  nearEnd: "Quase no fim...",
  last: "Última lâmina",
};

export const uiCopy = {
  heading: "Selecione as opções corretas:",
  answeredBadge: (answered: number, total: number) => `${answered}/${total}`,
  submitError:
    "Não foi possível salvar. Suas respostas foram mantidas — verifique sua conexão e tente novamente.",
  progressHelpLabel: "Como funciona a barra de progresso",
  progressHelp:
    "A barra mostra seu avanço nas lâminas de hoje. Cada trecho representa um quarto da sua meta — ou das lâminas disponíveis, se houver menos lâminas que a meta. Ao atingir a meta, ela é ampliada automaticamente.",
} as const;
