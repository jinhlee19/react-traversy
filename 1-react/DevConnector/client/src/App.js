import React, { Fragment } from 'react';
// Router v6 updated -> brad 버전 github 참고 ***
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './App.css';
// Redux
import { Provider } from 'react-redux';
import store from './store';

const App = () => (
	<Provider store={store}>
		<Router>
			<Fragment>
				<Navbar />
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</Fragment>
		</Router>
	</Provider>
);
export default App;
