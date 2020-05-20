import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {firebaseImpl, firebaseDatabase} from '../Firebase/firebaseUtils';

export default function Admin(){
    
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    function handleSubmit(e){
        e.preventDefault();

        firebaseImpl.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                setIsSignedIn(true);
            })
            .catch(function(err){
                setError(err);
            })

    }
    function handleNewPost(e){
        e.preventDefault();

        firebaseDatabase.ref('posts').push().set({title:title, content:content, created_at: Date.now()})
            .catch(function(err){
                setError(err);
            })
    }
    function handleLogout(){
        firebaseImpl.auth().signOut()
        .then(() => {
            history.push('/')
        })
        .catch(function(err){
            setError(err)
        })
    }

    return(
        <div>
            <h1>Admin</h1>
            {!isSignedIn && 
            <form onSubmit={handleSubmit}>
                <input 
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">sign in</button>
            </form>
            }
            {isSignedIn && 
            <>
                <form onSubmit={handleNewPost}>
                    <input 
                        type="text"
                        placeholder="titulo"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button type="submit">Add</button>
                </form>
                <button onClick={handleLogout}>Logout</button>
                </>
            }
        {error && <p>{error}</p>}
        </div>
    )
}