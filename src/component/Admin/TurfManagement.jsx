import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

Modal.setAppElement('#root');

const TurfManagement = () => {
    const [advertisements, setAdvertisements] = useState([]);
    const [acceptedAdvertisements, setAcceptedAdvertisements] = useState([]);
    const [acceptModalIsOpen, setAcceptModalIsOpen] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedAdId, setSelectedAdId] = useState(null);
    const [reason, setReason] = useState('');
    const [imageModalIsOpen, setImageModalIsOpen] = useState(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState('');

    useEffect(() => {
        // Fetch all advertisements when the component mounts
        axios.get('http://localhost:8080/api/advertisements/all')
            .then(response => {
                setAdvertisements(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the advertisements!', error);
            });

        // Fetch all accepted advertisements when the component mounts
        axios.get('http://localhost:8080/api/accept/all')
            .then(response => {
                setAcceptedAdvertisements(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the accepted advertisements!', error);
            });
    }, []);

    const handleAcceptClick = (id) => {
        setSelectedAdId(id);
        setAcceptModalIsOpen(true);
    };

    const handleAccept = () => {
        const ad = advertisements.find(ad => ad.id === selectedAdId);
        if (!ad) return;

        const acceptData = {
            turfName: ad.turfName,
            ownerName: ad.ownerName,
            location: ad.location,
            contactNumber: ad.contactNumber,
            whatsappNumber: ad.whatsappNumber,
            email: ad.email,
            perHour: ad.perHour,
            availableSports: ad.availableSports,
            image: ad.image // Assuming image is base64 encoded or a URL
        };

        axios.post(`http://localhost:8080/api/accept/accept/${ad.id}`, acceptData)
            .then(response => {
                // Delete the advertisement from the advertisements table
                return axios.delete(`http://localhost:8080/api/advertisements/${selectedAdId}`);
            })
            .then(() => {
                setAdvertisements(advertisements.filter(adItem => adItem.id !== selectedAdId));
                setAcceptedAdvertisements([...acceptedAdvertisements, acceptData]);
                setAcceptModalIsOpen(false);
            })
            .catch(error => {
                console.error('There was an error accepting or deleting the advertisement!', error);
            });
    };

    const handleDeleteClick = (id) => {
        setSelectedAdId(id);
        setModalIsOpen(true);
    };

    const handleDelete = () => {
        axios.delete(`http://localhost:8080/api/advertisements/${selectedAdId}`)
            .then(response => {
                setAdvertisements(advertisements.filter(ad => ad.id !== selectedAdId));
                setModalIsOpen(false);
                setReason('');
            })
            .catch(error => {
                console.error('There was an error deleting the advertisement!', error);
            });
    };

    const handleCloseModal = () => {
        setModalIsOpen(false);
        setReason('');
    };

    const handleCloseAcceptModal = () => {
        setAcceptModalIsOpen(false);
    };

    const handleShowImage = (id) => {
        setSelectedImageUrl(getImageUrl(id));
        setImageModalIsOpen(true);
    };

    const handleCloseImageModal = () => {
        setImageModalIsOpen(false);
        setSelectedImageUrl('');
    };

    const getImageUrl = (id) => {
        return `http://localhost:8080/api/advertisements/image/${id}`;
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        margin: '25px 0',
        fontSize: '18px',
        textAlign: 'left',
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s ease-in-out',
    };

    const headerStyle = {
        backgroundColor: '#C8102E',
        color: 'black',
        textAlign: 'left',
        fontWeight: 'bold',
        animation: 'slideIn 0.5s ease-in-out',
    };

    const cellStyle = {
        padding: '12px 15px',
        borderBottom: '1px solid #dddddd',
        transition: 'background-color 0.3s ease-in-out',
    };

    const rowStyle = {
        transition: 'background-color 0.3s ease-in-out, transform 0.3s ease-in-out',
    };

    const hoverEffect = {
        backgroundColor: '#F7D7D7',
        transform: 'scale(1.02)',
    };

    const modalStyle = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
        },
    };

    const buttonStyle = {
        padding: '10px 15px',
        margin: '5px',
        borderRadius: '5px',
        border: 'none',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    const acceptButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#28a745',
    };

    const cancelButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#dc3545',
    };

    const showImageButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#007bff',
    };

    return (
        <div style={{ padding: '20px', width: '100%' }}>
            <h1 style={{ textAlign: 'center', color: '#009879', fontSize: '2em', marginBottom: '20px' }}>
                Turf Management
            </h1>
            
            {/* Existing table for advertisements */}
            <table style={tableStyle}>
                <thead>
                    <tr style={headerStyle}>
                        <th style={cellStyle}>ID</th>
                        <th style={cellStyle}>Image</th>
                        <th style={cellStyle}>Turf Name</th>
                        <th style={cellStyle}>Owner Name</th>
                        <th style={cellStyle}>Location</th>
                        <th style={cellStyle}>Contact Number</th>
                        <th style={cellStyle}>Whatsapp Number</th>
                        <th style={cellStyle}>Email</th>
                        <th style={cellStyle}>Per Hour</th>
                        <th style={cellStyle}>Available Sports</th>
                        <th style={cellStyle}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {advertisements.map(ad => (
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
                                        onClick={() => handleShowImage(ad.id)}
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
                                    onClick={() => handleAcceptClick(ad.id)}
                                    style={acceptButtonStyle}
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => handleDeleteClick(ad.id)}
                                    style={cancelButtonStyle}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Accept Modal */}
            <Modal
                isOpen={acceptModalIsOpen}
                onRequestClose={handleCloseAcceptModal}
                style={modalStyle}
            >
                <h2>Accept Advertisement</h2>
                <p>Are you sure you want to accept this advertisement?</p>
                <button onClick={handleAccept} style={acceptButtonStyle}>
                    Yes
                </button>
                <button onClick={handleCloseAcceptModal} style={cancelButtonStyle}>
                    No
                </button>
            </Modal>

            {/* Delete Modal */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                style={modalStyle}
            >
                <h2>Delete Advertisement</h2>
                <p>Are you sure you want to delete this advertisement?</p>
                <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Reason for deletion (optional)"
                    style={{ width: '100%', marginBottom: '10px' }}
                />
                <button onClick={handleDelete} style={acceptButtonStyle}>
                    Yes
                </button>
                <button onClick={handleCloseModal} style={cancelButtonStyle}>
                    No
                </button>
            </Modal>

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
                <button onClick={handleCloseImageModal} style={cancelButtonStyle}>
                    Close
                </button>
            </Modal>
        </div>
    );
};

export default TurfManagement;
