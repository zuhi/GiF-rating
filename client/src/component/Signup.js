import { useRef, useState } from "react";
import './Signup.css';

export function SignUp() {
    const inputRef = useRef();
    const [createUser, setcreateUser] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:''
    });

    const handlenewuser = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setcreateUser({...createUser, [name]: value});
    };


    const onSignUp = e => {
        e.preventDefault();
        const dataObj = {
            'firstName':createUser.firstName,
            'lastName': createUser.lastName,
            'email': createUser.email,
            'password': createUser.password
        };
        if(dataObj.email.length===0 || dataObj.password.length===0){
            console.log('Alert!');
            alert('You have not entered either email or password. Please enter again and submit');
        }
        else{
            fetch('api/users',{
                method: 'POST',
                body: JSON.stringify(dataObj),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
                

            });
            window.location='/login';
        }

    }
    return(
        <div className="Signup-form">
            <div>
                <div className="signup-input">
                    <input ref={inputRef} placeholder="First Name" name="firstName" required onChange={handlenewuser}></input>
                    <input ref={inputRef} placeholder="Last Name" name="lastName" required onChange={handlenewuser}></input>
                    <input ref={inputRef} placeholder="email" name="email" required type="email" onChange={handlenewuser}></input>
                    <input ref={inputRef} placeholder="password" name="password" required type="password" onChange={handlenewuser}></input>
                </div>
                <div className="signup-button">
                    <button type="button" onClick={onSignUp}>SignUp</button>
                    <button type="button" onClick={()=>{
                        window.location("/");
                    }}>Cancel</button>
                    
                </div>

            </div>

        </div>
    );
}