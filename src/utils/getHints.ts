import { __Schema, __Type } from '../types/schema';

const isInsideArgs = /\([^)]*$/;
const getAllFields = /\w+(?=\s*(\(.*\))?\s*{)/g;
const getPairedParenthesis = /\{[^{}]*\}/;

const graphQLQueryTypes = {
  Query: 'query',
  Mutation: 'mutation',
  Subscription: 'subscription',
};

const getHints = (event: React.KeyboardEvent<HTMLTextAreaElement>, schema: __Schema) => {
  const target = event.target as HTMLTextAreaElement;
  const text = target.value;
  const start = target.selectionStart;
  const firstPart = removePairedParentheses(text.slice(0, start));
  const wordPart = (firstPart.match(/\w+$/) || [])[0];
  if (isInsideArgs.test(firstPart)) return null;

  let openBracketsCount =
    (firstPart.match(/{/g) || []).length - (firstPart.match(/}/g) || []).length;
  openBracketsCount = openBracketsCount < 0 ? 0 : openBracketsCount;
  if (!openBracketsCount) return [graphQLQueryTypes.Query];
  const graphQLStack = (firstPart.match(getAllFields) || []).reverse();

  let currentType = schema.queryType.name;
  if (!currentType) return null;

  let hints = getFields(schema, currentType)?.map((field) => field.name);

  while (openBracketsCount > 0 && graphQLStack.length) {
    openBracketsCount--;
    const currentField = graphQLStack.pop();
    if (
      currentField === graphQLQueryTypes.Mutation ||
      currentField === graphQLQueryTypes.Subscription
    )
      return null;

    if (currentField === graphQLQueryTypes.Query) continue;

    const fields = getFields(schema, currentType);
    const fieldType = fields?.find(
      (field) => field.name.toLowerCase() === currentField?.toLowerCase()
    )?.type;
    if (!fieldType) return null;
    currentType = getCurrentType(fieldType);
    if (!currentType) return null;

    hints = getFields(schema, currentType)?.map((field) => field.name);
  }

  if (wordPart) {
    return hints?.filter((hint) => hint.startsWith(wordPart)) || null;
  }
  return hints || null;
};

function getFields(schema: __Schema, currentType: string) {
  return schema.types.find((type) => type.name?.toLowerCase() === currentType.toLowerCase())
    ?.fields;
}

function removePairedParentheses(text: string) {
  let textWithouthPairedParenthesis = text;

  while (getPairedParenthesis.test(textWithouthPairedParenthesis)) {
    textWithouthPairedParenthesis = textWithouthPairedParenthesis
      .split(getPairedParenthesis)
      .join('');
  }

  return textWithouthPairedParenthesis;
}

function getCurrentType(fieldType: __Type) {
  let currentType = fieldType?.name;
  let currentFieldType = fieldType?.ofType;

  while (!currentType) {
    currentType = currentFieldType?.name || null;
    currentFieldType = currentFieldType?.ofType || null;
  }

  return currentType;
}

export default getHints;
