import { /* useEffect, */ useState } from 'react';

const globalData = {};
const globalStates = {};

const redumb = () => {
	const localStates = {};
	const localData = {};

	return (initialData, settings = {}) => {
		const states = new Proxy({}, {
			get: (target, key) => {
				if (String(key).startsWith('$')) {
					if (globalStates[key]) {
						globalStates[key] = globalStates[key].filter(state => !Object.values(localStates).includes(state));
					}
				}

				let value;

				if (String(key).startsWith('$')) {
					value = globalData[key];
				} else {
					value = localData[key];
				}

				if (typeof value === 'undefined') {
					value = initialData[key];
					if (String(key).startsWith('$')) {
						if (typeof globalData[key] === 'undefined') {
							if (globalStates[key]) {
								globalStates[key].forEach(state => state[1](value));
							}
						}
						globalData[key] = value;
					}
					localData[key] = value;
				}

				// eslint-disable-next-line react-hooks/rules-of-hooks
				localStates[key] = useState(value);

				if (String(key).startsWith('$')) {
					if (!globalStates[key]) {
						globalStates[key] = [];
					}
					globalStates[key].push(localStates[key]);
				}

				return localStates[key][0];
			}
		});

		const setData = (key, value) => {
			console.log({ key, value });
			if (globalStates[key]) {
				console.log([...globalStates[key]]);
				globalStates[key].forEach(([, setState]) => setState(value));
			} else if (localStates[key]) {
				localStates[key][1](value);
			}
		}

		// useEffect(() => {
		// 	return () => setTimeout(() => Object.keys(localStates).forEach(key => {
		// 		console.log('clean');
		// 		if (globalStates[key]) {
		// 			globalStates[key] = globalStates[key].filter(state => !Object.values(localStates).includes(state));
		// 		}
		// 	}), 100);
		// }, []);

		return [states, setData];
	};
};

export default redumb;