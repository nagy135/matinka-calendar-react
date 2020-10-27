import React, { useState } from "react";
import axios from "axios";
import { loginUrl } from '../constants';
import { Button, Form } from "react-bootstrap";
import "./css/Login.css";

const Login = (props) => {
    const [email, setEmail] = useState("martinaondrejkova121@gmail.com");
    const [password, setPassword] = useState("");

    const validateForm = () => {
        return email.length > 0 && password.length > 0;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const logged = await logIn();
        if (logged)
            props.logIn();
        else
            alert('zle heslo!'); // TODO correctly show to user
        
    }
    const logIn = async () => {
        try {
            // TODO do something with returned user data?
            await axios.post(loginUrl, {
                email,
                password
            });
            return true;
        } catch (err) {
            return false;
        }

    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                </Form.Group>
                <Button block disabled={!validateForm()} type="submit">
                    Login
                </Button>
            </form>
        </div>
    );
}

export default Login;
