import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

function Register(props) {
    const { className } = props;

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const closeBtn = (
        <button className="close" onClick={toggle} type="button">
            &times;
        </button>
    );

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [passwordError, setPasswordError] = useState('');

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validatePassword(formData.password)) {
            setPasswordError(
                'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one special character, and one number.'
            );
            return;
        }

        try {
            const response = await axios.post('http://localhost:9000/register', formData);

            alert('Registration successful. Login To Continue');
            setFormData({
                name:'',
                email:'',
                password:''
            }
            );
            toggle();
        } catch (error) {
            console.error('Error in registration:', error);
        }
    };

    return (
        <div>
            <Button color="dark" outline onClick={toggle}>
                REGISTER
            </Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle} close={closeBtn}>
                    REGISTRATION FORM
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
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email" hidden>
                                Email Id
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                placeholder="Email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword" hidden>
                                Password
                            </Label>
                            <Input
                                id="examplePassword"
                                name="password"
                                placeholder="Password"
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                            {passwordError && (
                                <small style={{ color: 'red' }}>{passwordError}</small>
                            )}
                        </FormGroup>
                        <Button>Submit</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
}

Register.propTypes = {
    className: PropTypes.string,
};

export default Register;
