import type { AnalysisResultState } from "./types";

export type FieldId = keyof AnalysisResultState;

export type FieldDescriptor = {
  id: FieldId;
  kind: "single" | "multi";
  required: boolean;
  options: readonly string[];
  exclusiveValues?: readonly string[];
};

export const analysisFields: readonly FieldDescriptor[] = [
  {
    id: "presentStructures",
    kind: "multi",
    required: false,
    options: ["mucosa", "muscularis_mucosae", "submucosa", "muscularis_propria", "serous"],
  },
  {
    id: "patchAdequacy",
    kind: "single",
    required: true,
    options: ["inadequate_absense", "adequate", "partially_adequate", "inadequate_artifact", "not_evaluable"],
  },
  {
    id: "ganglionCells",
    kind: "single",
    required: true,
    options: ["present", "absent", "doubtful", "not_evaluable"],
  },
  {
    id: "ganglionCellsAmount",
    kind: "single",
    required: true,
    options: ["zero", "one", "two_to_five", "more_than_five", "not_evaluable"],
  },
  {
    id: "nerveBundleCharacteristics",
    kind: "multi",
    required: true,
    options: ["present", "hypertrofic", "absent", "not_evaluable"],
    exclusiveValues: ["absent", "not_evaluable"],
  },
  {
    id: "plexus",
    kind: "single",
    required: true,
    options: ["submucosal", "myenteric", "two_plexus", "structural_absense", "not_visible", "not_evaluable"],
  },
  {
    id: "inflammatoryAlterations",
    kind: "multi",
    required: true,
    options: [
      "acute_inflammation",
      "chronic_inflammation",
      "cryptitis",
      "crypt_abscess",
      "crypt_dilation",
      "erosion",
      "mucin_increase",
      "mucin_depletion",
      "necrosis",
      "ulceration",
      "no_alteration",
    ],
    exclusiveValues: ["no_alteration"],
  },
  {
    id: "otherAlterations",
    kind: "multi",
    required: false,
    options: [
      "fibrosis",
      "vascular_congestion",
      "dysplasia",
      "muscular_hipertrofy",
      "lymphoid_hyperplasia",
      "edema",
      "ischemic_change",
      "microorganism",
      "bleeding",
      "neoplasm",
      "other",
    ],
  },
  {
    id: "technicalArtifacts",
    kind: "multi",
    required: true,
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
    required: true,
    options: ["no_interference", "interference"],
  },
];

export const totalFields = analysisFields.length;

export const fieldSectionId = (id: FieldId) => `analysis-field-${id}`;
