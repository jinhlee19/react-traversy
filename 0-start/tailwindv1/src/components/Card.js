const Card = ({ classItem }) => {
	return (
		<div className="flex mb-[20px]">
			<div className="rounded-lg overflow-hidden border-solid border-[1px] border-gray-200">
				<div className="bg-white">
					<figure className="card__image">
						<img src={classItem.imgSrc} alt="" className="" />
					</figure>
					<div className="card__content flex-col p-5">
						<header className="mb-2">
							<div className="block">
								<h3 className="text-md text-gray-900">{classItem.title}</h3>
							</div>
						</header>
						<div className="text-xs text-gray-500">
							<span className="card--score mr-2">{classItem.score}</span>
							<span className=" card--size mr-6">{'(500)'}</span>

							<span className="card--period">{'43시간 (3개월)'}</span>
							<div className="card__tags mt-1 space-x-2">
								<span>{'#VOD'}</span>
								<span>{'#1:1수업'}</span>
								<span>{'#오프라인'}</span>
							</div>
						</div>
						<div className="text-right">
							<span className="text-sm text-gray-500">Jessica</span>
							<div className="card--price">
								<span className="text-gray-400 line-through mr-4"> {'₩ 48,400'}</span>
								<span className="text-gray-800"> {'₩'+(classItem.price).toLocaleString()}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
