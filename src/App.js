// React
import './App.css';
import React, { useState } from 'react';

// util
import sorts from './sort-algs';

// components
import Bar from './bar';

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

function round(x, sigFigs) {
    return Number.parseFloat(x).toPrecision(sigFigs);
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

    const { innerWidth: width, innerHeight: height } = window;
    const barWidth = (width / 50) - 4;

    const bars =  50;
    const barHeightMod = 5;

    const [ barValues, setBarValues ] = useState(getRandomList(bars));
    const [ algorithm, setAlg       ] = useState('bubble');
    const [ speed,     setSpeed     ] = useState(50);
    const [ running,   setRunning   ] = useState(false);

    async function sort () {
        setRunning(true);

        await sorts[algorithm](setBarValues, barValues, speed);

        setRunning(false);
    }

    return (
        <div className="App" style={{height: '100%'}}>

            <table id="menu" style={{width: '100%', height: '50px', visibility: running ? 'hidden' : 'visible' }}>
                <tbody><tr>
                    <th style={{width: '50px'}}>
                        <a href="https://revers3ntropy.com/" className="button"> {'<'} </a>
                    </th>

                    <th style={{width: '10%'}}></th>

                    <th style={{width: '150px'}}>
                        <div className="dropdown">
                            <button className="button">Algorithm: {algorithm} sort</button>
                            <div className="dropdown-content">
                                <div>
                                    <button className='button' onClick={() => setAlg('bubble')}  style={{padding: '20px, 0, 0, 0'}}>
                                        Bubble
                                    </button>
                                </div>
                                <div>
                                    <button className='button' onClick={() => setAlg('merge')} style={{padding: '20px, 0, 0, 0'}}>
                                        Merge
                                    </button>
                                </div>
                                <div>
                                    <button className='button' onClick={() => setAlg('insertion')} style={{padding: '20px, 0, 0, 0'}}>
                                        Insertion
                                    </button>
                                </div>
                                <div>
                                    <button className='button' onClick={() => setAlg('quick')} style={{padding: '20px, 0, 0, 0'}}>
                                        Quick
                                    </button>
                                </div>
                            </div>
                        </div>
                    </th>
                    <th style={{width: '10%'}}>
                        Speed: {round(1/speed, 2)}
                        <div className="slide-container">
                            <input type="range" min="0.0006" max="1" step="0.0002" defaultValue="0.002" className="slider" id="myRange" onChange={val => {setSpeed(1/val.target.value)}}></input>
                        </div>
                    </th>

                    <th>
                        <Button onclick={sort} text="Sort" />
                    </th>
                    <th style={{width: '20%'}}>
                        <Button onclick={() => {setBarValues(getRandomList(bars))}} text="reset" />
                    </th>

                </tr></tbody>
            </table>

            <Bars arr={barValues} barHeightMod={barHeightMod} barWidth={barWidth} theme={theme}/>

            <div id="footer" style={{visibility: running ? 'visible' : 'hidden'}}>
                <button onClick={() => window.location.reload()} style={{padding: '0 10px 0 0', border: '0', 'margin': '0', outline: 'none'}} className="background-colour button">
                    <div style={{height: '40px', width: '40px'}}>
                        <img src={refresh} alt="refresh-button" style={{maxHeight: '100%', maxWidth: '100%'}}/>
                    </div>
                </button>
            </div>
        </div>
    );
}

function Button({ onclick, text }) {
    return (
        <button className="button" onClick={onclick}>
            {text}
        </button>
    )
}

function Bars({ arr, barHeightMod, barWidth, theme }) {
    return (
        <div id="bars" style={{
            height: 100 * barHeightMod,
        }}>
            { arr.map( number =>   <Bar value={number * barHeightMod} width_={barWidth} key={number} theme={theme} />   )}
        </div>
    )
}

export default App;

