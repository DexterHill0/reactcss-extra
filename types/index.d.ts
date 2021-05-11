import React from "react";

import * as _ from "csstype"

//https://github.com/microsoft/TypeScript/issues/13298#issuecomment-707364842
type UnionToArray<T> = (
	(
		(
			T extends any
			? (t: T) => T
			: never
		) extends infer U
		? (U extends any
			? (u: U) => any
			: never
		) extends (v: infer V) => any
		? V
		: never
		: never
	) extends (_: any) => infer W
	? [...UnionToArray<Exclude<T, W>>, W]
	: []
);


//https://stackoverflow.com/questions/67475386/typescript-generics-loop-over-object-array-and-intersect-them
type IntersectObjectArray<A extends any> = A extends [infer T, ...infer R] ? T & IntersectObjectArray<R> : unknown

/**
 * My limited TS knowledge means that it's probably possible to expand the objects with just one type without any union to array stuff, but
 * at least it works, right?
 */
type ExpandTopKeys<A extends any> = A extends { [key: string]: infer X } ? { [K in keyof X]: X[K] } : unknown
type Expand<A extends any> = IntersectObjectArray<UnionToArray<ExpandTopKeys<A>>>;

/**
 * "B" is "destroyTopLevelKeys". If it is false, it will just intersect the objects.
 * If true, it will intersect them, remove the top keys, convert from a union to array and again, intersect those objects
 */
type MergedClasses<B, C extends object[]> = B extends false ? IntersectObjectArray<C> : Expand<IntersectObjectArray<C>>;

type Union<A, B> = A & B;


interface LoopableProps extends React.Props<any> {
	"nth-child": number;
	"first-child"?: boolean;
	"last-child"?: boolean;
	even?: boolean;
	odd?: boolean;
}

interface HoverProps<T> extends React.Props<T> {
	hover?: boolean;
}

interface Classes<T> {
	default: {
		[K in keyof T]?: Partial<Union<T[K], _.Properties>>;
	}
	[scope: string]: {
		[K in keyof T]?: Partial<Union<T[K], _.Properties>>;
	}
}


export type CSS = React.CSSProperties;
export default function reactCSSExtra<T>(classes: Classes<T>, ...activations: Array<any>): T;

export function styleMerge<B extends boolean, T extends object[]>(destroyTopLevelKeys: B, ...classes: T): MergedClasses<B, T>;

export function hover<A>(component: React.ComponentClass<A> | React.FunctionComponent<A>): React.ComponentClass<A>;
export function loop(index: number, length: number): LoopableProps;