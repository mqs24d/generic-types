import { Primitive } from "./primitive";

type DeepSubKeys<T, K extends string> = K extends keyof T ? `${K}.${Path<T[K]>}` : never;

type Path<T> = object extends T
  ? never
  : T extends Primitive
  ? never
  : T extends readonly unknown[]
  ? Path<T[number]>
  : T extends object
  ? (keyof T & string) | DeepSubKeys<T, keyof T & string>
  : never;

export default Path;
