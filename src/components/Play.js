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
    const [smile, setSmile] = useState(1);
    

    // sound effects
    const [playSound, setPlaySound] = useState([false])
    

    const ENDPOINT = 'https://fart-game.herokuapp.com/';
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
            changeSmile={changeSmile}/>

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