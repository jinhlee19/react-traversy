import Header from './components/Header';

function App() {
	const name = 'Rafy';
	const x = false;
	return (
		<div className="container">
			<Header />
		</div>
	);
}
// header title 1로 줄때 출력은 되지만 -> Warning: Failed prop type.
// header.js required 
export default App;
