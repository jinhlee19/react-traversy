// 이번엔 prop 대신 구조분해할당 Destructuring 으로 매개변수 넣기
export const Button = ({ color, text, onClick }) => {
	return (
		<button onClick={onClick} style={{ backgroundColor: color }} className="btn">
			{text}
		</button>
	);
};

Button.defaultProps = { color: 'steelblue' };
// 이부분은 왜 안되는지 모르겠음;
// Button.propTypes = {
// 	text: PropTypes.string,
// 	color: PropTypes.string,
// 	onClick: PropTypes.func
// };
export default Button;
