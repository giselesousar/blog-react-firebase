import React, { useState } from 'react';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import {firebaseAuth, firebaseDatabase} from '../Firebase/firebaseUtils';

export default function SignUp() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState(null);  
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const isInvalid = password !== passwordTwo || password.length < 8;

    function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        firebaseAuth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                var ref = firebaseDatabase.ref('users').push();
                ref.set({ firstName: firstName, lastName: lastName, email: email, joined_at: Date.now() })
                  .then(() => {
                })
                .catch(function (err) {
                    setError(err.message);
                })
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
                history.push("/profile");
            })
            .catch(function(err){
                setError(err);
            })
    }

    return (
        <Container fluid className="center-block">
            <h1>Sign In</h1>
            <Container className="form-login-container justify-content-center">
                <Form onSubmit={handleSubmit}>
                <Form.Control
                        type="text"
                        placeholder="first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        style={{ marginBottom: "5px" }}
                    />
                    <Form.Control
                        type="text"
                        placeholder="last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        style={{ marginBottom: "5px" }}
                    />
                    <Form.Control
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ marginBottom: "5px" }}
                    />
                    <Form.Control
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ marginBottom: "5px" }}
                    />
                    <Form.Control
                        type="password"
                        placeholder="confirm password"
                        value={passwordTwo}
                        onChange={(e) => setPasswordTwo(e.target.value)}
                        required
                        style={{ marginBottom: "5px" }}
                    />
                    <Button disabled={isInvalid} style={{ width: "100%", marginBottom: "10px", height: "3em" }} type="submit">{loading ? <Spinner animation="border" variant="light" /> : "sign in"}</Button>
                </Form>
                <div style={{ marginBottom: "10px" }} className="text-center my-3">
                    Already have an account?{" "}
                    <Link to="/" className="text-blue-500 hover:text-blue-600">
                        Sign in here
          </Link>{" "}
                </div>
            </Container>
            {error && <p>{error}</p>}
        </Container>)
}