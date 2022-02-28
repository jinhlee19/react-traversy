import { useState } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'

const App = () => {
	const [tasks, setTasks] = useState([
		{ id: 1, text: 'Doctors Appointment', day: 'Feb 5th at 2:30pm', reminder: true },
		{ id: 2, text: 'Meeting at School', day: 'Feb 6th at 1:30pm', reminder: true },
		{ id: 3, text: 'Food Shopping', day: 'Feb 5th at 2:30pm', reminder: false },
	]);
	// Delete Task
	const deleteTask = (id) => {
		// console.log('delete', id)
		// mutable state
		// 하나씩 삭제 후 리스트 화면에 다시 보여준다. - 선택된 id를 제외한 아이템만 필터링.
		setTasks(tasks.filter((task)=>task.id !==id))
	}
	// Toggle Reminder
	const toggleReminder = (id) => {
		console.log(id);
	}

	return (
		<div className="container">
			<Header />
			{tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No Tasks To Show'}
		</div>
	);
};
export default App;