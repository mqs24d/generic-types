import PathWithArrayIdx from '../object/pathWithArrayIdx';
import { Primitive } from '../object/primitive';
import TypeOfPath from '../object/typeOfPath';

export type ProjectionValue<T = string> = 0 | 1 | false | true | T;
export type ProjectionType<T, V = ProjectionValue> = /* isAny ?*/ 0 extends 1 & T
  ? any // stop if any
  : Partial<{
    // tslint:disable-next-line
    [K in keyof T]: T[K] extends Array<infer ArrayElement>
    ? ProjectionValue<V> | ProjectionType<ArrayElement, V>
    : T[K] extends Primitive
    ? ProjectionValue<V>
    : T[K] extends object
    ? ProjectionValue<V> | ProjectionType<T[K], V>
    : ProjectionValue<V>;
  }>;

export const isProjected = (value: ProjectionType<any> | ProjectionValue) => {
  return value && (value as ProjectionValue) !== 0 && (value as ProjectionValue) !== false;
};

export type DocUpdate<T, arr extends string = '0'> = { [K in PathWithArrayIdx<T, arr>]+?: TypeOfPath<T, K> };
