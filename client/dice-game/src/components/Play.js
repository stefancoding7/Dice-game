import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import PlaySide from './PlaySide';
import Controllers from './Controllers';
import InvitedPerson from './InvitedPerson';





let socket;

const Play = ({ location }) => {
    const [room, setRoom] = useState('');
    const [name, setName] = useState('');
    const [maxscore, setMaxScore] = useState(0);
    const [users, setUsers] = useState([]);
    const [hideButton, setHideButton] = useState(true)
    const [currentPoints, setCurrentPoints] = useState([]);
    const [winner, setWinner] = useState([]);
    const [error, setError] = useState('');

    // sound effects
    const [playShake, setPlayShake] = useState(false)
    

    const ENDPOINT = 'http://192.168.0.21:5000';
    useEffect(() => {
        const { name, room, maxscore } = queryString.parse(location.search);
        
        socket = io(ENDPOINT, {
            withCredentials: true,
        });
        
        setRoom(room);
        setName(name);
        setMaxScore(maxscore);
        socket.emit('join', { name, room, maxscore }, () => {

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
        
        
        socket.on("winner", ({ winner }) => {
          setWinner(winner);
        });
        
    }, [winner]);

    useEffect(() => {
       
        socket.on('hideButton', ({ hideButton }) => {
            setHideButton(hideButton)
        })
    }, [])

    useEffect(() => {
      socket.on('error', ({ error }) => {
        setError(error)
      })
    }, [])

    useEffect(() => {
      socket.on('playShake', ({ playShake }) => {
        setPlayShake(playShake);
      })
    }, [])

    const roll = (e) => {

        e.preventDefault();
        socket.emit('roll', 'roll');
       
      }

      const hold = (e) => {
        e.preventDefault();
        socket.emit('hold', 'hold')
      }

      const playAgain = (e) => {
        e.preventDefault();
        //  console.log('clicked');
         socket.emit('playagain', { playAgain: true })
      }

      console.log(error);
    return (
        <div className="container-fluid">   
            <PlaySide users={users} maxscore={maxscore} room={room} winner={winner} playAgain={playAgain}/>
            <Controllers roll={roll} hold={hold} users={users} hideButton={hideButton} playShake={playShake}/>  
            
      </div>
    )
}

export default Play;