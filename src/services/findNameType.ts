import { __Type } from '@/types/schema';

export function findNameType(key: string, obj: __Type, arr: string[] = []): string | null {
  if (obj.name !== null && obj.ofType === null) {
    const keyName = obj.name;
    let valueName = obj.name;
    arr.reverse().forEach((item) => {
      if (item === 'NON_NULL') {
        valueName += '!';
      } else if (item === 'LIST') {
        valueName = '[' + valueName + ']';
      }
    });
    if (key === 'key') {
      return keyName;
    } else if (key === 'value') {
      return valueName;
    }
  } else if (obj.ofType && obj.name === null) {
    arr.push(String(obj.kind));
    return findNameType(key, obj.ofType, arr);
  }
  return null;
}

export function findArguments(obj: __Type, arr: string[] = []): string | null {
  console.log(obj);
  if (obj.name !== null && obj.ofType === null) {
    let valueName = obj.name;
    arr.reverse().forEach((item) => {
      if (item === 'NON_NULL') {
        valueName += '!';
      } else if (item === 'LIST') {
        valueName = '[' + valueName + ']';
      }
    });
    return valueName;
  } else if (obj.ofType && obj.name === null) {
    arr.push(String(obj.kind));
    return findArguments(obj.ofType, arr);
  }
  return null;
}
