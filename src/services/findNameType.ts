import { __Type } from '@/types/schema';

export function findNameType(obj: __Type): string | null {
  if (obj.name !== null && obj.ofType === null) {
    return obj.name;
  } else if (obj.ofType) {
    return findNameType(obj.ofType);
  } else {
    return null;
  }
}
