import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import EditIcon from '@mui/icons-material/Edit';

Modal.setAppElement('#root');

const AcceptedTable = () => {
    const [acceptedAdvertisements, setAcceptedAdvertisements] = useState([]);
    const [imageModalIsOpen, setImageModalIsOpen] = useState(false);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState('');
    const [editAd, setEditAd] = useState(null);

    useEffect(() => {
        // Fetch all accepted advertisements when the component mounts
        axios.get('http://localhost:8080/api/accept/all')
            .then(response => {
                setAcceptedAdvertisements(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the accepted advertisements!', error);
            });
    }, []);

    const handleShowImage = (imageUrl) => {
        setSelectedImageUrl(imageUrl);
        setImageModalIsOpen(true);
    };

    const handleCloseImageModal = () => {
        setImageModalIsOpen(false);
        setSelectedImageUrl('');
    };

    const handleOpenEditModal = (ad) => {
        setEditAd(ad);
        setEditModalIsOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditModalIsOpen(false);
        setEditAd(null);
    };

    const handleChange = (e) => {
        setEditAd({
            ...editAd,
            [e.target.name]: e.target.value,
        });
    };

    const handleSaveChanges = () => {
        axios.put(`http://localhost:8080/api/accept/${editAd.id}`, editAd)
            .then(response => {
                // Update the state with the new list of accepted ads
                setAcceptedAdvertisements(prevAds =>
                    prevAds.map(ad => (ad.id === editAd.id ? response.data : ad))
                );
                handleCloseEditModal();
            })
            .catch(error => {
                console.error('There was an error updating the advertisement!', error);
            });
    };

    // Styles for the table, modal, etc.
    const tableStyle = { width: '100%', borderCollapse: 'collapse' };
    const headerStyle = {
        backgroundColor: '#C8102E', // Background color for table headers
        color: '#fff', // Text color for table headers
        fontWeight: 'bold',
        textAlign: 'left', // Align text to the left in header cells
        padding: '10px', // Add padding to header cells
    };
    const cellStyle = { padding: '10px' }; // Removed border style
    const rowStyle = { borderBottom: '1px solid #ddd' };
    const hoverEffect = { backgroundColor: '#f1f1f1' };
    const modalStyle = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            border: '1px solid #ccc',
            padding: '20px',
            borderRadius: '8px',
            backgroundColor: '#fff'
        }
    };
    const buttonStyle = {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        color: '#fff',
        backgroundColor: '#007bff',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.3s ease',
    };
    const editButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#28a745',
        transition: 'background-color 0.3s ease, transform 0.3s ease',
        ':hover': {
            backgroundColor: '#F7D7D78',
            transform: 'scale(1.1)',
        }
    };

    return (
        <div style={{ padding: '20px', width: '100%' }}>
            <h1 style={{ textAlign: 'center', color: '#009879', fontSize: '2em', marginBottom: '20px' }}>
                Partners
            </h1>

            {/* Table for accepted advertisements */}
            <table style={tableStyle}>
                <thead>
                    <tr style={headerStyle}>
                        <th style={headerStyle}>ID</th>
                        <th style={headerStyle}>Image</th>
                        <th style={headerStyle}>Turf Name</th>
                        <th style={headerStyle}>Owner Name</th>
                        <th style={headerStyle}>Location</th>
                        <th style={headerStyle}>Contact Number</th>
                        <th style={headerStyle}>Whatsapp Number</th>
                        <th style={headerStyle}>Email</th>
                        <th style={headerStyle}>Per Hour</th>
                        <th style={headerStyle}>Available Sports</th>
                        <th style={headerStyle}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {acceptedAdvertisements.map(ad => (
                        <tr
                            key={ad.id}
                            style={rowStyle}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hoverEffect.backgroundColor}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                        >
                            <td style={cellStyle}>{ad.id}</td>
                            <td style={cellStyle}>
                                {ad.image ? (
                                    <button
                                        onClick={() => handleShowImage(ad.image)}
                                        style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                                    >
                                        <PhotoCamera style={{ color: '#007bff', fontSize: '24px' }} />
                                    </button>
                                ) : (
                                    <p>No Image</p>
                                )}
                            </td>
                            <td style={cellStyle}>{ad.turfName}</td>
                            <td style={cellStyle}>{ad.ownerName}</td>
                            <td style={cellStyle}>{ad.location}</td>
                            <td style={cellStyle}>{ad.contactNumber}</td>
                            <td style={cellStyle}>{ad.whatsappNumber}</td>
                            <td style={cellStyle}>{ad.email}</td>
                            <td style={cellStyle}>{ad.perHour}</td>
                            <td style={cellStyle}>{ad.availableSports}</td>
                            <td style={cellStyle}>
                                <button
                                    onClick={() => handleOpenEditModal(ad)}
                                    style={{ ...editButtonStyle }}
                                >
                                    <EditIcon style={{ color: '#fff', fontSize: '24px' }} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Image Modal */}
            <Modal
                isOpen={imageModalIsOpen}
                onRequestClose={handleCloseImageModal}
                style={modalStyle}
            >
                <h2>Advertisement Image</h2>
                {selectedImageUrl && (
                    <img
                        src={selectedImageUrl}
                        alt="Advertisement"
                        style={{ width: '100%', maxHeight: '500px', objectFit: 'contain' }}
                    />
                )}
                <button onClick={handleCloseImageModal} style={{ ...buttonStyle, backgroundColor: '#dc3545' }}>
                    Close
                </button>
            </Modal>

            {/* Edit Modal */}
            <Modal
                isOpen={editModalIsOpen}
                onRequestClose={handleCloseEditModal}
                style={modalStyle}
            >
                <h2>Edit Advertisement</h2>
                {editAd && (
                    <div>
                        <label>Turf Name:</label>
                        <input
                            type="text"
                            name="turfName"
                            value={editAd.turfName}
                            onChange={handleChange}
                        />
                        <br />
                        <label>Owner Name:</label>
                        <input
                            type="text"
                            name="ownerName"
                            value={editAd.ownerName}
                            onChange={handleChange}
                        />
                        <br />
                        <label>Location:</label>
                        <input
                            type="text"
                            name="location"
                            value={editAd.location}
                            onChange={handleChange}
                        />
                        <br />
                        <label>Contact Number:</label>
                        <input
                            type="text"
                            name="contactNumber"
                            value={editAd.contactNumber}
                            onChange={handleChange}
                        />
                        <br />
                        <label>Whatsapp Number:</label>
                        <input
                            type="text"
                            name="whatsappNumber"
                            value={editAd.whatsappNumber}
                            onChange={handleChange}
                        />
                        <br />
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={editAd.email}
                            onChange={handleChange}
                        />
                        <br />
                        <label>Per Hour:</label>
                        <input
                            type="text"
                            name="perHour"
                            value={editAd.perHour}
                            onChange={handleChange}
                        />
                        <br />
                        <label>Available Sports:</label>
                        <input
                            type="text"
                            name="availableSports"
                            value={editAd.availableSports}
                            onChange={handleChange}
                        />
                        <br />
                        <button
                            onClick={handleSaveChanges}
                            style={{ ...buttonStyle, backgroundColor: '#28a745' }}
                        >
                            Save Changes
                        </button>
                        <button
                            onClick={handleCloseEditModal}
                            style={{ ...buttonStyle, backgroundColor: '#dc3545' }}
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default AcceptedTable;
