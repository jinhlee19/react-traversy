import Card from './Card';

// const classes = ;

const Cards = ({ classes }) => {
	return (
		<div className='flex flex-wrap justify-between'>
			{classes.map(classItem => (
				<Card key={classItem.id} classItem={classItem}/>
			))}
		</div>
	);
};

export default Cards;
