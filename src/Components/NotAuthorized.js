import React from 'react';

const NotAuthorized = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Not Authorized</h1>
      <p style={styles.text}>You do not have permission to view this page.</p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    width:'100vw',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  text: {
    fontSize: '1.2rem',
  },
};

export default NotAuthorized;
