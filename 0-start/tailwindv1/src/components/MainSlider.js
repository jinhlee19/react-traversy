// Import Swiper React components
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Controller } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/controller';

// import required modules
import { Pagination } from 'swiper';

export default function App() {
	const [controlledSwiper, setControlledSwiper] = useState(null);
	return (
		<>
			<Swiper
				pagination={{
					dynamicBullets: true,
					progressbarFillClass: true,
				}}
				modules={[Pagination, Controller]}
				className="mySwiper"
				controller={{ control: controlledSwiper }} 
				
			>
				<SwiperSlide>Slide 1</SwiperSlide>
				<SwiperSlide>Slide 2</SwiperSlide>
				<SwiperSlide>Slide 3</SwiperSlide>
				<SwiperSlide>Slide 4</SwiperSlide>
				<SwiperSlide>Slide 5</SwiperSlide>
				<SwiperSlide>Slide 6</SwiperSlide>
				<SwiperSlide>Slide 7</SwiperSlide>
				<SwiperSlide>Slide 8</SwiperSlide>
				<SwiperSlide>Slide 9</SwiperSlide>
                <div className="swiper-button-play"></div>
			</Swiper>
		</>
	);
}
