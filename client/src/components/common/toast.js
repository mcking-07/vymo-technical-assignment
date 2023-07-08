import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  toastContainer: {
    top: theme.spacing(10),
  },
}));

const Toast = ({ open, severity, message, onClose }) => {
  const classes = useStyles();

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      className={classes.toastContainer}
    >
      <MuiAlert elevation={5} variant='outlined' onClose={onClose} severity={severity}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Toast;
