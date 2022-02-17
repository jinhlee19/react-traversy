// prop types
// impt
import PropTypes from 'prop-types';

//rafce
// import React from 'react' // 이제 필요없어짐.

const Header = ({ title }) => {
	return (
		<header>
			<h1>{title}</h1>
		</header>
	);
};
Header.defaultProps = {
	title: 'Task Tracker',
};
Header.propTypes = {
	title: PropTypes.string.isRequired,
};
// 대소문자 주의
export default Header;