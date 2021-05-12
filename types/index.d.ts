import React from "react";

import * as _ from "csstype"

//https://stackoverflow.com/questions/67491438/
/**
 * New and improved typings!
 */
type ToUniqueTypes<T> =
	((
		{
			[K in keyof T]-?: (x: {
				[Z in keyof T[K]]: (y: T[K][Z]) => void;
			}) => void;
		}[keyof T]) extends
		((x: infer I) => void) ? I : never
	);

type MergeProperties<T> = {
	[J in keyof T]: T[J] extends ((y: infer X) => void) ? X : never;
}

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

type Overwrite<A, B> = B & Omit<A, keyof B>;

type MergedClasses<T extends readonly any[]> = Expand<T extends readonly [infer L, ...infer I] ?
	Overwrite<MergeProperties<ToUniqueTypes<L>>, MergedClasses<I>> : unknown>;


type Intersect<A, B> = A & B;


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
		[K in keyof T]?: Partial<Intersect<T[K], _.Properties>>;
	}
	[scope: string]: {
		[K in keyof T]?: Partial<Intersect<T[K], _.Properties>>;
	}
}

export type CSS = React.CSSProperties;
export default function reactCSSExtra<T>(classes: Classes<T>, ...activations: Array<any>): T;

export function styleMerge<B extends boolean, T extends any[]>(destroyTopLevelKeys: B, ...classes: T): MergedClasses<T>;

export function hover<A>(component: React.ComponentClass<A> | React.FunctionComponent<A>): React.ComponentClass<A>;
export function loop(index: number, length: number): LoopableProps;