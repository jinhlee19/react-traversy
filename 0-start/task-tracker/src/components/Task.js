import { FaTimes } from 'react-icons/fa';
//rafce
const Task = ({ task, onDelete, onToggle }) => {
	return (
		<div className="task" onDoubleClick={() => onToggle(task.id)}>
			<h3>
				{task.text} <FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={onDelete} />
			</h3>
			<p>{task.day}</p>
		</div>
	);
};

export default Task;
