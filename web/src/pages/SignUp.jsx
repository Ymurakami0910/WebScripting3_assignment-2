import React, { useState } from 'react';
import { useNavigate } from 'react-router';

function SignUp() {

    // Used to redirect after successful sign up
    const navigate = useNavigate();

    // The form data lives here
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    // Runs when the signup for is submitted
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // If the user has typed different passwords, don't continue
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Send the post request off to the users endpoint in the api with the form data from above
        fetch("http://localhost:3000/users/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then( response => response.json() )
        .then(returnedJSON => {
            navigate("/sign-in")
        });

    };    

    return (
        <main>
            <form></form>
        </main>
    )
}

export default SignUp;