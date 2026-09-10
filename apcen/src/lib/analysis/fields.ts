import type { AnalysisResultState } from "./types";

export type FieldId = keyof AnalysisResultState;

export type FieldDescriptor = {
  id: FieldId;
  kind: "single" | "multi";
  control: "pills" | "dropdown";
  options: readonly string[];
  exclusiveValues?: readonly string[];
  allowNone?: boolean;
};

export const analysisFields: readonly FieldDescriptor[] = [
  {
    id: "patchAdequacy",
    kind: "single",
    control: "pills",
    options: [
      "adequate",
      "partially_adequate",
      "inadequate_absense",
      "inadequate_artifact",
      "not_evaluable",
    ],
  },
  {
    id: "presentStructures",
    kind: "multi",
    control: "pills",
    options: [
      "mucosa",
      "muscularis_mucosae",
      "submucosa",
      "muscularis_propria",
      "serous",
    ],
    allowNone: true,
  },
  {
    id: "ganglionCells",
    kind: "single",
    control: "pills",
    options: ["present", "absent", "doubtful", "not_evaluable"],
  },
  {
    id: "ganglionCellsAmount",
    kind: "single",
    control: "pills",
    options: ["zero", "one", "two_to_five", "more_than_five", "not_evaluable"],
  },
  {
    id: "plexus",
    kind: "single",
    control: "pills",
    options: [
      "submucosal",
      "myenteric",
      "two_plexus",
      "structural_absense",
      "not_visible",
      "not_evaluable",
    ],
  },
  {
    id: "nerveBundleCharacteristics",
    kind: "multi",
    control: "pills",
    options: ["present", "hypertrofic", "absent", "not_evaluable"],
    exclusiveValues: ["absent", "not_evaluable"],
  },
  {
    id: "inflammatoryAlterations",
    kind: "multi",
    control: "dropdown",
    options: [
      "acute_inflammation",
      "chronic_inflammation",
      "cryptitis",
      "crypt_abscess",
      "crypt_dilation",
      "mucin_depletion",
      "mucin_increase",
      "erosion",
      "ulceration",
      "necrosis",
      "no_alteration",
    ],
    exclusiveValues: ["no_alteration"],
  },
  {
    id: "otherAlterations",
    kind: "multi",
    control: "dropdown",
    options: [
      "fibrosis",
      "edema",
      "vascular_congestion",
      "bleeding",
      "muscular_hipertrofy",
      "lymphoid_hyperplasia",
      "ischemic_change",
      "microorganism",
      "neoplasm",
      "dysplasia",
      "other",
    ],
    allowNone: true,
  },
  {
    id: "technicalArtifacts",
    kind: "multi",
    control: "dropdown",
    options: [
      "fold",
      "overlap",
      "irregular_cut",
      "bubble",
      "dirt_or_precipitate",
      "inadequate_coloring",
      "crush_artifact",
      "thermal_cauterization",
      "tear",
      "inadequate_fixation",
      "injection_artifacts",
      "needle_paths",
      "sample_border",
      "absent_tissue",
      "no_artifact",
    ],
    exclusiveValues: ["no_artifact"],
  },
  {
    id: "artifactSeverity",
    kind: "single",
    control: "pills",
    options: ["no_interference", "interference"],
  },
] as const;

export const totalFields = analysisFields.length;

export const fieldSectionId = (id: FieldId) => `analysis-field-${id}`;

export const letterFor = (index: number) => String.fromCharCode(65 + index);
