import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { registerAction } from '../../services/api';
import Toast from '../common/toast';
import { isValidAverageDailyTransactions, isValidEmail, isValidPhoneNumber, isValidPincode, isValidWebsite, waitForSomeTime } from '../../utils/helpers';

const useStyles = makeStyles((theme) => ({
  registerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90vh',
    width: 'auto',
    backgroundColor: '#f7c3b8',
    color: '#3a2d2d',
  },
  formContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: theme.spacing(5),
    width: '80%',
    padding: theme.spacing(4),
    backgroundColor: '#f7c3b8',
    borderRadius: '8px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
  errorText: {
    color: 'red',
    marginTop: theme.spacing(2),
    textAlign: 'center',
  },
}));

const Register = () => {
  const classes = useStyles();
  const [restaurantName, setRestaurantName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [website, setWebsite] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [averageDailyTransactions, setAverageDailyTransactions] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [pincodeError, setPincodeError] = useState(false);
  const [websiteError, setWebsiteError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [averageDailyTransactionsError, setAverageDailyTransactionsError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastSeverity, setToastSeverity] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const history = useHistory();

  const { state } = window.history.state;

  const displayToast = (severity, message) => {
		setToastSeverity(severity);
		setToastMessage(message);
		setShowToast(true);
	};

	const closeToast = () => {
		setShowToast(false);
	};

	const resetValidationErrors = () => {
		setPincodeError(false);
		setAverageDailyTransactionsError(false);
		setPhoneNumberError(false);
		setWebsiteError(false);
		setEmailError(false);
	};

  const validateInputs = () => {
    resetValidationErrors();

    let isValid = true;

    if (!restaurantName || !contactName || !email  || !phoneNumber || !address || !pincode || !website || !averageDailyTransactions) {
      displayToast('error', 'All Fields Are Required');
      return false;
    }

    if (!isValidEmail(email)) {
			setEmailError(true);
			isValid = false;
		}

    if (!isValidPhoneNumber(phoneNumber)) {
			setPhoneNumberError(true);
			isValid = false;
		}

    if (!isValidPincode(pincode)) {
      setPincodeError(true);
      isValid = false
    }

    if (!isValidWebsite(website)) {
			setWebsiteError(true);
			isValid = false;
		}

    if (!isValidAverageDailyTransactions(averageDailyTransactions)) {
      setAverageDailyTransactionsError(true);
      isValid = false
    }

    return isValid;
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const registrationObject = { restaurantName, contactName, email, pincode, address, website, phoneNumber, averageDailyTransactions };
    const { data } = await registerAction(registrationObject, state.accountUUID);
    const { success, message, error, merchantData } = data;

    if (success) {
      displayToast('success', message);
      waitForSomeTime(1000).then(() => { history.push({ pathname: '/status', state: { merchantData } }) });
    } else {
      displayToast('error', error);
    }
  };

  return (
    <div className={classes.registerContainer}>
      <Toast
        open={showToast}
        severity={toastSeverity}
        message={toastMessage}
        onClose={closeToast}
      />
      <form className={classes.formContainer} onSubmit={handleRegister}>
        <TextField
          label='Restaurant Name'
          value={restaurantName}
          onChange={(event) => setRestaurantName(event.target.value)}
          fullWidth
        />
        <TextField
          label='Contact Name'
          value={contactName}
          onChange={(event) => setContactName(event.target.value)}
          fullWidth
        />
        <TextField
          label='Email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          fullWidth
          error={emailError}
          helperText={emailError ? 'Invalid email address' : ''}
        />
        <TextField
          label='Phone Number'
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
          fullWidth
          error={phoneNumberError}
          helperText={phoneNumberError ? 'Phone Number should only contain numbers' : ''}
        />
        <TextField
          label='Address'
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          fullWidth
        />
        <TextField
          label='Pincode'
          value={pincode}
          onChange={(event) => setPincode(event.target.value)}
          fullWidth
          error={pincodeError}
          helperText={pincodeError ? 'Pincode should only contain numbers' : ''}
        />
        <TextField
          label='Website'
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
          fullWidth
          error={websiteError}
          helperText={websiteError ? 'Invalid website URL' : ''}
        />
        <TextField
          label='Average Daily Transactions'
          value={averageDailyTransactions}
          onChange={(event) => setAverageDailyTransactions(event.target.value)}
          fullWidth
          error={averageDailyTransactionsError}
          helperText={averageDailyTransactionsError ? 'Average Daily Transactions should only contain numbers' : ''}
        />
        <div className={classes.buttonContainer}>
          <Button type='submit' variant='contained' style={{ backgroundColor: '#fbe4de' }}>
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
