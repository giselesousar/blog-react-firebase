import React from 'react';
//import Routes from './routes';
import UserProvider from './providers/UserProvider';

import './global.css'
import Routes from './routes';

function App() {
  return (
    <UserProvider>
      <Routes/>
    </UserProvider>
  );
}

export default App;
