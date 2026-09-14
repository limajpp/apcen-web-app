import type { FieldDescriptor, FieldId } from "./fields";
import type { AnalysisResultState } from "./types";

const asArray = (value: AnalysisResultState[FieldId]): string[] =>
  value === null ? [] : (value as string[]);

export function setSingleValue(
  state: AnalysisResultState,
  id: FieldId,
  value: string,
): AnalysisResultState {
  return { ...state, [id]: value } as AnalysisResultState;
}

export function toggleMultiValue(
  state: AnalysisResultState,
  field: FieldDescriptor,
  value: string,
): AnalysisResultState {
  const current = asArray(state[field.id]);
  const exclusive = field.exclusiveValues ?? [];

  let next: string[];

  if (current.includes(value)) {
    next = current.filter((item) => item !== value);
  } else if (exclusive.includes(value)) {
    next = [value];
  } else {
    next = [...current.filter((item) => !exclusive.includes(item)), value];
  }

  return { ...state, [field.id]: next } as AnalysisResultState;
}

export function isValueSelected(
  state: AnalysisResultState,
  field: FieldDescriptor,
  value: string,
): boolean {
  if (field.kind === "single") return state[field.id] === value;
  return asArray(state[field.id]).includes(value);
}
