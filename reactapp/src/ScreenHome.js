import React, { useState } from 'react';
import './App.css';
import { Input, Button } from 'antd';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

function ScreenHome(props) {

  const [signUpUsername, setSignUpUsername] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')  

  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')  

  const [userExists, setUserExists] = useState(false)
  const [errorSignUp, setErrorSignUp] = useState([])
  const [errorSignIn, setErrorSignIn] = useState([])


  //// Sign Up ////
  var handleSubmitSignUp = async (name, email, pass) => {

    const dataSignUp = await fetch('/sign-up', {
      method : 'POST',
      headers : {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `usernameFromFront=${name}&emailFromFront=${email}&passwordFromFront=${pass}`
    })

    const bodySignUp = await dataSignUp.json()
    // console.log(bodySignUp)
    
    if(bodySignUp.result) {
      props.addToken(bodySignUp.token)
      setUserExists(true)
    } else {
      setErrorSignUp(bodySignUp.error)
    }
    // console.log(bodySignUp.error)
  }
  
  //// Sign In ////
  var handleSubmitSignIn = async (email, pass) => {

    const dataSignIn = await fetch('/sign-in', {
      method : 'POST',
      headers : {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `emailFromFront=${email}&passwordFromFront=${pass}`
    })
    // console.log(dataSignIn)

    const bodySignIn = await dataSignIn.json()
    // console.log(bodySignIn)

    if(bodySignIn.result) {
      setUserExists(true)
      props.addToken(bodySignIn.token)
    } else {
      setErrorSignIn(bodySignIn.error)
    }
  }

  // console.log(userExists)
  if(userExists) {
    return <Redirect to='/screensource'/>
  }


  return (

    <div className="Login-page" >
      {/* SIGN-IN */}
      <div className="Sign">
        <Input className="Login-input" placeholder="Email" 
               onChange={(e) => setSignInEmail(e.target.value)}
               value={signInEmail}/>
        <Input.Password className="Login-input" placeholder="Password" 
               onChange={(e) => setSignInPassword(e.target.value)}
               value={signInPassword}/>

        {errorSignIn.map((error, i) => <p key={i}>{error}</p>)}

        <Button style={{ width: '80px' }} type="primary"
                onClick={() => handleSubmitSignIn(signInEmail, signInPassword)}>
                Sign-in</Button>
      </div>

      {/* SIGN-UP */}
      <div className="Sign">
        <Input className="Login-input" placeholder="Username" 
               onChange={(e) => setSignUpUsername(e.target.value)}
               value={signUpUsername}/>
        <Input className="Login-input" placeholder="Email" 
               onChange={(e) => setSignUpEmail(e.target.value)}
               value={signUpEmail}/>
        <Input.Password className="Login-input" placeholder="Password"
               onChange={(e) => setSignUpPassword(e.target.value)}
               value={signUpPassword}/>
        
        {errorSignUp.map((error, i) => <p key={i}>{error}</p>)}
        
        <Button style={{ width: '80px' }} type="primary" 
                onClick={() => handleSubmitSignUp(signUpUsername, signUpEmail, signUpPassword)}> Sign-up</Button>
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {

  return {
    addToken: function(token) {
      dispatch({ type : 'addToken', myToken : token })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ScreenHome)