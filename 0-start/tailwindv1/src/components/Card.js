const Card = ({ classItem }) => {
	return (
		<div className="flex mb-[20px]">
			<div className="rounded-lg overflow-hidden border-solid border-[1px] border-gray-200">
				<div className="bg-white">
					<figure className="card__image overflow-hidden ">
						<div
							className="bg-cover bg-center h-[200px] w-[302px]  hover:scale-110 transition duration-300 ease-in-out"
							style={{
								backgroundImage: `url(${classItem.imgSrc})`,
							}}>
						</div>
					</figure>

					<div className="card__content flex-col p-5 text-left">
						<header className="mb-2">
							<div className="block">
								<h3 className="text-md  text-gray-900">{classItem.title}</h3>
							</div>
						</header>
						<div className="text-xs text-gray-500">
							<span className="card--score mr-2">
								<svg className="inline-block fill-current text-amber-400 w-4 h-4" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
									<path d="M16 23.5 6 31l4-12-9-7h11L16 .5 20 12h11l-9 7 4 12z" />
								</svg>
								{classItem.score}
							</span>

							<span className=" card--size mr-6">{'(500)'}</span>

							<span className="card--period">
								<svg className="inline-block fill-current text-amber-400 w-4 h-4 stroke-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 38" width="32" height="32">
									<path fill="none" strokeMiterlimit={'10'} stroke="#000" d="M26.96 5.04c6.053 6.053 6.053 15.866 0 21.919-6.053 6.054-15.867 6.054-21.92 0-6.053-6.053-6.053-15.866 0-21.919s15.867-6.054 21.92 0z" />
									<path fill="none" strokeMiterlimit={'10'} stroke="#000" d="M16 6v10l4.5 4.5M2 16h2M28 16h2M16 30v-2M16 4V2" />
								</svg>
								{'43시간 (3개월)'}
							</span>
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
								<span className="text-gray-800"> {'₩' + classItem.price.toLocaleString()}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
