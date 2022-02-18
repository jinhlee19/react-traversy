// prop types
// impt
import PropTypes from 'prop-types';

//rafce
// import React from 'react' // 이제 필요없어짐.

const Header = ({ title }) => {
	return (
		<header>
			<h1 style={headingStyles}>{title}</h1>
		</header>
	);
};
Header.defaultProps = {
	title: 'Task Tracker',
};
Header.propTypes = {
	title: PropTypes.string.isRequired,
};
const headingStyles = {
	color: 'red', backgroundColor: 'black'
}
export default Header;
