import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { logoutAction } from '../../services/api';
import Toast from '../common/toast';
import { waitForSomeTime } from '../../utils/helpers';

const useStyles = makeStyles((theme) => ({
  statusContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90vh',
    width: 'auto',
    backgroundColor: '#f7c3b8',
    color: '#3a2d2d',
  },
  statusText: {
    fontFamily: 'Arial, sans-serif',
    fontSize: '24px',
    textAlign: 'center',
    padding: theme.spacing(1),
    border: '2px solid #fbe4de',
    borderRadius: '8px',
    marginBottom: theme.spacing(4),
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    maxWidth: '500px',
    padding: theme.spacing(4),
    backgroundColor: '#f7c3b8',
    border: '2px solid #fbe4de',
    borderRadius: '8px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
}));

const Status = () => {
  const classes = useStyles();
  const [showToast, setShowToast] = useState(false);
  const [toastSeverity, setToastSeverity] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const history = useHistory();

  const { merchantData } = window.history.state.state;

  const displayToast = (severity, message) => {
		setToastSeverity(severity);
		setToastMessage(message);
		setShowToast(true);
	};

	const closeToast = () => {
		setShowToast(false);
	};

  const handleLogout = async () => {
    const { data } = await logoutAction(merchantData.accountUUID);
    const { success, message } = data;

    if (success) {
      displayToast('success', message);
      waitForSomeTime(1000).then(() => { history.push('/') });
    }
  };

  return (
		<div className={classes.statusContainer}>
			<Toast
        open={showToast}
        severity={toastSeverity}
        message={toastMessage}
        onClose={closeToast}
      />
			<Typography variant='h5' className={classes.statusText}>
				Registration Status: {merchantData.status}
			</Typography>
			<div className={classes.detailsContainer}>
				<Typography variant='subtitle1'>
					Restaurant Name: {merchantData.restaurant.name}
				</Typography>
				<Typography variant='subtitle1'>
					Contact Name: {merchantData.contact.name}
				</Typography>
				<Typography variant='subtitle1'>
					Pincode: {merchantData.restaurant.pincode}
				</Typography>
				<Typography variant='subtitle1'>
					Address: {merchantData.restaurant.address}
				</Typography>
				<Typography variant='subtitle1'>
					Website: {merchantData.restaurant.website}
				</Typography>
				<Typography variant='subtitle1'>
					Phone Number: {merchantData.contact.phone}
				</Typography>
				<Typography variant='subtitle1'>
					Average Daily Transactions: {merchantData.restaurant.averageDailyTransactions}
				</Typography>
			</div>
			<div className={classes.buttonContainer}>
				<Button variant='contained' onClick={handleLogout} style={{ backgroundColor: '#fbe4de' }}>
					Logout
				</Button>
			</div>
		</div>
	);
};

export default Status;
