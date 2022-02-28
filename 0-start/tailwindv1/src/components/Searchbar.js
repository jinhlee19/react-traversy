import React from 'react';

const Searchbar = () => {
	return (
		<div className='relative'>
			<svg className='absolute top-[25px] left-4 z-10 w-5 h-5' xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 38 38"><path fill="none" strokeMiterlimit="10" stroke="#000" d="M20.5 10.5c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10zM17.5 17.5l3 3M31.5 28.5l-3 3L19 22l3-3 9.5 9.5z"/></svg>
			<label className="relative block py-4 ">
				<span className="sr-only">Search</span>
				<span className="absolute inset-y-0 left-0 flex items-center pl-2">
					<svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20">
						...
					</svg>
				</span>
				<input
					className=" pl-12 placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
					placeholder="배우고 싶은 수업을 찾아보세요 !"
					type="text"
					name="search"
				/>
			</label>
			<button className='inline-block bg-black px-8 py-[11px] text-white  rounded-md text-xs tracking-widest uppercase absolute top-4 right-0'>Search</button>
		</div>
	);
};

export default Searchbar;
