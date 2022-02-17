import Header from './components/Header';

function App() {
	const name = 'Rafy';
	const x = false;
	return (
		<div className="container">
			<Header title={'1'} />
			{/* 대문자 Header */}
			{/* <h1>Helllo From React</h1>
			<h2>Hello, {name}</h2>
			<h3>{1 + 1}</h3>
			<h4>{x ? 'yes' : 'no'}</h4> */}
		</div>
	);
}
// header title 1로 줄때 출력은 되지만 -> Warning: Failed prop type.
// header.js required 
export default App;
