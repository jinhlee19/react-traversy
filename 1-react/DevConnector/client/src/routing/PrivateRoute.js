import React from 'react';
import { Navigate } from 'react-router-dom';
// import { Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


// const PrivateRoute = ({ component: Component, auth, loading, ...rest }) => (
// 	<Route
// 		{...rest}
// 		render={props => (!auth.isAuthenticated && !loading ? <Navigate to="/login" /> : <Component {...props} />)}
// 	/>
// );

//// Github Version
const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading } }) => {
	if (isAuthenticated) return <Component />;

	return <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);