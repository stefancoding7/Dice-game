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
    const [doubleUsed, setDoubleUsed] = useState([]);
    const [showDouble, setShowDouble] = useState(false);
    


    // sound effects
    const [playSound, setPlaySound] = useState([false])
    

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
        
    }, [users]);

    useEffect(() => {
        
        
        socket.on("winner", ({ winner }) => {
          setWinner(winner);
        });
        
    }, [winner]);

    useEffect(() => {
       
        socket.on('hideButton', ({ hideButton }) => {
            setHideButton(hideButton)
        })
    }, [hideButton])

    useEffect(() => {
      socket.on('error', ({ error }) => {
        setError(error)
      })
    }, [error])

    useEffect(() => {
      socket.on('playSound', ({ playSound }) => {
        setPlaySound(playSound);
      })
    }, [playSound])


    useEffect(() => {
      socket.on('showDouble', ({ showDouble }) => {
        setShowDouble(showDouble)
      })
    }, [showDouble])

    const doubleUse = (e) => {
        e.preventDefault()
        console.log('clicked');
        socket.emit('doubleUse', ({ doubleUse }))
    }

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

     
  /***
   * Get users from all room stats
   */
    
     // console.log(`Show doube ${showDouble}`);


    return (
        <div className="container-fluid">   
            <PlaySide users={users} maxscore={maxscore} room={room} winner={winner} playAgain={playAgain} playSound={playSound} doubleUse={doubleUse} showDouble={showDouble}/>
            <Controllers roll={roll} hold={hold} users={users} hideButton={hideButton}/>  
            
      </div>
    )
}

export default Play;