import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import './App.css';

const App = () => {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={Landing} />
			</Routes>
		</Router>
	);
};

export default App;

// 'Fragment is a ghost elements doesn't show up at the DOM'
// <Route exact path="/" component={Landing} />
