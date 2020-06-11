import React, { createContext, useState, useEffect } from "react";
import { firebaseAuth } from '../Firebase/firebaseUtils';


export const UserContext = createContext({ user: null });

function UserProvider(props){

    const [user, setUser] = useState(null);

  
    useEffect(() => {
        firebaseAuth.onAuthStateChanged(function(user) {
            if (user) {
                setUser(user);
            }
          });
    })


  return (
      <UserContext.Provider value={user}>
        {props.children}
      </UserContext.Provider>
    );
}

export default UserProvider;