import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "./Header";
import './Sports.css';


export function Sports() {
    const [sports, setSports] = useState([]);
    const [available, setAvailable] = useState(false);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    function changeSearch(searchTerm) {
        setSearch(searchTerm);

    }

    useEffect(()=>{
        fetch( `api/giphys/sports?limit=16`)
        .then((response) => response.json())
        .then((datas)=>{
            setSports(datas.data);
        })
        .then(()=>{
            setAvailable(true);
        })
    },[,available]);

    useEffect(()=>{
        fetch( `api/giphys/tags/${search}?limit=16`)
        .then((response) => response.json())
        .then((datas)=>{
            setSports(datas.data);
        })
        .then(()=>{
            setAvailable(true);
        })
    },[search]);

    function updateViews(obj) {
        const dataObj = {};
        dataObj._id =  obj._id;
        dataObj.views = obj.views;

        fetch('api/giphys/views',{
            method: 'PUT',
            body: JSON.stringify(dataObj),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'

            }
        })
        .then(res => {
            if(res.status === 204){
                console.log("updated");

            }
        });

    }


    function run( val ) {
        val.item.views = +val.item.views +1;
        updateViews(val.item);
        fetch('api/users/me')
        .then(user => {
            if(user.status === 200){
                navigate('/details', { state: {each : val}} );
            }
            else{
                navigate('/login',{ state: {each : val}} );

            }
        })
        .catch( error => {
            console.log(error);
        });
        
    }

    if(!available) return <p>Loading...</p>
    if(!sports) return <p>No profile data...</p>


    return(
        <>
            {/* <Header /> */}
            <div>
                <div  className="entertainment-division">
                    <div>
                        <div className="entertainment-banner">
                            <img src="/sports.gif" />
                        </div>
                        <div><h4>Your go-to for any and all sports GIFs! LeBron, Ronaldo, Gronk, Serena...We’ve got them all!</h4></div>
                        <div>
                            <div>Follow us on:</div>
                            <div className="follow-icon">
                                <div><img src="/fb.png" /></div>
                                <div><img src="/insta.png" /></div>
                                <div><img src="/twitter.png" /></div>
                            </div>
                        </div>
                        <hr className="page-hr" />
                        <div className="side-tags">
                            <button type="button" onClick={()=>{
                                changeSearch("nfl")
                            }}>#nfl</button>
                            <button type="button" onClick={()=>{
                                changeSearch("nba")
                            }}>#nba</button>
                            <button type="button" onClick={()=>{
                                changeSearch("football")
                            }}>#football</button>
                        </div>
                    </div>
                    <div>
                        <div><h1>Sports GIFs</h1></div>
                        <div className="card">
                            {sports.map((item) => {
                                return(
                                    <div className="entertain-card">
                                        <iframe src={item.url} sandbox='allow-presentation allow-scripts allow-same-origin' frameBorder="0" width="100%" className="giphy-embed" allowFullScreen></iframe>
                                        <div>
                                            <h5>{item.title}</h5>
                                        </div>
                                        <div className="card-icon-detail">
                                            <img src='/liked.png' />
                                            {item.rating}
                                        </div>
                                        <div className="icon-det-row">
                                            <div className="card-icon-detail">
                                                <img src="/view.png" />
                                                {item.views}
                                            </div>
                                            <div className="card-icon-detail" onClick={()=>{
                                                run({item})
                                            }}>
                                                <img className="like" src="/like.png" />
                                            </div>
                                            <div className="card-icon-detail" onClick={()=>{
                                                run({item})
                                            }}>
                                                <img src="/comment.png" />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}