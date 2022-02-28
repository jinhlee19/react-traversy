// Import Swiper React components
import React, { useReducer, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Controller, Navigation, Autoplay } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/controller';
import 'swiper/css/autoplay';
// import required modules
import { Pagination } from 'swiper';

export default function App() {
	const data = [
		{ id: 1, text: 'slide 1', imgSrc: 'https://source.unsplash.com/random/11' },
		{ id: 2, text: 'slide 2', imgSrc: 'https://source.unsplash.com/random/12' },
		{ id: 3, text: 'slide 3', imgSrc: 'https://source.unsplash.com/random/13' },
		{ id: 4, text: 'slide 4', imgSrc: 'https://source.unsplash.com/random/14' },
		{ id: 5, text: 'slide 5', imgSrc: 'https://source.unsplash.com/random/15' },
	];
	const [controlledSwiper, setControlledSwiper] = useState(null);
	
	return (
		<>
			<Swiper
				pagination={{
					dynamicBullets: true,
					progressbarFillClass: true,
				}}
				
				modules={[Pagination, Controller, Navigation, Autoplay]}
				className="mySwiper"
				// navigation
				
				controller={{ control: controlledSwiper }}
				autoplay={{ delay: 3000 }}
				onSlideChange={() => console.log('slider change')}
				onSwiper={swiper => console.log(swiper)}
			>
				{data.map(slide => (
					<SwiperSlide style={{
								backgroundImage: `url(${slide.imgSrc})`,
							}} className='inline-block bg-cover bg-center' key={slide.id}>
						<div className='slide-content mx-auto flex flex-row justify-center items-center h-96'>{slide.text}</div>
						
					</SwiperSlide>
				))}
			</Swiper>
		</>
	);
}
