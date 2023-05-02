import { __Schema as Schema } from './schema';
import { Dispatch, SetStateAction } from 'react';
import { __Type, __TypeKind, __EnumValue, __Field, __InputValue } from './schema';

export type DocsType = {
  schema: Schema | null;
  onHeader: (value: String) => void;
  onDescription: (value: String) => void;
  setValueBtnBack: (value: String) => void;
  setSchowBtnBack: (value: boolean) => void;
};

export type HeaderDocsType = {
  header: String;
  btnName: String;
  showBtnBack: boolean;
  setClick: Dispatch<SetStateAction<boolean>>;
};

export type DescriptionType = {
  description: String;
};

export type FieldsType = {
  fields: __Field[] | null;
};

export type ValueRoot =
  | string
  | String
  | __Type
  | __TypeKind
  | [__Type]
  | [__Field]
  | [__EnumValue]
  | [__InputValue]
  | null;
