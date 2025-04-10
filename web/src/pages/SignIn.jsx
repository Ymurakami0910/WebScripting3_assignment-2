import { useState, useEffect } from 'react';
import { useNavigate } from "react-router";

function SignIn( { handleLogin } ) {
    
    // Set up state variabes
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    // Used to redirect back to the home page
    const navigate = useNavigate();

    // Runs when the log in form is submitted
    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetch("http://localhost:3000/users/sign-in", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then( response => response.json() )
        .then( returnedData => {
            // The returned data sets the token via the key in the API, here we store it local store
            localStorage.setItem( "jwt-token", returnedData.jwt);

            // Update authentication state from app.js and redirect
            handleLogin();
        });

    };

    return (
        <main>
        </main>
    );
}

export default SignIn;