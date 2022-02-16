### what's react

runs on the cliend as a SPA (single page app)
can be used to full stack apps by commuinicating with a server/api

### Features

view layer
mvc - model view controller
: model - data , controller - req, routing, view - react
reusable component
jsx - javascript syntax extension
uses virtual dom

### Whats new

class -> hook with function components

### Working with State

components render/return JSX
components can take props
state - object determines how a component renders and behave.
share data to multiple component -> context api or redux (state manager)
app or global state refers to state that is available to the entire ui, not just a single component.
16.8 이전에는 state를 위해서 class based components를 사용, now its functional component with hooks.

### React hooks

useState - returns a stateful value and a function to update it
useEffect - Perform side effects in function components
useContext, useReducer, useRef

### Memo

in JSX you can only return a single parent element.

```javascript

function App() {
	const name = 'Rafy';
	const x = false;
	return (
		<div className="App">
			<h1>Helllo From React</h1>
			<h2>Hello, {name}</h2>
			<h2>{1 + 1}</h2>
			<h2>{x ? 'yes' : 'no'}</h2>
		</div>
	);
}

export default App;


```
