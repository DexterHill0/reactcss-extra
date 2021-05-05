import flattenNames from "./flattenNames";
import { mergeClasses, mergeStyles } from "./mergeClasses";
import autoprefix from "./autoprefix";

import hover from "./components/hover";
import active from "./components/active";
import loopable from "./loop";

const reactCSSExtra = (classes, ...activations) => {
	const activeNames = flattenNames(activations);
	const merged = mergeClasses(classes, activeNames);

	return autoprefix(merged);
}

const styleMerge = (destroyKeys, ...classes) => {
	return mergeStyles(destroyKeys, ...classes);
}

export { styleMerge, hover, active, loopable };
export default reactCSSExtra;
