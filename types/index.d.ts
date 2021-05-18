import React from "react";

import * as _ from "csstype";


export type CSS = React.CSSProperties;

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


type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
type Overwrite<A, B> = B & Omit<A, keyof B>;

//https://stackoverflow.com/questions/67491438/
/**
 * New and improved typings!
 */
type ToUniqueTypes<B, T> = B extends true ?
	((
		{
			[K in keyof T]-?: (x: {
				[Z in keyof T[K]]: (y: T[K][Z]) => void;
			}) => void;
		}[keyof T]) extends
		((x: infer I) => void) ? I : never
	) : ((
		{
			[K in keyof T]-?: {
				[Z in keyof T[K]]: (y: T[K][Z]) => void
			}
		})
	)

type MergeProperties<B, T> = B extends true ? {
	[J in keyof T]: T[J] extends ((y: infer X) => void) ? X : never;
} : {
		[J in keyof T]: {
			[X in keyof T[J]]: T[J][X] extends ((y: infer Z) => void) ? Z : T[J][X]
		}
}

type MergedWithoutTop<T extends readonly any[]> = Expand<T extends readonly [infer L, ...infer I] ?
	Overwrite<MergeProperties<true, ToUniqueTypes<true, L>>, MergedWithoutTop<I>> : unknown>;

type MergedWithTop<T extends readonly any[]> = MergeProperties<false, T extends readonly [infer L, ...infer I] ?
	ToUniqueTypes<false, L> & MergedWithTop<I> : unknown>

interface CustomCSSProperties extends _.Properties<string | number, number> {
	[index: string]: _.Properties<string | number, number> | unknown;
}

interface Classes<T> {
	default: T & {
		[K in keyof T]?: CustomCSSProperties;
	}
	[scope: string]: T & {
		[K in keyof T]?: CustomCSSProperties;
	}
}

export default function reactCSSExtra<T>(classes: Classes<T>, ...activations: Array<any>): T;

export function styleMerge<B extends boolean, T extends any[]>(destroyTopLevelKeys: B, ...classes: T): B extends false ? MergedWithTop<T> : MergedWithoutTop<T>;

export function hover<A>(component: React.ComponentClass<A> | React.FunctionComponent<A>): React.ComponentClass<A>;
export function loop(index: number, length: number): LoopableProps;