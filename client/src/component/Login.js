import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './Login.css';

export function Login() {
    const [newUser, setnewUser] = useState({
        email:'',
        password:''
    });

    const inputRef = useRef();
    const loc = useLocation();
    const navigate = useNavigate();

    useEffect(()=> {
    
        fetch('api/users/me',{
            method: 'GET',
            credentials: 'include', 
        })
        .then(user => {
            if(user.status === 200){
                navigate('/details', { state: {each : loc.state.each.item}} );
            }
        })
        .catch( error => {
            console.log(error);
        });
    },[]);


    const handleChangeuser = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setnewUser({...newUser, [name]: value});
    };

    const onLogin = (event) =>{
        event.preventDefault();
        const dataObj = {
            'email': newUser.email,
            'password': newUser.password
        };
        if(dataObj.email.length===0 || dataObj.password.length===0){
            console.log("Alert!");
            alert("You have not entered either email or password. Please enter again and submit");
        }
        else{
            fetch('api/sessions',{
                method: 'POST',
                body: JSON.stringify(dataObj),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'

                }
            })
            .then(res => {
                if(res.status === 204){
                    navigate('/' );
                }

            });
        }
    }


    return(
        <div className="login-form">
            <div className="login-input-form">
                <input ref={inputRef} placeholder="email" name="email" required type="email" onChange={handleChangeuser}></input>
                <input ref={inputRef} placeholder="password" name="password" required type="password" onChange={handleChangeuser}></input>
                <a href={"/signup"}>New to GIPHY?Do you want to Signup? </a>
            </div>
            <div className="login-button">
                <div><button type="button" onClick={onLogin}>Login</button></div>
                <div><button type="button" onClick={()=>{
                    window.location("/");
                }}> Cancel</button>  </div>
    
            </div>
        </div>
    );


}