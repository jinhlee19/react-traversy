// rac
//
import { useState } from 'react';

// # 1 loop
const Tasks = () => {
	const [tasks, setTasks] = useState([
		{ id: 1, text: 'Doctors Appointment', day: 'Feb 5th at 2:30pm', reminder: true },
		{ id: 2, text: 'Meeting at School', day: 'Feb 6th at 1:30pm', reminder: true },
		{ id: 3, text: 'Food Shopping', day: 'Feb 5th at 2:30pm', reminder: false },
	]);
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
