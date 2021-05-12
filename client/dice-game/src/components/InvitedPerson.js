import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

const InvitedPerson = ({ location }) => {
    const [room, setRoom] = useState('');
    const [name, setName] = useState('');
    const [inivtedPlayerName, setInivtedPlayerName] = useState('');
    const [maxscore, setMaxScore] = useState(0);
    
    useEffect(() => {
        console.log('halliii')
        const { room, maxscore, name } = queryString.parse(location.search);
        setRoom(room);
        setMaxScore(maxscore);
        setName(name);
    })

    return (
        <div className="container-fluid">
        <div className="row">
            <div className="col mb-5 mt-5">
                <h1 className="text-center">Dice Game</h1>
            </div>
        </div>
        <div className="d-flex justify-content-center">
            <img className="dice-img-join rounded-pill" alt="..." src={process.env.PUBLIC_URL + '/img//dice-img/loading.gif'} /> 
        </div>
        
           
        <div className="row">
        
            <div className="col-sm-12  text-center mt-5">
                <p><b>{name}</b> invited you to play this awesome dice game.</p>
                <p>Max score: <b>{maxscore}</b></p>
                <div className="mb-3 d-flex justify-content-center">
               
                    <input type="text" className="form-control rounded-pill w-80 text-center"  placeholder="Your player name" onChange={event => setInivtedPlayerName(event.target.value)}/>
                </div>
              
               
                <Link onClick={event => (!inivtedPlayerName) ? event.preventDefault() : null} to={`/play?name=${inivtedPlayerName}&maxscore=${maxscore}&room=${room}`}>
                    <button type="button" className="btn btn-outline-secondary btn-lg w-50 rounded-pill">Join with {name}</button>
                </Link>
            </div>
        </div>
          
           
      </div>
    )
}

export default InvitedPerson;