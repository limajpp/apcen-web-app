import {
  analysisFields,
  hasTechnicalArtifact,
  isFieldVisible,
  visibleFields,
  type FieldDescriptor,
} from "./fields";
import type { AnalysisResultState, CreateResultPayload } from "./types";
import type { FieldId } from "./fields";

export function isFieldAnswered(
  state: AnalysisResultState,
  field: FieldDescriptor,
): boolean {
  const value = state[field.id];
  if (value === null) return false;
  if (field.kind === "single") return true;
  return (value as string[]).length > 0;
}

export function isFieldSatisfied(
  state: AnalysisResultState,
  field: FieldDescriptor,
): boolean {
  return (
    !isFieldVisible(state, field) ||
    !field.required ||
    isFieldAnswered(state, field)
  );
}

export function answeredCount(
  state: AnalysisResultState,
  allowedFieldIds?: readonly FieldId[],
): number {
  return visibleFields(state, allowedFieldIds).filter((field) =>
    isFieldAnswered(state, field),
  ).length;
}

export function isComplete(
  state: AnalysisResultState,
  allowedFieldIds?: readonly FieldId[],
): boolean {
  return analysisFields.every(
    (field) =>
      (allowedFieldIds && !allowedFieldIds.includes(field.id)) ||
      isFieldSatisfied(state, field),
  );
}

export function getFirstIncompleteFieldId(
  state: AnalysisResultState,
  allowedFieldIds?: readonly FieldId[],
): FieldId | null {
  return (
    analysisFields.find(
      (field) =>
        (!allowedFieldIds || allowedFieldIds.includes(field.id)) &&
        !isFieldSatisfied(state, field),
    )?.id ?? null
  );
}

export function toCreateResultPayload(
  state: AnalysisResultState,
  allowedFieldIds?: readonly FieldId[],
): Partial<CreateResultPayload> {
  if (
    !analysisFields.every(
      (field) =>
        (allowedFieldIds && !allowedFieldIds.includes(field.id)) ||
        isFieldSatisfied(state, field),
    )
  ) {
    throw new Error(
      "Cannot build an analysis payload from an incomplete form.",
    );
  }

  const payload: Partial<CreateResultPayload> = {};
  const isIncluded = (field: FieldId) =>
    !allowedFieldIds || allowedFieldIds.includes(field);

  if (isIncluded("patchAdequacy"))
    payload.patchAdequacy = state.patchAdequacy!;
  if (isIncluded("ganglionCells"))
    payload.ganglionCells = state.ganglionCells!;
  if (isIncluded("ganglionCellsAmount"))
    payload.ganglionCellsAmount = state.ganglionCellsAmount!;
  if (isIncluded("plexus")) payload.plexus = state.plexus!;
  if (isIncluded("artifactSeverity")) {
    payload.artifactSeverity = hasTechnicalArtifact(state)
      ? state.artifactSeverity!
      : "no_interference";
  }
  if (isIncluded("presentStructures"))
    payload.presentStructures = state.presentStructures ?? [];
  if (isIncluded("inflammatoryAlterations"))
    payload.inflammatoryAlterations = state.inflammatoryAlterations ?? [];
  if (isIncluded("otherAlterations"))
    payload.otherAlterations = state.otherAlterations ?? [];
  if (isIncluded("technicalArtifacts"))
    payload.technicalArtifacts = state.technicalArtifacts ?? [];
  if (isIncluded("nerveBundleCharacteristics"))
    payload.nerveBundleCharacteristics =
      state.nerveBundleCharacteristics ?? [];

  return payload;
}
