import { useState } from 'react';
import Cards from './components/Cards';
import Searchbar from './components/Searchbar';
function App() {
	const [classes, setClasses] = useState([
		{
			id: 1,
			title: '인기 작가가 되는 법',
			score: 4.5,
			imgSrc: 'https://via.placeholder.com/303x200',
			price: 45000,
		},
		{
			id: 2,
			title: '자동수익, 경제적 자유 가이드라인',
			score: 4,
			imgSrc: 'https://via.placeholder.com/303x200',
			price: 97298,
		},
		{
			id: 3,
			title: 'TEPS 고득점 비법',
			score: 3.5,
			imgSrc: 'https://via.placeholder.com/303x200',
			price: 69820,
		},
		{
			id: 4,
			title: '개념이 확실히 잡히는 일반생물학',
			score: 3.8,
			imgSrc: 'https://via.placeholder.com/303x200',
			price: 55450,
		},
		{
			id: 5,
			title: '해석을 위한 문법',
			score: 4.9,
			imgSrc: 'https://via.placeholder.com/303x200',
			price: 43510,
		},
		{
			id: 6,
			title: '해석을 위한 문법',
			score: 4.9,
			imgSrc: 'https://via.placeholder.com/303x200',
			price: 43510,
		},
		{
			id: 7,
			title: '자동수익, 경제적 자유 가이드라인',
			score: 4,
			imgSrc: 'https://via.placeholder.com/303x200',
			price: 97298,
		},
		{
			id: 8,
			title: '개념이 확실히 잡히는 일반생물학',
			score: 3.8,
			imgSrc: 'https://via.placeholder.com/303x200',
			price: 55450,
		},
	]);
	return (
		<div className="App max-w-screen-xl mx-auto">
			<Searchbar />
			<h2 className="text-[24px] font-semibold">인기과목 특강</h2>
			<hr className='my-2'/>
			<div className="flex flex-row">
				<Cards classes={classes} />
			</div>
		</div>
	);
}

export default App;
