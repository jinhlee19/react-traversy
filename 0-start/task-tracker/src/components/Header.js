// prop types
// impt
import PropTypes from 'prop-types';

//rafce
// import React from 'react' // 이제 필요없어짐.

const Header = ({ title }) => {
	return (
		<header className='header'>
			<h1>{title}</h1>
			<button className='btn'>Add</button>
		</header>
	);
};
Header.defaultProps = {
	title: 'Task Tracker',
};
Header.propTypes = {
	title: PropTypes.string.isRequired,
};
// CSS in JS
// dynamic styling 에서나 사용하는 부분. 
// const headingStyles = {
// 	color: 'red', backgroundColor: 'black'
// }
// 
export default Header;
