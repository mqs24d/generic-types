import { Prev } from './util';

type TypeOfPath<T, K, D extends number = 10> = [D] extends [never]
  ? any // stop if to deeply nested
  : K extends keyof T
  ? T[K]
  : K extends `${infer K1}.${infer rest}`
  ? K1 extends keyof T
    ? T[K1] extends readonly unknown[]
      ? rest extends `${infer ArrayIdx}.${infer ArrayRest}`
        ? TypeOfPath<T[K1][number], ArrayRest, Prev[D]>
        : T[K1][number]
      : TypeOfPath<T[K1], rest, Prev[D]>
    : any
  : any;

export default TypeOfPath;
