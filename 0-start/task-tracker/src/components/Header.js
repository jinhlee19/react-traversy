// prop types
// impt
import PropTypes from 'prop-types';
import { Button } from './Button';
import { useState } from 'react';
//rafce

const Header = ({ title }) => {
	const onClick = (e) => {
        console.log(e)
    }
	return (
		<header className="header">
			<h1>{title}</h1>
			<Button color="green" text="Add" onClick = {onClick} />
		</header>
	);
};
Header.defaultProps = {
	title: 'Task Tracker',
};
Header.propTypes = {
	title: PropTypes.string.isRequired,
};
// component는 매번 다른 곳에서 사용될 수 있기 때문에, 원래 위치 Button.js가 아닌 prop으로 설정.

export default Header;
