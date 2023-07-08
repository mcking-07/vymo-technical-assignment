import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  welcomeContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90vh',
    backgroundColor: '#f7c3b8',
    color: '#3a2d2d',
  },
  welcomeText: {
    fontFamily: 'Arial, sans-serif',
    fontSize: '32px',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: theme.spacing(4),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
}));

const Welcome = () => {
  const classes = useStyles();

  return (
    <div className={classes.welcomeContainer}>
      <h1 className={classes.welcomeText}>Welcome To Merchant Registration</h1>
      <div className={classes.buttonContainer}>
        <Button variant='contained' style={{ backgroundColor: '#fbe4de' }} component={Link} to="/login">
          Login
        </Button>
        <Button variant='contained' style={{ backgroundColor: '#fbe4de' }} component={Link} to="/signup">
          Signup
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
