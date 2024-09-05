import React, { useState, useEffect } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import "../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
const initialForm = {
  email: '',
  password: '',
  terms: false,
};

const errorMessages = {
  email: 'Please enter a valid email address',
  password: 'Password must be at least 4 characters long',
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [termsChanged, setTermsChanged] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(form.email);
    const isPasswordValid = form.password.length >= 4;
    const validTerms = form.terms === true;
    const newErrors = {};

    if (!isEmailValid && form.email) {
      newErrors.email = errorMessages.email;
    }
    if (!isPasswordValid && form.password) {
      newErrors.password = errorMessages.password;
    }

    setErrors(newErrors);
    setIsValid(isEmailValid && isPasswordValid && validTerms);
  }, [form]);

  const handleChange = (event) => {
    let { name, value, type } = event.target;
    value = type === 'checkbox' ? event.target.checked : value;

    if (name === 'terms' && form.terms !== value) {
      setTermsChanged(true);
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      axios
        .get('https://6540a96145bedb25bfc247b4.mockapi.io/api/login')
        .then((res) => {
          const user = res.data.find(
            (item) =>
              item.password === form.password && item.email === form.email
          );
          if (user) {
            setForm(initialForm);
            history.push('/Success');
          } else {
            history.push('/');
          }
        });
    }
  };

  return (
    <div className='container'>
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Enter your email"
          type="email"
          onChange={handleChange}
          value={form.email}
          invalid={!!errors.email}
        />
        {errors.email && <FormFeedback>{errors.email}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="Enter your password"
          type="password"
          onChange={handleChange}
          value={form.password}
          invalid={!!errors.password}
        />
        {errors.password && <FormFeedback>{errors.password}</FormFeedback>}
      </FormGroup>
      <FormGroup check>
        <Input
          id="terms"
          name="terms"
          checked={form.terms}
          type="checkbox"
          onChange={handleChange}
        />{' '}
        <Label
          htmlFor="terms"
          check
          style={{
            color: !form.terms && termsChanged ? 'red' : 'inherit',
          }}
        >
          I agree to terms of service and privacy policy
        </Label>
      </FormGroup>
      <FormGroup className="text-center p-4">
        <Button color="secondary" disabled={!isValid}>
          Sign In
        </Button>
      </FormGroup>
    </Form>
    </div>
  );
}
