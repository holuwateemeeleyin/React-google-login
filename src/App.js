import './App.css';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode"

function App() {

  const [user, setUser] = useState({})

  function handleCallbackResponse(response){
    console.log("Encoded Jwt ID token: " + response.credential);
    var userObject = jwt_decode(response.credential)
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true
    
  }

  // Handle SignOut
  function handleSignOut(event) {
    setUser({})
    document.getElementById("signInDiv").hidden = false
  }
  useEffect(()=> {
    /* global google */
    google.accounts.id.initialize({
      client_id: "230494105456-4d6vje8o8j97ec7572oofosgr31n093j.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large"}
    )
    google.accounts.id.prompt();
  }, [])

  // If we have no user: sign in button
  // else if we have a user, show the log out button
  return (
    <div className="App">
      <h2 align="center">React Google Login</h2>
      <div id="signInDiv"></div>
      {/* Show logout if user is signin */}
      {
        Object.keys(user).length !== 0 && 
        <button onClick={(e)=> handleSignOut(e)}> Sign Out</button>
      }
      {/* Show user details if user is signed in */}
      {
        user && 
        <div>
          <img src={user.picture} alt={user.picture}/>
          <h3> {user.name}</h3>
        </div>
      }
    </div>
  );
}

export default App;
