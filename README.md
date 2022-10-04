## Redumb

> A simple rather dumb way to manage your global and local states in React.

## How to use

```javascript
import redumb from "./redumb";
const useData1 = redumb();
const useData2 = redumb();

const Counter1 = () => {
	const [{ $color, count }, setData] = useData1({ count: 0 });

	return (
		<div className="counter">
			<button onClick={() => setData('$color', $color === 'red' ? 'blue' : 'red')}>Change Color</button>
			<button onClick={() => setData('count', count + 1)}>Add number</button>
			<span style={{ color: $color }}>{count}</span>
		</div>
	);
}

const Counter2 = () => {
	const [{ $color, count }, setData] = useData2({ count: 0, $color: 'red' });

	return (
		<div className="counter">
			<button onClick={() => setData('$color', $color === 'red' ? 'blue' : 'red')}>Change Color</button>
			<button onClick={() => setData('count', count + 1)}>Add number</button>
			<span style={{ color: $color }}>{count}</span>
		</div>
	);
}

function App() {

	return (
		<div className="App">
			<Counter1 />
			<Counter2 />
		</div>
	);
}

export default App;

```