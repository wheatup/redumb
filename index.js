import { useState } from 'react';

const globalData = {};

const redumb = (data = {}) => {
	const stateMap = {};

	const proxy = new Proxy({ ...globalData, ...data }, {
		get: (target, key) => {
			if (!stateMap[key]) {
				stateMap[key] = useState(target[key]);
			}

			return stateMap[key][0];
		},

		set(target, key, value) {
			if (stateMap[key]) {
				target[key] = value;
				stateMap[key][1](value);
				if (String(key).startsWith('$')) {
					globalData[key] = value;
				}
			} else {
				console.log(`Key with name ${key} is not defined, ignored!`);
			}

			return true;
		}
	});

	return [
		proxy,
		proxy
	];
};

export default redumb;