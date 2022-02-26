import { useState } from 'react';

import "swiper/css";
import "swiper/css/pagination";
// eslint-disable-next-line
import "swiper/css/bundle";


import Cards from './components/Cards';
import Searchbar from './components/Searchbar';
import MainSlider from './components/MainSlider';
function App() {
	const [classes, setClasses] = useState([
		{
			id: 1,
			title: '인기 작가가 되는 법',
			score: 4.5,
			stuNum: 500,
			imgSrc: 'https://source.unsplash.com/random',
			oriPrice: 48400,
			price: 45000,
			instructor: '김작가',
		},
		{
			id: 2,
			title: '자동수익, 경제적 자유 가이드라인',
			score: 4,
			stuNum: 500,
			imgSrc: 'https://source.unsplash.com/random/2',
			oriPrice: 48400,
			price: 97985,
			instructor: '돈많아',
		},
		{
			id: 3,
			title: 'TEPS 고득점 비법',
			score: 3.7,
			stuNum: 1120,
			imgSrc: 'https://source.unsplash.com/random/9',
			oriPrice: 48400,
			price: 69820,
			instructor: 'TEP댄서',
		},
		{
			id: 4,
			title: '개념이 확실히 잡히는 일반생물학',
			score: 4.3,
			stuNum: 330,
			imgSrc: 'https://source.unsplash.com/random/3',
			oriPrice: 48400,
			price: 55450,
			instructor: '김하나',
		},
		{
			id: 5,
			title: '해석을 위한 문법',
			score: 4.9,
			stuNum: 500,
			imgSrc: 'https://source.unsplash.com/random/4',
			oriPrice: 48400,
			price: 43510,
			instructor: '김작가',
		},
		{
			id: 6,
			title: '해석을 위한 문법',
			score: 4.9,
			stuNum: 1250,
			imgSrc: 'https://source.unsplash.com/random/5',
			oriPrice: 48400,
			price: 43510,
			instructor: '제시카',
		},
		{
			id: 7,
			title: '자동수익, 경제적 자유 가이드라인',
			score: 4,
			stuNum: 650,
			imgSrc: 'https://source.unsplash.com/random/6',
			oriPrice: 48400,
			price: 97298,
			instructor: '자동수익',
		},
		{
			id: 8,
			title: '개념이 확실히 잡히는 일반생물학',
			score: 3.8,
			stuNum: 450,
			imgSrc: 'https://source.unsplash.com/random/7',
			oriPrice: 48400,
			price: 55450,
			instructor: '생물쌤',
		},
	]);
	return (
		<div className="App max-w-screen-xl mx-auto">
			<MainSlider />
			<Searchbar />
			<h2 className="text-[24px] font-semibold">인기과목 특강</h2>
			<hr className="my-2" />
			<div className="flex flex-row">
				<Cards classes={classes} />
			</div>
		</div>
	);
}

export default App;
