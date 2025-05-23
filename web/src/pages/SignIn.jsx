import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignUp.module.css';  // Reuse the same CSS module

function SignIn({ handleLogin }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        
        // Clear the error for the specific field when it changes
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
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateForm()) return;
    
        setIsSubmitting(true);
    
        try {
            const response = await fetch("http://localhost:3000/api/users/sign-in/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });
    
            const responseText = await response.text(); // Get the response as text
            console.log(responseText); // Log the raw response

            let returnedData;
    
            try {
                returnedData = JSON.parse(responseText); // Manually parse the JSON
                console.log(returnedData); // Log the response to see its contents
            } catch (error) {
                console.error("Error parsing response:", error);
            }
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Sign up failed");
                return;
            }
    
            // Navigate to the All Books page after successful sign-up
            localStorage.setItem("jwt-token", returnedData.jwt);
            navigate("/");  // <-- Make sure this path is correct
    
        } catch (error) {
            setErrors({
                ...errors,
                server: error.message,
            });
        } finally {
            setIsSubmitting(false);
        }
    };
    

    return (
        <main className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>Sign In</h2>

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

                    <button 
                        type="submit" 
                        className={styles.submitButton}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Signing In..." : "Sign In"}
                    </button>
                </form>

                <div className={styles.loginRedirect}>
                    Don't have an account? <a href="/sign-up" className={styles.loginLink}>Sign Up</a>
                </div>
            </div>
        </main>
    );
}

export default SignIn;
