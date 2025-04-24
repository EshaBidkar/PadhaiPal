import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    let validationErrors = {};
    if (!email) validationErrors.email = 'Email is required';
    if (!password) validationErrors.password = 'Password is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Login successful!');
        setEmail('');
        setPassword('');
        setRememberMe(false); // Optionally reset the "Remember Me" checkbox
        console.log(data);
      } else {
        alert(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      alert('Server error, try again later.');
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
      setErrors((prev) => ({ ...prev, email: '' }));
    } else if (name === 'password') {
      setPassword(value);
      setErrors((prev) => ({ ...prev, password: '' }));
    }
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/bg1.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
      }}
    >
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}  // Toggle input type based on showPassword state
                name="password"
                value={password}
                onChange={handleInputChange}
                className={errors.password ? 'input-error' : ''}
              />
              <button
                type="button"
                className="show-password-btn"
                onClick={() => setShowPassword(!showPassword)}  // Toggle password visibility
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          <div className="options-row">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember Me
            </label>
            <p className="forgot-password">Forgot Password?</p>
          </div>

          <button type="submit" className="login-button">Login</button>
          <p className="signup-link">
            Don't have an account? <Link to="/signup">Signup</Link>
         </p>

        </form>
      </div>
    </div>
  );
};

export default Login;
