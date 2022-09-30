import React from "react";
import { IoIosArrowBack } from "react-icons/io";

function round(x, sigFigs) {
	return Number.parseFloat(x).toPrecision(sigFigs);
}

export function Nav ({ running, setAlg, setSpeed, speed, algorithm, reset, sort }) {
	return  (
		<table id="menu" style={{ visibility: running ? 'hidden' : 'visible' }}>
			<tbody><tr>
				<th style={{ width: 'calc(50px + 10%)', textAlign: 'left' }}>
					<a href="../">
						<IoIosArrowBack size={50} color='grey'/>
					</a>
				</th>
				<th style={{ width: '150px' }}>
					<div className="dropdown">
						<button className="button">{algorithm} sort</button>
						<div className="dropdown-content">
							<div>
								<h3>Algorithm</h3>
							</div>
							<div>
								<button onClick={() => setAlg('bubble')}
								        style={{padding: '20px, 0, 0, 0'}}>
									Bubble
								</button>
							</div>
							<div>
								<button onClick={() => setAlg('merge')}
								        style={{padding: '20px, 0, 0, 0'}}>
									Merge
								</button>
							</div>
							<div>
								<button onClick={() => setAlg('insertion')}
								        style={{padding: '20px, 0, 0, 0'}}>
									Insertion
								</button>
							</div>
							<div>
								<button onClick={() => setAlg('quick')}
								        style={{padding: '20px, 0, 0, 0'}}>
									Quick
								</button>
							</div>
						</div>
					</div>
				</th>
				<th style={{width: '10%'}}>
					Speed: {round(1/speed, 2)}
					<div className="slide-container">
						<input type="range"
						       min="0.0006"
						       max="1"
						       step="0.0002"
						       defaultValue="0.002"
						       className="slider"
						       id="myRange"
						       onChange={val => {setSpeed(1/val.target.value)}}
						></input>
					</div>
				</th>

				<th>
					<button className='menu-button' onClick={sort}>Sort</button>
					<button className='menu-button' onClick={reset}>Reset</button>
				</th>
			</tr></tbody>
		</table>
	);
}