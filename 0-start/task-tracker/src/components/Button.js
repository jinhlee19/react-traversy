// 이번엔 prop 대신 구조분해할당 Destructuring 으로 매개변수 넣기
export const Button = ({ color, text }) => {
	return (
		<button style={{ backgroundColor: color }} className="btn">
			{text}
		</button>
	);
};
