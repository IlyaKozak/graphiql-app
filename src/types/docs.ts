import { __Schema as Schema } from './schema';
import { Dispatch, SetStateAction } from 'react';
import { __Type, __TypeKind, __EnumValue, __Field, __InputValue } from './schema';

export type DocsType = {
  schema: Schema | null;
};

export type DocsArgumentsType = {
  item: __Field;
  handleClickArgument: (value: string | null) => void;
};

export type HeaderDocsType = {
  header: string;
  btnName: string;
  showBtnBack: boolean;
  setClick: Dispatch<SetStateAction<boolean>>;
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
