import React, {useState, useEffect} from 'react';
import { Table, Button } from 'react-bootstrap';
import FirebaseService from '../../Firebase/firebaseService';
import {firebaseDatabase, firebaseAuth} from '../../Firebase/firebaseUtils'

export default function TableComponent() {
    const [postData, setPostData] = useState([]);
    const [numberPosts, setNumberPosts] = useState(10);
    const [error, setError] = useState(null);

    function handleShowMore(){
        setNumberPosts(numberPosts + 10);
    }
    function handleDeletePost(key){
        firebaseDatabase.ref('posts').child(key).remove()
        .then(() => {
            //removeu
        })
        .catch(function(err){
            setError(err);
        })
    }


    useEffect(() => {
        var user = firebaseAuth.currentUser;
        firebaseDatabase.ref('posts').limitToLast(100)
            .orderByChild("author")
            .equalTo(user.uid)
            .once('value', dataSnapshot => {
                var items = [];
                dataSnapshot.forEach(childSnapshot => {
    
                    let post = {
                        key: childSnapshot.key,
                        title: childSnapshot.val().title,
                        content: childSnapshot.val().content,
                        visible: childSnapshot.val().visible,
                        created_at: (new Date(childSnapshot.val().created_at)).toString().replace("GMT-0300 (Horário Padrão de Brasília)", ''),
                        slug: childSnapshot.val().slug
                    }
                items.push(post);
                })
                items.reverse();
                setPostData(items);

    }) 
})

    return (
        <>
        <Table responsive>
            <thead>
                <tr>
                    <th>Key</th>
                    <th>Title</th>
                    <th>Date</th>
                    <th>url</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {postData.map(post => {
            return (
                <tr>
                    <td>{post[0]}</td>
                    <td>{post[1]}</td>
                    <td>{post[3]}</td>
                    <td>{post[5]}</td>
                    <td><Button variant="link" onClick={() => handleDeletePost(post[0])}>Delete</Button><Button variant="link">Edit</Button></td>
                </tr>
            )
         })}
            
            </tbody>
        </Table>
        <Button onClick={handleShowMore}>Show more</Button>
        {error && <p>{error}</p>}
        </>
    )
}