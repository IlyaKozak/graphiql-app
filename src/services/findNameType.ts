import { __Type, __InputValue } from '@/types/schema';

export function findNameType(key: string, obj: __Type, arr: String[] = []): string | null {
  if (obj.name !== null && obj.ofType === null) {
    let keyName = obj.name;
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


/* export function findArguments(args: __InputValue[] ){ 
  
  args.forEach((arg) => {

  })

} */