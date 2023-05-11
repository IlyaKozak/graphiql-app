import { __Schema as Schema } from './schema';
import { __Type, __TypeKind, __EnumValue, __Field, __InputValue } from './schema';

export type DocsType = {
  schema: Schema | null;
  handleLableClick: () => void;
};

export type DocsArgumentsType = {
  field: __Field | __InputValue;
  handleClickArgument: (value: string | null) => void;
};

export type DescriptionType = {
  description: string;
};

export type FieldsType = {
  fields: __Field[] | null;
};

export type ValueRoot =
  | string
  | __Type
  | __TypeKind
  | [__Type]
  | [__Field]
  | [__EnumValue]
  | [__InputValue]
  | null;

export type HeaderDocsType = {
  handleLableClick: () => void;
  hadleClickBack: () => void;
  valueBtnBack: string;
  showBtnBack: boolean;
};

export type RootType = {
  handleClickRoot: (value: ValueRoot) => void;
  stack: (__Field | __Type | __InputValue)[];
};

export type FieldsDocsType = {
  stack: (__Field | __Type | __InputValue)[];
  handleSearchTypes: (value: string | null) => void;
  handleClickKey: (item: __Field | __InputValue) => void;
};

export type InputFieldsDocsType = {
  stack: (__Field | __Type | __InputValue)[];
  handleSearchTypes: (value: string | null) => void;
  handleClickKey: (item: __Field | __InputValue) => void;
};

export type FieldDocsType = {
  stack: (__Field | __Type | __InputValue)[];
  handleSearchTypes: (value: string | null) => void;
};

export type InputFieldDocsType = {
  stack: (__Field | __Type | __InputValue)[];
  handleSearchTypes: (value: string | null) => void;
};
