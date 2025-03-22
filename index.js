/* === Imports === */
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-analytics.js";
import { getAuth,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js';
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
/* === UI === */

/* == UI - Elements == */

const viewLoggedOut = document.getElementById("logged-out-view")
const viewLoggedIn = document.getElementById("logged-in-view")

const signInWithGoogleButtonEl = document.getElementById("sign-in-with-google-btn")

const emailInputEl = document.getElementById("email-input")
const passwordInputEl = document.getElementById("password-input")

const signInButtonEl = document.getElementById("sign-in-btn")
const createAccountButtonEl = document.getElementById("create-account-btn")

/* == UI - Event Listeners == */
signInWithGoogleButtonEl.addEventListener("click", authSignInWithGoogle)

signInButtonEl.addEventListener("click", authSignInWithEmail)
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail)

/* === Main Code === */
showLoggedOutView()

/* === Functions === */

/* = Functions - Firebase - Authentication = */

function authSignInWithGoogle() {
    console.log("Sign in with Google")
}

function authSignInWithEmail() {
    const email = emailInputEl.value
    const password = passwordInputEl.value
    
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        showLoggedInView();
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
        showLoggedInView();
        })
        .catch((error) => {
            console.error(error.message)    
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