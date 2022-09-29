import { NestedObjectsMerger, ObjectsMerger } from 'types/_';

export const mergeObjects: ObjectsMerger = <T, K = T>(obj1: T, obj2: K) => {
  return { ...obj1, ...obj2 };
};

export const mergeNestedObjects: NestedObjectsMerger = <
  T,
  K extends Partial<T> = Partial<T>
>(
  obj1: Record<string, T>,
  obj2: Record<string, K>
) => {
  const res: Record<string, T> = { ...obj1 };
  for (const property in res) {
    const existedMappingProperty = obj2[property];
    if (existedMappingProperty)
      res[property] = mergeObjects(res[property], existedMappingProperty);
  }

  return res;
};

export const toggleArrayValue = <T>(array: T[], value: T) =>
  array.includes(value)
    ? array.filter((el) => el !== value)
    : [...array, value];
