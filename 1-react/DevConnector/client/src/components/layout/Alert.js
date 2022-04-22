import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
	alerts !== null &&
	alerts.length > 0 &&
	alerts.map(alert => (
		<div key={alert.id} className={`alert alert-${alert.alertType}`}>
			{alert.msg}
		</div>
	));

Alert.propTypes = {
	alerts: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
	// alerts는 prop에서
	// state.의 "alert"은 root reducer에서 가져옴.
	alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);

// //// *** VERSION 1.1 ***
// // racfp 로 생성
// import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

// const Alert = ({ alerts }) => (
// 	<div className="alert-wrapper">
// 		{alerts.map(alert => (
// 			<div key={alert.id} className={`alert alert-${alert.alertType}`}>
// 				{alert.msg}
// 			</div>
// 		))}
// 	</div>
// );

// Alert.propTypes = {
// 	alerts: PropTypes.array.isRequired,
// };

// const mapStateToProps = state => ({
// 	alerts: state.alert,
// });

// export default connect(mapStateToProps)(Alert);