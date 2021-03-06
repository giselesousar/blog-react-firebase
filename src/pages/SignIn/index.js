import React, { useState } from 'react';
import {Container, Form, Button, Spinner} from 'react-bootstrap';
import {firebaseAuth} from '../../Firebase/firebaseUtils';
import {useHistory, Link} from 'react-router-dom';
import './styles.css';

export default function SignIn(){

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const history = useHistory();

    function handleSubmit(e){
        setLoading(true);
        e.preventDefault();

        firebaseAuth.signInWithEmailAndPassword(email, password)
            .then(() => {
                setEmail('');
                setPassword('');
                history.push('/profile');
            })
            .catch(function(err){
                setError(err);
            })

    }

    return(
        <Container fluid className="center-block">
        <h1>Sign In</h1>
        <Container className="form-login-container justify-content-center">
        <Form onSubmit={handleSubmit}>
            <Form.Control
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{marginBottom:"5px"}}
            />
            <Form.Control
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{marginBottom:"5px"}}
            />
            <Button style={{width: "100%", marginBottom:"10px", height: "3em"}} type="submit">{loading ? <Spinner animation="border" variant="light"  /> : "sign in"}</Button>
        </Form>
        <div style={{marginBottom: "10px"}} className="text-center my-3">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:text-blue-600">
            Sign up here
          </Link>{" "}
          <br />{" "}
          <Link to="/pw-reset" className="text-blue-500 hover:text-blue-600">
            Forgot Password?
          </Link>
        </div>
        </Container>
        
        </Container>
    )
}