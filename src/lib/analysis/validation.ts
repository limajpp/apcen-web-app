import {
  analysisFields,
  isFieldAllowed,
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
  allowedFieldIds?: readonly FieldId[],
): boolean {
  return (
    !isFieldAllowed(field, allowedFieldIds) ||
    !isFieldVisible(state, field, allowedFieldIds) ||
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
  return analysisFields.every((field) =>
    isFieldSatisfied(state, field, allowedFieldIds),
  );
}

export function getFirstIncompleteFieldId(
  state: AnalysisResultState,
  allowedFieldIds?: readonly FieldId[],
): FieldId | null {
  return (
    analysisFields.find(
      (field) => !isFieldSatisfied(state, field, allowedFieldIds),
    )?.id ?? null
  );
}

const hiddenSeverity = "no_interference";

export function toCreateResultPayload(
  state: AnalysisResultState,
  allowedFieldIds?: readonly FieldId[],
): Partial<CreateResultPayload> {
  if (!isComplete(state, allowedFieldIds)) {
    throw new Error("Cannot build an analysis payload from an incomplete form.");
  }

  const payload: Record<string, unknown> = {};

  for (const field of analysisFields) {
    if (!isFieldAllowed(field, allowedFieldIds)) continue;

    if (!isFieldVisible(state, field, allowedFieldIds)) {
      payload[field.id] = hiddenSeverity;
    } else {
      payload[field.id] =
        state[field.id] ?? (field.kind === "multi" ? [] : null);
    }
  }

  return payload as Partial<CreateResultPayload>;
}
