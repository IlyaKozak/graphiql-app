import { __Type } from '@/types/schema';

export function findNameType(key: string,obj: __Type, arr: String[] = []): string | null {
  if (obj.name !== null && obj.ofType === null) {
    let keyName = obj.name;
    let valueName = obj.name;
    arr.reverse().forEach((item) => {
      if (item === "NON_NULL") {
        valueName += '!'
      } else if( item === 'LIST'){
        valueName = '[' + valueName + ']'
      }
    })
    if(key === 'key') {
      return keyName
    } else if(key === 'value') {
      return valueName
    }
  } else if (obj.ofType && obj.name === null) {
    arr.push(String(obj.kind))
    return findNameType(key, obj.ofType, arr);
  } 
  return null;
}



/* export function findNameType(obj: __Type): string | null {
  let arr: string[] = [];
  if (obj.name !== null && obj.ofType === null) {
    console.log(arr)
    return obj.name;
  } else if (obj.ofType && obj.name === null) {
    arr.push(String(obj.kind))
    return findNameType(obj.ofType);
  } else {
    return null;
  }
} */


/* function findNameType(obj, arr = []) {
  let name = "";
  if (obj.name !== null && obj.ofType === null) {
    name = obj.name;
    arr.reverse().forEach((item) => {
      if (item === "NON_NULL") {
        name += '!'
      } else if( item === 'LIST'){
        name = '[' + name + ']'
      }
    })
    return name;
  } else if (obj.ofType && obj.name === null) {
    arr.push(String(obj.kind))
    return findNameType(obj.ofType, arr);
  } else {
    return null;
  }
} */
