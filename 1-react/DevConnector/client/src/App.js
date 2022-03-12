import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import './App.css';

const App = () => {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Landing/>} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;

// 'Fragment is a ghost elements doesn't show up at the DOM'
// <Route exact path="/" component={Landing} />
// [https://reactrouter.com/docs/en/v6/getting-started/overview]