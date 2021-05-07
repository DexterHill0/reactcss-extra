import _forOwn from "lodash.forown";
import _cloneDeep from "lodash.cloneDeep";
import _assign from "lodash.assign";
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
	let styles = _assign({}, ...classes);

	if (destroyKeys) {
		let removed = {};
		_forOwn(styles, function (_value, key) {
			_assign(removed, styles[key]);
		});

		styles = removed;
	}

	return styles;
}

export { mergeClasses, mergeStyles };
