import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Login(props) {
    const { className } = props;
    const history = useHistory();

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const closeBtn = (
        <button className="close" onClick={toggle} type="button">
            &times;
        </button>
    );

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (formData.email == "admin@gmail.com" && formData.password == "admin") {
                history.push({
                    pathname: '/admin',
                    // state: { id: response.data.id } 
                });
            }
            else {
                const response = await axios.post('http://localhost:9000/login', formData);
                if (response.data.success) {
                    alert('Login successful');
                    setFormData({
                        email: '',
                        password: ''
                    });
                    history.push({
                        pathname: '/fetch',
                        state: { id: response.data.id }
                    });
                } else {
                    alert('Login Failed');
                    setFormData({
                        email: '',
                        password: ''
                    });
                }
            }
            toggle();
        }
        catch (error) {
            console.error('Error in Login', error);
        }
    };

    return (
        <div>
            <Button color="dark" outline onClick={toggle}>
                LOGIN
            </Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle} close={closeBtn}>
                    LOGIN FORM
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>

                        <FormGroup>
                            <Label
                                for="email"
                                hidden
                            >
                                Email
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
                        {' '}

                        <FormGroup>
                            <Label
                                for="examplePassword"
                                hidden
                            >
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
                        </FormGroup>
                        {' '}
                        <Button>
                            Submit
                        </Button>
                    </Form>
                </ModalBody>

            </Modal>
        </div>
    );
}

Login.propTypes = {
    className: PropTypes.string,
};

export default Login;
