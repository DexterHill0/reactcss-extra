import React from "react";

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
	default: Partial<T>;
	[scope: string]: Partial<T>;
}

type ClassesOptional<T> = {
	[P in keyof Classes<T>]?: T;
}

export type CSS = React.CSSProperties;
export default function reactCSSExtra<T>(classes: ClassesOptional<T>, ...activations: Array<any>): T;

export function styleMerge(destroyTopLevelKeys: boolean, ...classes: Array<object>): object;

export function hover<A>(component: React.ComponentClass<A> | React.StatelessComponent<A>): React.ComponentClass<A>;
export function loop(index: number, length: number): LoopableProps;