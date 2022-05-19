import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './header.css';

export function Header() {

    let navigate = useNavigate();
    const [ isloggedIn, setisLoggedIn] = useState(false);

    function change(val) {

        navigate(val);

    }

    useEffect(()=>{
        fetch('api/users/me')
        .then(user => {
            if(user.status===200){
                setisLoggedIn(true);
            }
        })
        .catch(error =>{
            console.log(error);
        })

    });

   function  onLogout() {
        fetch('api/sessions/me',{
            method: 'DELETE'
        })
        .then(res =>{
            if(res.status === 204){
                window.location ='/';
            }
        });
    }

    return(
        <div className="header-section">
            <div className="section">
                <div className="banner-content">
                    <div >
                        <img className="animated-gif" src="/giphy-banner.gif" onClick={()=>{
                            window.location="/"
                        }}></img>
                    </div>
                    <div className='header-mid'>
                        <div >
                            <h1 onClick={()=>{
                                window.location="/"
                            }}>GIPHY</h1>
                        </div>
                        <div className="header-nav-bar">
                            <div onClick={()=>{
                                window.location = '/reaction';
                            }}>
                                <h3>Reactions</h3>
                                <hr />
                            </div>
                            <div onClick={()=>{
                                window.location = '/entertainment';
                            }}>
                                <h3>Entertainment</h3>
                                <hr />
                            </div>
                            <div onClick={()=>{
                                window.location = '/sports';
                            }}>
                                <h3>
                                    Sports
                                </h3>
                                <hr />
                            </div>
                            <div onClick={()=>{
                                window.location = '/artistspg';
                            }}>
                                <h3>
                                    Artists
                                </h3>
                                <hr />
                            </div>
                            <div onClick={()=>{
                                window.location = '/cartoon';
                            }}>
                                <h3>
                                    Cartoon
                                    
                                </h3>
                                <hr />
                            </div>

                        </div>
                    </div>
                    <div className="header-button">
                        {isloggedIn?
                            <></>
                            :
                            <button  disable ={isloggedIn} type="button" onClick={() =>{
                                change("/login");
                            }}>Login</button>
                        }
                        {isloggedIn?
                            <button  disable ={isloggedIn} type="button" onClick={() =>{
                                onLogout();
                            }}>Logout</button>
                            :
                            <></>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}