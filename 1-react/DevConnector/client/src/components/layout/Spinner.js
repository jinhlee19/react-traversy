// Spinner 1
import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt="Loading..."
    />
  </Fragment>
);

export default Spinner;


// //// Spinner 2
// import React from 'react';

// const Spinner = props => {
// 	return (
// 		<div style={{ width: '200px', margin: 'auto', display: 'block' }} className="">
// 			<div
// 				id="loading-indicator"
// 				role="progressbar"
// 				className="MuiCircularProgress-root MuiCircularProgress-colorPrimary MuiCircularProgress-indeterminate"
// 				alt="loading..."
// 			>
// 				<svg viewBox="22 22 44 44" class="MuiCircularProgress-svg">
// 					{' '}
// 					<circle
// 						cx="44"
// 						cy="44"
// 						r="20.2"
// 						fill="none"
// 						stroke-width="3.6"
// 						class="MuiCircularProgress-circle MuiCircularProgress-circleIndeterminate"
// 					></circle>
// 				</svg>
// 			</div>
// 		</div>
// 	);
// };

// export default Spinner;
