import _forOwn from "lodash.forown";
import _cloneDeep from "lodash.clonedeep";
import _merge from "lodash.merge";
import _map from "lodash.map";

const mergeClasses = (classes, activeNames = []) => {
	const styles = (classes.default && _cloneDeep(classes.default)) || {};
	activeNames.map((name) => {
		const toMerge = classes[name];
		if (toMerge) {
			_forOwn(toMerge, (_value, key) => {
				if (!styles[key]) {
					styles[key] = {};
				}

				styles[key] = { ...styles[key], ...toMerge[key] };
			})
		}

		return name;
	})
	return styles;
}

const mergeStyles = (destroyKeys, ...classes) => {
	let styles = _merge({}, ...classes)["default"];

	if (destroyKeys) {
		let removed = {};
		_forOwn(styles, function (_value, key) {
			_merge(removed, styles[key]);
		});

		styles = removed;
	}

	return styles;
}

export { mergeClasses, mergeStyles };
