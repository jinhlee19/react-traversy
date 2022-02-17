// prop types
// impt
import PropTypes from 'prop-types';

//rafce
// import React from 'react' // 이제 필요없어짐.

const Header = ({ title }) => {
	return (
		<header>
			<h1 style={{ color: 'red', backgroundColor: 'black' }}>{title}</h1>
		</header>
	);
};
Header.defaultProps = {
	title: 'Task Tracker',
};
Header.propTypes = {
	title: PropTypes.string.isRequired,
};
export default Header;
