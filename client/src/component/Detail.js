import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import './Detail.css';


export function Detail() {

    const loc = useLocation();
    const [obj, setObj] = useState({});
    const inputRef = useRef();
    const [userObj, setuserObj] = useState({
        id:"",
        firstName:""
    });
    const [liked, setLiked] = useState(false);

    useEffect(()=>{
        setObj(loc.state.each.item);
        fetch('api/users/meUser',{
            method: 'GET',
            credentials: 'include', 
        })
        .then(user => user.json())
        .then((data)=>{
            setuserObj({id:data.id, firstName:data.name});
        })
        .catch( error => {
            console.log(error);
        });
    },[]);


    function updateLikes(item){

        if(!liked){
            setObj({...obj,"rating": +item.rating + 1});

            const dataObj = {};
            dataObj._id =  obj._id;
            dataObj.rating = obj.rating;
    
    
            fetch('api/giphys/likes',{
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
    
            setLiked(true);

        }

    }


    function updateComments(item) {

        const commentValue = inputRef.current.value;
        const reviewArray = obj.reviews;
        reviewArray.push({"user_id":userObj.id, "user_name":userObj.firstName, "reviewComment":commentValue});
        
        setObj({...obj,"reviews":reviewArray});

        const dataObj = {};
        dataObj._id =  obj._id;
        dataObj.reviews = obj.reviews;

        fetch('api/giphys/comments',{
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

    if(!obj) return <p>No profile data...</p>
    console.log(obj);

    return(
        <>
            {/* <Header /> */}
            <div className="card-detail">

                <div className="entertain-card-detail">
                    <iframe src={obj.url} sandbox='allow-presentation allow-scripts allow-same-origin' frameBorder="0" width="100%" height="300px" className="giphy-embed" allowFullScreen></iframe>
                    <div>
                        <h5>{obj.title}</h5>
                    </div>
                    <div className="card-icon-detail">
                        <img src='/liked.png' />
                        {obj.rating}
                    </div>
                    <div className="icon-det-row">
                        <div className="card-icon-detail">
                            <img src="/view.png" />
                            {obj.views}
                        </div>
                        <div className="card-icon-detail">
                            <img className="like" src="/like.png" onClick={() =>{
                                updateLikes(obj);
                            }} />
                        </div>
                        <div className="card-icon-detail">
                            <img src="/comment.png" />
                        </div>
                    </div>
                    {obj.createdBy?<div>Created by {obj.createdBy}</ div>:<></>}
                    {obj.reviews?
                        <div className="comment-box">
                            <h3>Comments</h3>
                            {obj.reviews.map((item)=>{
                                return(
                                    <div className="comment">
                                        <h4>@{item.user_name}: {item.reviewComment}</h4>
                                    </div>
                                )
                            })}
                            <div className="comment">
                                <input ref={inputRef} type="text" placeholder="Add a comment" name="Search" />
                                <button type="button" className="comment-button" onClick={()=>{
                                    updateComments(obj);
                                }}> Post
                            </button>
                            </div>
                        </div>
                      :
                        <>
                           <div className="comment-box">
                            <h3>Comments</h3>
                            <div className="comment">
                                <input ref={inputRef} type="text" placeholder="Add a comment" name="Search" />
                                <button type="button" className="comment-button" onClick={()=>{
                                    updateComments(obj);
                                }}> Post
                                </button>
                            </div>

                           </div>

                        </>

                    }
                </div>

            </div>
        </>
    );

}