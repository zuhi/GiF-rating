import './Trending.css';
import React from 'react';

const { useEffect, useState } = React;

export function Trending() {
    const [ trend, setTrend ] = useState(null);
    const [ available, setAvailable] = useState(false);

    useEffect(()=>{
        fetch('api/giphys/trending?limit=6')
        .then((response) => response.json())
        .then((datas) => {
            setTrend(datas.data);
        })
        .then(()=>{
            setAvailable(true);
        });
    },[,available]);

    function clickMe() {
        console.log("Click Me");
    }

    if (!available) return <p>Loading...</p>
    if (!trend) return <p>No profile data</p>
    
    if(trend === undefined) {return;}
    if(trend.length>0){
        const itr = trend;
        return(
            <div className='trend'>
                <div className="trend-row">
                    <div className='trend-banner'>
                        <div><img src="/trending.png" /></div>
                        <div><h2>Trending</h2></div>
                    </div>
                    {/* <div><button type="button">All trends</button></div> */}
                </div>
                <div className='display-card'  onClick={clickMe} >
                    {trend.map((item) => {
                        return(
                                <div className='column-section'>
                                    <iframe src={item.url} sandbox='allow-presentation allow-scripts allow-same-origin' width="80%%" className="giphy-embed" allowFullScreen></iframe>
                                </div>
                        );
                    })}
                </div>
            </div>
        );

    }
    else{
        return <h2> Data not loaded</h2>;

    }  
}