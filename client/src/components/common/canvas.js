import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  layoutContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f7c3b8',
  },
  card: {
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    width: 'auto',
    backgroundColor: '#ffe3dd',
    color: '#3a2d2d',
  },
}));

const Canvas = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.layoutContainer}>
      <Container>
        <Paper elevation={3} className={classes.card}>
          {children}
        </Paper>
      </Container>
    </div>
  );
};

export default Canvas;
