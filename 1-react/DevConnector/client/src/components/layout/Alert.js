import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => {
	return <div>Alert</div>;
};

Alert.propTypes = {
	alerts: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({ alerts: state.alert });
Alert.propTypes = {};
export default connect()(Alert);
