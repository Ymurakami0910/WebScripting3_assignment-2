import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignUp.module.css';

function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }
        
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
        const response = await fetch("http://localhost:3000/users/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password
            })
        });

        // Directly use response.json() instead of response.text()
        if (!response.ok) {
            const errorData = await response.json(); // Read the response body as JSON
            throw new Error(errorData.message || "Sign up failed");
        }

        const returnedData = await response.json(); // Manually parse the response as JSON
        console.log(returnedData); // Log the response data

        navigate("/sign-in");

    } catch (error) {
        setErrors({
            ...errors,
            server: error.message
        });
    } finally {
        setIsSubmitting(false);
    }
};

   

    return (
        <main className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>Create Your Account</h2>
                
                {errors.server && (
                    <div className={styles.serverError}>{errors.server}</div>
                )}
                
                <form onSubmit={handleSubmit} noValidate>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                            required
                        />
                        {errors.email && (
                            <span className={styles.errorMessage}>{errors.email}</span>
                        )}
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
                            required
                        />
                        {errors.password && (
                            <span className={styles.errorMessage}>{errors.password}</span>
                        )}
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ""}`}
                            required
                        />
                        {errors.confirmPassword && (
                            <span className={styles.errorMessage}>{errors.confirmPassword}</span>
                        )}
                    </div>
                    
                    <button 
                        type="submit" 
                        className={styles.submitButton}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>
                
                <div className={styles.loginRedirect}>
                    Already have an account? <a href="/sign-in" className={styles.loginLink}>Log in</a>
                </div>
            </div>
        </main>
    );
}

export default SignUp;