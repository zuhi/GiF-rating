import './Artists.css';
import React, { useEffect, useState } from 'react';

export function Artists() {
    const [ artist, setArtist ] = useState(null);
    const [ available, setAvailable] = useState(false);
    useEffect(()=>{
        fetch('api/giphys/artist?limit=6')
        .then((response) => response.json())
        .then((datas)=>{
            setArtist(datas.data);
        })
        .then(()=>{
            setAvailable(true);
        })
    },[,available]);
    if(!available) return <p>Loading...</p>
    if(!artist) return <p>No profile data...</p>

    if(artist===undefined){
        return;
    }
    if(artist.length>0){
        return(
            <div className='artist-banner'>
                <div className='artist-subheading'>
                    <div className='artist-column'>
                        <div><img src="/artists.png" /></div>
                        <div><h2>Artists</h2></div>
                    </div>
                    {/* <div><button type="button">All Artists</button></div> */}
                </div>
                <div className='artistBanner'>
                    {artist.map((item)=>{
                        return(
                            <div className='column-section'>
                                <iframe src={item.url} sandbox='allow-presentation allow-scripts allow-same-origin' width="100%" className="giphy-embed" allowFullScreen></iframe>
                            </div>
                        )
                    })}
                    
                </div>
            </div>
        );

    }

    
}