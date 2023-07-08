import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { loginAction } from '../../services/api';
import Toast from '../common/toast';
import { isValidPassword, isValidUsername, waitForSomeTime } from '../../utils/helpers';

const useStyles = makeStyles((theme) => ({
  loginContainer: {
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

const Login = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
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
		setPasswordError(false);
  }

	const validateInputs = () => {
		resetValidationErrors();

		let isValid = true;

		if (!isValidUsername(username)) {
			setUsernameError(true);
			isValid = false;
		}

		if (!isValidPassword(password)) {
			setPasswordError(true);
			isValid = false;
		}

		return isValid;
	};

  const handleLogin = async (event) => {
		event.preventDefault();

		if (!validateInputs()) {
			return;
		}
		
    const { data } = await loginAction(username, password);
    const { success, message, error, regStatus, merchantData, accountUUID } = data;

		if (success) {
      displayToast('success', message)
			const pathname = regStatus ? '/status' : '/register';
			const state = regStatus ? { merchantData } : { accountUUID };
			waitForSomeTime(1000).then(() => { history.push({ pathname, state }) });
		} else {
      displayToast('error', error);
		}
	};

  return (
    <div className={classes.loginContainer}>
      <Toast
        open={showToast}
        severity={toastSeverity}
        message={toastMessage}
        onClose={closeToast}
      />
      <form className={classes.formContainer} onSubmit={handleLogin}>
        <TextField
          label="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          error={usernameError}
          helperText={usernameError ? 'Username should only contain letters and numbers' : ''}
        />
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={passwordError}
          helperText={passwordError ? 'Password should be at least 8 characters long' : ''}
        />
        <Button type='submit' variant='contained' style={{ backgroundColor: '#fbe4de' }}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
