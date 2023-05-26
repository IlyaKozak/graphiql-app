import { __Field } from '../types/schema';

const fieldBeforeParenthese = /\w+(?=\s*?\((?:[^()]*\([^()]*\))*[^()]*$)/;

const getHintsForArgs = (firstPart: string, fieldsOfType: [__Field] | null | undefined) => {
  if (!fieldsOfType) return null;
  const fieldName = (firstPart.match(fieldBeforeParenthese) || [])[0];
  if (!fieldName) return null;
  const field = fieldsOfType.find((field) => field.name == fieldName);
  if (!field) return null;
  const args = field.args.map((arg) => arg.name);
  return args;
};

export default getHintsForArgs;
