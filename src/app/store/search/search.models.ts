export type SearchOperator =
  | 'is'
  | 'equals'
  | 'contains'
  | 'startsWith'
  | 'endsWith'
  | 'notEquals';

export type LogicalOp = 'AND' | 'OR' | null;

export interface SearchTerm {
  field: string;
  operator: SearchOperator;
  keyword: string | number;
}

export interface SearchState {
  conditions: SearchTerm[];
  logicalOperator: LogicalOp[];
  results: any[];
  loading: boolean;
  error: string | null;
}
