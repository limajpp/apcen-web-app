export type PatchAdequacy =
  | "adequate"
  | "partially_adequate"
  | "inadequate_absense"
  | "inadequate_artifact"
  | "not_evaluable";

export type GanglionCells = "present" | "absent" | "doubtful" | "not_evaluable";

export type GanglionCellsAmount =
  | "zero"
  | "one"
  | "two_to_five"
  | "more_than_five"
  | "not_evaluable";

export type Plexus =
  | "submucosal"
  | "myenteric"
  | "two_plexus"
  | "structural_absense"
  | "not_visible"
  | "not_evaluable";

export type ArtifactSeverity = "no_interference" | "interference";

export type Structure =
  | "mucosa"
  | "muscularis_mucosae"
  | "submocosa"
  | "muscularis_propria"
  | "serous";

export type InflammatoryAlteration =
  | "acute_inflammation"
  | "chronic_inflammation"
  | "cryptitis"
  | "crypt_abscess"
  | "crypt_dilation"
  | "mucin_depletion"
  | "mucin_increase"
  | "erosion"
  | "ulceration"
  | "necrosis"
  | "no_alteration";

export type OtherAlteration =
  | "fibrosis"
  | "edema"
  | "vascular_congestion"
  | "bleeding"
  | "muscular_hipertrofy"
  | "lymphoid_hyperplasia"
  | "ischemic_change"
  | "microorganism"
  | "neoplasm"
  | "dysplasia"
  | "other";

export type TechnicalArtifact =
  | "fold"
  | "overlap"
  | "irregular_cut"
  | "bubble"
  | "dirt_or_precipitate"
  | "inadequate_coloring"
  | "crush_artifact"
  | "thermal_cauterization"
  | "tear"
  | "inadequate_fixation"
  | "injection_artifacts"
  | "needle_paths"
  | "sample_border"
  | "absent_tissue"
  | "no_artifact";

export type NerveBundleCharacteristic =
  | "present"
  | "hypertrofic"
  | "absent"
  | "not_evaluable";

export type AnalysisResultState = {
  patchAdequacy: PatchAdequacy | null;
  ganglionCells: GanglionCells | null;
  ganglionCellsAmount: GanglionCellsAmount | null;
  plexus: Plexus | null;
  artifactSeverity: ArtifactSeverity | null;
  presentStructures: Structure[] | null;
  inflammatoryAlterations: InflammatoryAlteration[] | null;
  otherAlterations: OtherAlteration[] | null;
  technicalArtifacts: TechnicalArtifact[] | null;
  nerveBundleCharacteristics: NerveBundleCharacteristic[] | null;
};

export type CreateResultPayload = {
  patchAdequacy: PatchAdequacy;
  ganglionCells: GanglionCells;
  ganglionCellsAmount: GanglionCellsAmount;
  plexus: Plexus;
  artifactSeverity: ArtifactSeverity;
  presentStructures: Structure[];
  inflammatoryAlterations: InflammatoryAlteration[];
  otherAlterations: OtherAlteration[];
  technicalArtifacts: TechnicalArtifact[];
  nerveBundleCharacteristics: NerveBundleCharacteristic[];
};

export const emptyAnalysisResult: AnalysisResultState = {
  patchAdequacy: null,
  ganglionCells: null,
  ganglionCellsAmount: null,
  plexus: null,
  artifactSeverity: null,
  presentStructures: null,
  inflammatoryAlterations: null,
  otherAlterations: null,
  technicalArtifacts: null,
  nerveBundleCharacteristics: null,
};
