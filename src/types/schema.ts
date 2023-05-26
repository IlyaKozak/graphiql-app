export type dataType = {
  data: dataSchema;
};

export type dataSchema = {
  __schema: __Schema;
};

export type __Schema = {
  description: string | null;
  types: [__Type];
  queryType: __Type;
  mutationType: __Type | null;
  subscriptionType: __Type | null;
  directives: [__Directive];
};

export type __Type = {
  kind: __TypeKind;
  name: string | null;
  description: string | null;
  fields: [__Field] | null;
  interfaces: [__Type] | null;
  possibleTypes: [__Type] | null;
  enumValues: [__EnumValue] | null;
  inputFields: [__InputValue] | null;
  ofType: __Type | null;
  specifiedByURL: string | null;
};

export enum __TypeKind {
  SCALAR,
  OBJECT,
  INTERFACE,
  UNION,
  ENUM,
  INPUT_OBJECT,
  LIST,
  NON_NULL,
}

export type __Field = {
  name: string;
  description: string | null;
  args: [__InputValue];
  type: __Type;
  isDeprecated: boolean;
  deprecationReason: string;
};

export type __InputValue = {
  name: string;
  description: string | null;
  type: __Type;
  defaultValue: string | null;
};

export type __EnumValue = {
  name: string;
  description: string | null;
  isDeprecated: boolean;
  deprecationReason: string;
};

export type __Directive = {
  name: string;
  description: string | null;
  locations: [__DirectiveLocation];
  args: [__InputValue];
  isRepeatable: boolean;
};

export enum __DirectiveLocation {
  QUERY,
  MUTATION,
  SUBSCRIPTION,
  FIELD,
  FRAGMENT_DEFINITION,
  FRAGMENT_SPREAD,
  INLINE_FRAGMENT,
  VARIABLE_DEFINITION,
  SCHEMA,
  SCALAR,
  OBJECT,
  FIELD_DEFINITION,
  ARGUMENT_DEFINITION,
  INTERFACE,
  UNION,
  ENUM,
  ENUM_VALUE,
  INPUT_OBJECT,
  INPUT_FIELD_DEFINITION,
}
