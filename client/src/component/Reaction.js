import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "./Header";
import './Reaction.css';


export function Reaction() {

    const [reaction, setReaction] = useState([]);
    const [available, setAvailable] = useState(false);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();


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
        console.log(val);
        val.item.views = +val.item.views +1;
         updateViews(val.item);
        fetch('api/users/me')
        .then(user => {
            if(user.status === 200){
                console.log("useEffect-reaction");
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

    function changeSearch(searchItem) {
        setSearch(searchItem);

    }

    useEffect(()=>{
        fetch( `api/giphys/reaction?limit=16`)
        .then((response) => response.json())
        .then((datas)=>{
            setReaction(datas.data);
        })
        .then(()=>{
            setAvailable(true);
        })
    },[,available]);

    useEffect(()=>{
        fetch( `api/giphys/tags/${search}?limit=16`)
        .then((response) => response.json())
        .then((datas)=>{
            setReaction(datas.data);
        })
        .then(()=>{
            setAvailable(true);
        })
    },[search]);

    if(!available) return <p>Loading...</p>
    if(!reaction) return <p>No profile data...</p>

    return(
        <>
            {/* <Header/> */}
            <div>
                <div  className="entertainment-division">
                    <div>
                        <div className="entertainment-banner">
                            <img src="/reaction.gif" />
                        </div>
                        <div><h4>Don't tell it to me, GIF it to me!</h4></div>
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
                                changeSearch("happy");
                            }}>#happy</button>
                            <button type="button" onClick={()=>{
                                changeSearch("sad");
                            }}>#sad</button>
                        </div>
                    </div>
                    <div>
                        <div><h1>Reaction GIFs</h1></div>
                        <div className="card">
                            {reaction.map((item) => {
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
                                                run({item});
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
    );
}