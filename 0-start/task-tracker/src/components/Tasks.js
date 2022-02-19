// rac
//


// # 1 loop
const Tasks = ({tasks}) => {
	
	return (
		<>
			{tasks.map(task => (
				<h3 key={task.id}>{task.text}</h3>
			))}
		</>
	);
};
export default Tasks;
// 영상 예제에서 나는 오류 'Each child in a list should have a unique "Key" Prop' 해결을 위해 12열 수정했지만 2.18 실행시 둘다 오류는 없음.
