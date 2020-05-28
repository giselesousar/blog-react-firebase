import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from '../providers/UserProvider';


export default function Profile(){
    const user = useContext(UserContext);
    return(
        <>
        {user ? <h1>{`Olá, ${user.firstName}!`}</h1> : <Redirect to="/"/>}
        </>
        
    )
}