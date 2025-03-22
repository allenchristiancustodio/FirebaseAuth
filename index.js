/* === Imports === */
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-analytics.js";
import { getAuth,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
        signOut ,
        onAuthStateChanged,
        GoogleAuthProvider,
        signInWithPopup } 
        from 'https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js';
/* === Firebase Setup === */

const firebaseConfig = {
  apiKey: "AIzaSyC0ZGYpOoaV_faWBfgHZbZDcOg9SKFQ9Zk",
  authDomain: "calleahcart.firebaseapp.com",
  projectId: "calleahcart",
  storageBucket: "calleahcart.firebasestorage.app",
  messagingSenderId: "565094361740",
  appId: "1:565094361740:web:08dc7570cf6a41caeba9a9",
  measurementId: "G-G9N5Y3REGC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
/* === UI === */

/* == UI - Elements == */

const viewLoggedOut = document.getElementById("logged-out-view")
const viewLoggedIn = document.getElementById("logged-in-view")

const signInWithGoogleButtonEl = document.getElementById("sign-in-with-google-btn")

const emailInputEl = document.getElementById("email-input")
const passwordInputEl = document.getElementById("password-input")

const signInButtonEl = document.getElementById("sign-in-btn")
const createAccountButtonEl = document.getElementById("create-account-btn")

const signOutButtonEl = document.getElementById("sign-out-btn")

/* == UI - Event Listeners == */
signInWithGoogleButtonEl.addEventListener("click", authSignInWithGoogle)

signInButtonEl.addEventListener("click", authSignInWithEmail)
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail)
signOutButtonEl.addEventListener("click", authSignOut)
/* === Main Code === */
    
checkUserState();

/* === Functions === */

/* = Functions - Firebase - Authentication = */
function authSignInWithGoogle() {
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      checkUserState();
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
    //   const errorCode = error.code;
      console.error(error.message);
    //   // The email of the user's account used.
    //   const email = error.customData.email;
    //   // The AuthCredential type that was used.
    //   const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

function authSignInWithEmail() {
    const email = emailInputEl.value
    const password = passwordInputEl.value
    
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        clearAuthFields();
        })
        .catch((error) => {
            console.error(error.message)
        });
}

function authCreateAccountWithEmail() {
    const email = emailInputEl.value
    const password = passwordInputEl.value

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed up 
        clearAuthFields();
        })
        .catch((error) => {
            console.error(error.message)    
        });
}

function authSignOut() {
    signOut(auth).then(() => {
        showLoggedOutView()
      }).catch((error) => {
        alert('error on signed out')
      });
}

function checkUserState(){
    onAuthStateChanged(auth, (user) => {
        if (user) {
            showLoggedInView();
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          console.log(user)
          const uid = user.uid;
          // ...
        } else {
            showLoggedOutView();
          // User is signed out
          // ...
        }
      });
}
/* == Functions - UI Functions == */

function showLoggedOutView() {
    hideElement(viewLoggedIn)
    showElement(viewLoggedOut)
}

function showLoggedInView() {
    hideElement(viewLoggedOut)
    showElement(viewLoggedIn)
}

function showElement(element) {
    element.style.display = "flex"
}

function hideElement(element) {
    element.style.display = "none"
}

function clearAuthFields() {
	clearInputField(emailInputEl)
	clearInputField(passwordInputEl)
}