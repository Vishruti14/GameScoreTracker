import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory } from 'react-router-dom';

function UpdateUserDetails() {
  const id = localStorage.getItem('id');
  const history = useHistory();

 

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put('http://localhost:9000/updateUser', {
        id,
        ...formData,
      });

      if (response.data === true) {
        history.push('/');
      } else {
        alert('Update Failed');
      }
    } catch (error) {
      console.log('Error updating user data', error);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} id='form'>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your new password"
            value={formData.password}
            onChange={handleChange}
          />
        </FormGroup>
        <Button color="primary" type="submit" style={{width:"150px"}}>
          Update User
        </Button>
      </Form>
    </div>
  );
}

export default UpdateUserDetails;
