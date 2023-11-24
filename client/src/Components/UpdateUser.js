import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';

function UpdateUser(props) {
    const [modal, setModal] = useState(false);
    const { senddata, item } = props;

    const [formdata, setFormdata] = useState({
        id: item.id,
        name: item.name,
        email: item.email,
        password: item.password,
    });

    const [passwordError, setPasswordError] = useState('');

    const handleInput = (event) => {
        const { name, value } = event.target;
        setFormdata({
            ...formdata,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validatePassword(formdata.password)) {
            return; // Don't submit the form if the password is invalid
        }
        senddata(formdata);
        toggle();
        setFormdata({
            id: '',
            name: '',
            email: '',
            password: '',
        });
    };

    const toggle = () => setModal(!modal);

    const validatePassword = (password) => {
        
        const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;

        if (!passwordPattern.test(password)) {
            setPasswordError(
                'Password must be at least 8 character, A uppercase letter, A lowercase letter, A special character, and A number.'
            );
            return false; // Password is invalid
        } else {
            setPasswordError('');
            return true; // Password is valid
        }
    };

    return (
        <div>
            <Button color="info" onClick={toggle} style={{ width: "200px" }}>
                Update User Details
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader>
                    Update User
                    <button type="button" className="close" onClick={toggle} style={{ position: 'absolute', top: '10px', right: '10px' }}>
                        <span>&times;</span>
                    </button>
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="name" hidden>
                                Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Name"
                                type="text"
                                required
                                value={formdata.name}
                                onChange={handleInput}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email" hidden>
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                placeholder="Email"
                                type="email"
                                required
                                value={formdata.email}
                                onChange={handleInput}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password" hidden>
                                Password
                            </Label>
                            <Input
                                id="password"
                                name="password"
                                placeholder="Password"
                                type="password"
                                required
                                value={formdata.password}
                                onChange={handleInput}
                            />
                        </FormGroup>
                        {passwordError && (
                            <small style={{ color: 'red' }}>{passwordError}</small>
                        )}
                        <Button>Submit</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default UpdateUser;
