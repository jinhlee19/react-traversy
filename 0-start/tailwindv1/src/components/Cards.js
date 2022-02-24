const classes = [
	{
		id: 1,
		title: '인기 작가가 되는 법',
		score: 4.5,
		imgSrc: 'https://unsplash.com/photos/1-aA2Fadydc',
		price: 45000,
	},
	{
		id: 2,
		title: '자동수익, 경제적 자유 가이드라인',
		score: 4,
		imgSrc: 'https://unsplash.com/photos/zFSo6bnZJTw',
		price: 97298,
	},
	{
		id: 3,
		title: 'TEPS 고득점 비법',
		score: 3.5,
		imgSrc: 'https://unsplash.com/photos/nOwkd4YvdUg',
		price: 69820,
	},
	{
		id: 4,
		title: '개념이 확실히 잡히는 일반생물학',
		score: 3.8,
		imgSrc: 'https://unsplash.com/photos/nOwkd4YvdUg',
		price: 55450,
	},
	{
		id: 5,
		title: '해석을 위한 문법',
		score: 4.9,
		imgSrc: 'https://unsplash.com/photos/XZkk5xT8Xrk',
		price: 43510,
	},
];

const Cards = () => {
  return (
    <div>
        {classes.map((classItem)=>(<h1 key={classItem.id}>{classItem.title}</h1>))}
    </div>
  )
}

export default Cards