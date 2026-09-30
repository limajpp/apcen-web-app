import {
  analysisFields,
  hasTechnicalArtifact,
  isFieldVisible,
  visibleFields,
  type FieldDescriptor,
  type FieldId,
} from "./fields";
import type { AnalysisResultState, CreateResultPayload } from "./types";

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

export function answeredCount(state: AnalysisResultState): number {
  return visibleFields(state).filter((field) => isFieldAnswered(state, field))
    .length;
}

export function isComplete(state: AnalysisResultState): boolean {
  return analysisFields.every((field) => isFieldSatisfied(state, field));
}

export function getFirstIncompleteFieldId(
  state: AnalysisResultState,
): FieldId | null {
  return (
    analysisFields.find((field) => !isFieldSatisfied(state, field))?.id ?? null
  );
}

export function toCreateResultPayload(
  state: AnalysisResultState,
): CreateResultPayload {
  if (!isComplete(state)) {
    throw new Error("Cannot build an analysis payload from an incomplete form.");
  }

  return {
    patchAdequacy: state.patchAdequacy!,
    ganglionCells: state.ganglionCells!,
    ganglionCellsAmount: state.ganglionCellsAmount!,
    plexus: state.plexus!,
    artifactSeverity: hasTechnicalArtifact(state)
      ? state.artifactSeverity!
      : "no_interference",
    presentStructures: state.presentStructures ?? [],
    inflammatoryAlterations: state.inflammatoryAlterations ?? [],
    otherAlterations: state.otherAlterations ?? [],
    technicalArtifacts: state.technicalArtifacts ?? [],
    nerveBundleCharacteristics: state.nerveBundleCharacteristics ?? [],
  };
}
