export type DataNormalizer<Input, Output> = (inputData: Input) => Output;

export type ObjectsMerger = <T, K extends Partial<T> = Partial<T>>(
  obj1: T,
  obj2: K
) => T;

export type NestedObjectsMerger = <T, K extends Partial<T> = Partial<T>>(
  obj1: Record<string, T>,
  obj2: Record<string, K>
) => Record<string, T>;
