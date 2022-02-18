// prop types
// impt
import PropTypes from 'prop-types';
import { Button } from './Button';
//rafce

const Header = ({ title }) => {
	return (
		<header className="header">
			<h1>{title}</h1>
			<Button color="green" text="Hello" />
			<Button color="blue" text="Hello 1" />
			<Button color="red" text="Hello 3" />
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
