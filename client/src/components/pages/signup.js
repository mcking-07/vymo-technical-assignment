import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { signupAction } from '../../services/api';
import Toast from '../common/toast';
import { isValidUsername, isValidEmail, isValidPassword, waitForSomeTime } from '../../utils/helpers';

const useStyles = makeStyles((theme) => ({
  signupContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90vh',
    width: 'auto',
    backgroundColor: '#f7c3b8',
    color: '#3a2d2d',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}));

const Signup = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastSeverity, setToastSeverity] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const history = useHistory();

  const displayToast = (severity, message) => {
		setToastSeverity(severity);
		setToastMessage(message);
		setShowToast(true);
	};

	const closeToast = () => {
		setShowToast(false);
	};

  const resetValidationErrors = () => {
		setUsernameError(false);
    setEmailError(false);
		setPasswordError(false);
	};

  const validateInputs = () => {
    resetValidationErrors();

    let isValid = true;

    if (!isValidUsername(username)) {
			setUsernameError(true);
			isValid = false;
		}

    if (!isValidEmail(email)) {
      setEmailError(true);
      isValid = false;
    }

    if (!isValidPassword(password)) {
      setPasswordError(true);
      isValid = false;
    }

    return isValid;
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const { data } = await signupAction(username, email, password);
    const { success, message, error } = data;

    if (success) {
      displayToast('success', message)
      waitForSomeTime(1000).then(() => history.push('/login'));
    } else {
      displayToast('error', error);
    }
  };

  return (
    <div className={classes.signupContainer}>
      <Toast
        open={showToast}
        severity={toastSeverity}
        message={toastMessage}
        onClose={closeToast}
      />
      <form className={classes.formContainer} onSubmit={handleSignup}>
        <TextField
          label='Username'
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          error={usernameError}
          helperText={usernameError ? 'Username should only contain letters and numbers' : ''}
        />
        <TextField
          label='Email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={emailError}
          helperText={emailError ? 'Invalid email address' : ''}
        />
        <TextField
          type='password'
          label='Password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={passwordError}
          helperText={passwordError ? 'Password should be at least 8 characters long' : ''}
        />
        <Button type='submit' variant='contained' style={{ backgroundColor: '#fbe4de' }}>
          Signup
        </Button>
      </form>
    </div>
  );
};

export default Signup;
