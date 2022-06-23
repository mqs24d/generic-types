import { Primitive } from "./primitive";

type DeepSubKeys<T, K extends string, arr extends string, subArray extends true | false> = K extends keyof T
  ? subArray extends true
  ? `${arr}.${K}.${PathWithArrayIdx<T[K], arr>}`
  : `${K}.${PathWithArrayIdx<T[K], arr>}`
  : never;

type PathWithArrayIdx<T, arr extends string = '0', subArray extends true | false = false> = object extends T
  ? never
  : T extends Primitive
  ? never
  : T extends readonly unknown[]
  ? PathWithArrayIdx<T[number], arr, true>
  : T extends object
  ? (keyof T & string) | DeepSubKeys<T, keyof T & string, arr, subArray>
  : never;

export default PathWithArrayIdx;
