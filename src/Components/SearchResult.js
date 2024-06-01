import React, { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

export default function SearchResult({ data, onClickHandler, page }) {
  const handleClick = () => {
    onClickHandler(data.location);
  };
  
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <div style={styles.searchresult}>
      <h2 style={styles.title}>{data.name}</h2>
      <h3 style={styles.contact}>{data.contactDetails}</h3>
      <div style={styles.buttons}>
        {page === 1 ? <h4 style={styles.viewPath} onClick={handleClick}>View Path</h4> : null}
        <button style={styles.button} onClick={onOpenModal}>See Details</button>
        <Modal open={open} onClose={onCloseModal} center>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>{data.name}</h2>
            <h3 style={styles.modalContact}>{data.contactDetails}</h3>
            <h3 style={styles.modalHours}>{data.operatingHours}</h3>
            <p><strong>Description:</strong> {data.description}</p>
            <p><strong>Categories:</strong> {data.categories.join(', ')}</p>
            <p><strong>Address:</strong> {data.location.address}</p>
          </div>
        </Modal>
      </div>
    </div>
  );
}

const styles = {
  searchresult: {
    width: '20vw',
    height: 'auto',
    backgroundColor: '#ffff',
    marginTop: '20px',
    borderRadius: '10px',
    padding: '20px',
    boxSizing: 'border-box',
    cursor: 'pointer',
    marginLeft: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
  },
  title: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  contact: {
    fontSize: '1.2em',
    color: '#555',
    marginBottom: '15px',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewPath: {
    fontSize: '1em',
    color: '#000000',
    cursor: 'pointer',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#000000',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  modalContent: {
    padding: '20px',
  },
  modalTitle: {
    fontSize: '2em',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  modalContact: {
    fontSize: '1.2em',
    marginBottom: '10px',
  },
  modalHours: {
    fontSize: '1.2em',
    marginBottom: '20px',
  },
};
