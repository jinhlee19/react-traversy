const Card1 = ({ title, score, imgSrc }) => {
	return (
		<div className="max-w-screen-md mx-auto flex flex-col justify-center bg-gray-200">
			<h1 className="text-3xl font-semibold uppercase">Title Test</h1>
			<div className="card max-w-xs mx-auto rounded-lg overflow-hidden shadow-lg">
				<div className="flex flex-col bg-white">
					<figure className="card__image">
						<img src={imgSrc} alt="" className="" />
					</figure>
					<div className="card__content flex-col p-5">
						<header className="mb-2">
							<div className="block">
								<h3 className="text-[20px] text-gray-900 font-extrabold leading-snug">{title}</h3>
							</div>
						</header>
						<div className="text-gray-500">
							<span className="card--score mr-2">{score}</span>
							<span className="card--size mr-6">{'(500)'}</span>

							<span className="card--period">{'43시간 (3개월)'}</span>
							<div className="card__tags mt-3 space-x-2">
								<span>{'#VOD'}</span>
								<span>{'#VOD'}</span>
								<span>{'#VOD'}</span>
							</div>
						</div>
						<div className="text-right">
							<span className="text-gray-500">Jessica</span>
							<div className="card--price">
								<span className="text-gray-400 line-through mr-4"> {'₩ 48,400'}</span>
								<span className="text-gray-800 line-through"> {'₩ 48,400'}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card1;
