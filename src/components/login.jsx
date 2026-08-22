import { useState } from 'react';
import { FaGoogle, FaLock, FaUserCheck } from 'react-icons/fa';
import { useAuth } from './authcontext';
import './login.css';

const Login = () => {
  const { loginWithGoogle, loginAsGuest } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (loginAction) => {
    setError('');
    setLoading(true);

    try {
      await loginAction();
    } catch (loginError) {
      setError(loginError.code ? `${loginError.code}: ${loginError.message}` : loginError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-shell" aria-label="SmartAttend sign in">
        <div className="login-intro">
          <div>
            <div className="login-mark" aria-hidden="true">SA</div>
            <h1>Attendance, with a clear record.</h1>
            <p>Sign in to manage sessions and keep classroom attendance organized.</p>
          </div>
          <div className="login-caption">
            <FaLock aria-hidden="true" />
            <span>Your account details stay private.</span>
          </div>
        </div>

        <div className="login-form">
          <h2>Welcome back</h2>
          <p>Choose a secure way to continue to your workspace.</p>

          {error && <p className="login-error" role="alert">{error}</p>}

          <button
            className="login-button login-button-google"
            onClick={() => handleLogin(loginWithGoogle)}
            disabled={loading}
            type="button"
          >
            <FaGoogle aria-hidden="true" />
            <span>{loading ? 'Signing in...' : 'Sign in with Google'}</span>
          </button>

          <button
            className="login-button login-button-guest"
            onClick={() => handleLogin(loginAsGuest)}
            disabled={loading}
            type="button"
          >
            <FaUserCheck aria-hidden="true" />
            <span>Continue as Guest</span>
          </button>

          <p className="login-privacy">Only your authenticated session can enter the workspace.</p>
        </div>
      </section>
    </main>
  );
};

export default Login;
