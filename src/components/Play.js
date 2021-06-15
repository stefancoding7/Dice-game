import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import PlaySide from './PlaySide';
import Controllers from './Controllers';
import InvitedPerson from './InvitedPerson';




/***
 * ------------------CONFIG-------------------------------------------
 * Change this url to your domain address. 
 * @linkUrl - Uncomment for developer mode
 */
const url = {
  baseUrl: 'http://localhost', //base url without a port for example http://localhost
  linkUrl: 'http://localhost:3000'
}
/***
 * ----------------CONFIG END -------------------------------------
 */

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
    const [smile, setSmile] = useState(1);
    
    
    // sound effects
    const [playSound, setPlaySound] = useState([false])
    

    const ENDPOINT = `${url.baseUrl}:5000`;
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

      const changeSmile = (value) => {
        setSmile(value);
        console.log(smile);
      }

      const jointToRoom = (e) => {
        e.preventDefault();
       
        socket.emit('joinToRoom', { jointToRoom: true })
      }
      
    
     
  /***
   * Get users from all room stats
   */
    
     // console.log(`Show doube ${showDouble}`);


    return (
        <div className="container-fluid">   
            <PlaySide 
            users={users} 
            maxscore={maxscore} 
            room={room} 
            winner={winner} 
            playAgain={playAgain} 
            playSound={playSound} 
            doubleUse={doubleUse} 
            showDouble={showDouble} 
            changeSmile={changeSmile}
            jointToRoom={jointToRoom}  
            jointToRoom={jointToRoom}
            url={url}
            />

            <Controllers 
            roll={roll} 
            hold={hold} 
            users={users} 
            hideButton={hideButton} 
            doubleUse={doubleUse}  
            showDouble={showDouble}
              
            />  
            
      </div>
    )
}

export default Play;