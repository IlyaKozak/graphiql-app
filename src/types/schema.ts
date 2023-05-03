export type dataType = {
  data: dataSchema;
};

export type dataSchema = {
  __schema: __Schema;
};

export type __Schema = {
  description: String | null;
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
  specifiedByURL: String | null;
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
  name: String;
  description: String | null;
  args: [__InputValue];
  type: __Type;
  isDeprecated: Boolean;
  deprecationReason: String;
};

export type __InputValue = {
  name: String;
  description: String | null;
  type: __Type;
  defaultValue: String | null;
};

export type __EnumValue = {
  name: String;
  description: String | null;
  isDeprecated: Boolean;
  deprecationReason: String;
};

export type __Directive = {
  name: String;
  description: String | null;
  locations: [__DirectiveLocation];
  args: [__InputValue];
  isRepeatable: Boolean;
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
