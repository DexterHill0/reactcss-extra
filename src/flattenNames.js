import _forOwn from "lodash.forown";
import _isPlainObject from "lodash.isplainobject";
import _isString from "lodash.isstring";
import _map from "lodash.map";

export const flattenNames = (things = []) => {
	const names = [];

	_map(things, (thing) => {
		if (Array.isArray(thing)) {
			flattenNames(thing).map(name => names.push(name));
		} else if (_isPlainObject(thing)) {
			_forOwn(thing, (value, key) => {
				value === true && names.push(key);
				names.push(`${key}-${value}`);
			})
		} else if (_isString(thing)) {
			names.push(thing);
		}
	})

	return names;
}

export default flattenNames;
