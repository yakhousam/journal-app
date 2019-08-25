import React, { useState, useContext } from "react";
import fetch from "isomorphic-unfetch";
import Router from "next/router";
import userContext from "./UserContext";



export default function Auth() {
  const { setUser } = useContext(userContext);

  const [username, useUsername] = useState("");
  const [password, userPassword] = useState("");
  const [isFormLogin, useIsFormLogin] = useState(true)
  const [error, useError] = useState("");

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === "username") useUsername(value);
    if (name == "password") userPassword(value);
  };
  const doLogin = async e => {
    e.preventDefault();
    // console.log(username, password);
    const res = await fetch(`/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
   
    if (res.status === 200) {
      const json = await res.json();
      setUser(json.userId);
      // console.log('login user id =', json.userId )
      Router.push("/");
      return
    } 
    if(res.status === 400) return useError("Bad request");
    if(res.status === 401) {
      useError("uername or password invalid");
    }else{
      useError('Internal server error')
      // console.log("res.status=", res.status);
    }
  };
  const doRegister = async e => {
    e.preventDefault();
    // console.log(username, password);
    const res = await fetch(`/register`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const json = await res.json();
     console.log("res.status=", res.status);
    // console.log("json =", json);
    if (res.status === 201) {
      setUser(json.userId);
      Router.push("/");
    } 
    if(res.status === 400) {
      useError(json.error);
    }
    if(res.status === 500) {
      useError(json.error);
    }
  };
  return (
    <div className="container">
      <div className="social-login">
        <button>{isFormLogin ? "Login" : "Register"} with google</button>
        <button>{isFormLogin ? "Login" : "Register"} with github</button>
      </div>
      <div className="local-login">
        <form onSubmit={isFormLogin ? doLogin : doRegister}>
        {error && <div>{error}</div>}
          <input
            name="username"
            type="text"
            placeholder="username"
            value={username}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={handleChange}
          />
          <input type="submit" value={isFormLogin ? "Login" : "Register"} />
            {isFormLogin && <p>Don't have an account yet? Please <span onClick={()=> useIsFormLogin(!isFormLogin)}>Register</span></p> }
            {!isFormLogin && <p>Do you have an account? Please <span onClick={()=> useIsFormLogin(!isFormLogin)}>Login</span></p> }
        </form>
      </div>
      
      <style jsx>{`
        .container {
          display: flex;
          flex-wrap: wrap;
          width: 100vw;
          height: 100vh;
          background: skyblue;
        }
        form {
          display: flex;
          flex-direction: column;
          width: 400px;
          margin: 80px auto;
        }
        input, button{
          box-sizing: border-box;
          height: 3em;
          margin: 1em;
        }
        .local-login {
          flex: 2;
          border: thin solid red;
        }
        .social-login {
          flex: 1;
          border: thin sokid green;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        span{
          color: blue;
          text-decoration: underline;
          cursor: pointer;
        }
        span:hover{
          color: purple;
        }
      `}</style>
      <style jsx global>{`
        html, body{
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
