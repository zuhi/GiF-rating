import React, { useEffect, useState } from "react";
import { Header } from "./Header";
import './Entertainment.css';
import { useNavigate } from "react-router-dom";


export function Entertainment() {

    const [entertain, setEntertain] = useState([]);
    const [available, setAvailable] = useState(false);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    function changeSearch(searchItem) {
        setSearch(searchItem);

    }

    useEffect(()=>{
        fetch( `api/giphys/entertainment?limit=16`)
        .then((response) => response.json())
        .then((datas)=>{
            setEntertain(datas.data);
        })
        .then(()=>{
            setAvailable(true);
        })
    },[,available]);

    useEffect(()=>{
        fetch( `api/giphys/tags/${search}?limit=16`)
        .then((response) => response.json())
        .then((datas)=>{
            setEntertain(datas.data);
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
    if(!entertain) return <p>No profile data...</p>

    return(
        <>
            {/* <Header/> */}
            <div>
                <div  className="entertainment-division">
                    <div>
                        <div className="entertainment-banner">
                            <img src="/entertain.gif" />
                        </div>
                        <div><h4>Get the latest GIFs from movies, TV, music, celebrities</h4></div>
                        <div>
                            <div>Follow us on:</div>
                            <div className="follow-icon">
                                <div><img src="/fb.png" /></div>
                                <div><img src="/insta.png" /></div>
                                <div><img src="/twitter.png" /></div>
                            </div>
                        </div>
                        <hr className="page-hr" />
                        <div className="side-search">
                            <button type="button" onClick={()=>{
                                changeSearch("series")
                            }}>#series</button>
                            <button type="button" onClick={()=>{
                                changeSearch("oscars")
                            }}>#oscars</button>
                            <button type="button" onClick={()=>{
                                changeSearch("grammys")
                            }}>#grammys</button>
                            <button type="button" onClick={()=>{
                                changeSearch("friends")
                            }}>#friends</button>
                        </div>
                    </div>
                    <div>
                        <div><h1>Entertainment GIFs</h1></div>
                        <div className="card">
                            {entertain.map((item) => {
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
                                            <div className="card-icon-detail">
                                                <img className="like" src="/like.png" onClick={()=>{
                                                run({item})
                                            }}/>
                                            </div>
                                            <div className="card-icon-detail">
                                                <img src="/comment.png" onClick={()=>{
                                                run({item})
                                            }}/>
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
    );
}