import React, { useState } from 'react';
import './App.css';
import Login from './components/auth/Login';
import UserDetail from './components/user/UserDetail';
import NoteList from './components/note/NoteList';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));

    return (
        <div>
            {!isAuthenticated ? 
                <Login /> : 
                <div>
                    <UserDetail />
                    <NoteList />
                </div>
            }
        </div>
    );
};

export default App;
