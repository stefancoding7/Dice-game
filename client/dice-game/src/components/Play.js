import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import PlaySide from './PlaySide';
import Controllers from './Controllers';

let socket;

const Play = ({ location }) => {
    const [room, setRoom] = useState('');
    const [name, setName] = useState('');
    const [users, setUsers] = useState([]);
    const [hideButton, setHideButton] = useState(false)
    const [currentPoints, setCurrentPoints] = useState([]);

    const ENDPOINT = 'http://192.168.0.21:5000';
    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT, {
            withCredentials: true,
        });
        
        setRoom(room);
        setName(name)
        socket.emit('join', { name, room }, () => {

        })

        
        return () => {
            // socket.emit('disconnect');

            socket.off();
        }

    }, [ENDPOINT, location.search])

    useEffect(() => {
        
        
        socket.on("roomData", ({ users }) => {
          setUsers(users);
        });
        
    }, []);

    

    useEffect(() => {
       
        socket.on('hideButton', ({ hideButton }) => {
            setHideButton(hideButton)
        })
    })

    const roll = (e) => {

        e.preventDefault();

        socket.emit('roll', 'roll');
       
      }

      const hold = (e) => {
        e.preventDefault();
        socket.emit('hold', 'hold')
      }
    return (
        <div className="container-fluid">   
            <PlaySide users={users} />
            <Controllers roll={roll} hold={hold} users={users} hideButton={hideButton}/>  
      </div>
    )
}

export default Play;