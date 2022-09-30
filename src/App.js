// React
import './App.css';
import React, { useState } from 'react';

// util
import sorts from './sort-algs';

// components
import Bar from './bar';
import { Nav } from "./nav.js";

// images
import refresh from './refresh.png';

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function getRandomList (length) {
    let numbers = [];
    for (let i = 1; i < length+1; i++) {
        numbers.push(i);
    }
    shuffle (numbers);
    return numbers;
}

const themes = [
    '#c34f3b',
    '#b39d27',
    '#56b741',
    '#40bf8f',
    '#2b70b8',
    '#b63abf',
];

const theme = themes[Math.floor(Math.random() * themes.length)];


const App = () => {

    const { innerWidth: width } = window;
    const barWidth = (width / 50) - 4;

    const bars =  50;
    const barHeightMod = 5;

    const [ barValues, setBarValues ] = useState(getRandomList(bars));
    const [ algorithm, setAlg       ] = useState('bubble');
    const [ speed,     setSpeed     ] = useState(50);
    const [ running,   setRunning   ] = useState(false);

    function reset () {
        setBarValues(getRandomList(bars));
    }

    async function sort () {
        setRunning(true);

        await sorts[algorithm](setBarValues, barValues, speed);

        setRunning(false);
    }

    return (
        <div className="App" style={{height: '100%'}}>

            <Nav reset={reset}
                 running={running}
                 algorithm={algorithm}
                 setAlg={setAlg}
                 speed={speed}
                 setSpeed={setSpeed}
                 sort={sort}
            />

            <Bars arr={barValues} barHeightMod={barHeightMod} barWidth={barWidth} theme={theme}/>

            <div id="footer" style={{visibility: running ? 'visible' : 'hidden'}}>
                <button onClick={() => window.location.reload()}
                        style={{padding: '0 10px 0 0', border: '0', 'margin': '0', outline: 'none'}}
                        className="background-colour button"
                >
                    <div style={{height: '40px', width: '40px'}}>
                        <img src={refresh}
                             alt="refresh-button"
                             style={{maxHeight: '100%', maxWidth: '100%'}}
                        />
                    </div>
                </button>
            </div>
        </div>
    );
}

function Bars({ arr, barHeightMod, barWidth, theme }) {
    return (
        <div id="bars" style={{
            height: 100 * barHeightMod,
        }}>
            {arr.map(number =>
                <Bar value={number * barHeightMod} width={barWidth} key={number} theme={theme} />
            )}
        </div>
    )
}

export default App;

