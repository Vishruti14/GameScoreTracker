import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';

function AddGame(props) {
    const [modal, setModal] = useState(false);
    const { handleAddGame, newGame, handleChange } = props;

    const toggle = () => {
        setModal(!modal);
    };

    const handleAddGameAndCloseModal = async () => {
        if (newGame.score < 0) {
            alert('Initial score cannot be negative');
        } else {
            await handleAddGame();
            toggle(); // Close the modal
        }
    };

    return (
        <div>
            <Button color="warning" onClick={toggle} style={{ width: "200px",marginBottom:"20px"}} >
                Add Game
            </Button>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader>
                    New Game
                    <button type="button" className="close" onClick={toggle} style={{ position: 'absolute', top: '10px', right: '10px' }}>
                        <span>&times;</span>
                    </button>
                </ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label htmlFor="gamename">Game Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="gamename"
                            name="gamename"
                            value={newGame.gamename}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="score">Initial Score</label>
                        <input
                            type="text"
                            className="form-control"
                            id="score"
                            name="score"
                            value={newGame.score}
                            onChange={handleChange}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleAddGameAndCloseModal} style={{width:"120px"}}>
                        Add Game
                    </Button>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default AddGame;
