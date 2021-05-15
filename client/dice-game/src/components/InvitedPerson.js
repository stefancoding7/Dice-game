import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

const InvitedPerson = ({ location }) => {
    const [room, setRoom] = useState('');
    const [name, setName] = useState('');
    const [inivtedPlayerName, setInivtedPlayerName] = useState('');
    const [maxscore, setMaxScore] = useState(0);
    const [error, setError] = useState(false);
    const [rules, setRules] = useState(false);
    
    useEffect(() => {
        
        const { room, maxscore, name } = queryString.parse(location.search);
        setRoom(room);
        setMaxScore(maxscore);
        setName(name);
    }, [])
    
    

    return (
        <div className="container-fluid">
        {rules ? 
        <>
            <div className="row">
                <div className="col mb-5 mt-5">
                    <h1 className="text-center">Rules</h1>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <ul>
                    <li><b>Current</b> is your current number. Press <b>Hold</b> and you save your current number</li>
                    <li><span><img className="rules-img" alt="..." src={process.env.PUBLIC_URL + `/img/dice-img/dice-7.png`} /> </span> (fart) <b>lose</b> all your current points. And another player will continue on dice.</li>
                    <li><span><img className="rules-img" alt="..." src={process.env.PUBLIC_URL + `/img/dice-img/dice-8.png`} /> </span> (scissors) <b>cute half</b> your current points but you could continue on dice.</li>
                    <li><span><img className="rules-img" alt="..." src={process.env.PUBLIC_URL + `/img/dice-img/dice-9.png`} /> </span> (double) <b>roll double </b>twice and you double your current points.</li>
                    
                </ul>
            </div>
        </>
      :
      <>
        <div className="row">
                <div className="col mb-5 mt-5">
                    <h1 className="text-center">Fart Game</h1>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <img className="dice-img-join" alt="..." src={process.env.PUBLIC_URL + '/img//dice-img/loading.gif'} /> 
            </div>
      </>
      }
        
           
        <div className="row">
        
            <div className="col-sm-12  text-center mt-5">
                <p><b>{name}</b> invited you to play this awesome dice game.</p>
                <p>Max score: <b>{maxscore}</b></p>
                {error ? 
                    <div class="alert alert-danger" role="alert">
                        Please give your player name
                    </div>
                    :
                    ''
                }
                <div className="mb-3 d-flex justify-content-center">
               
                    <input type="text" className="form-control rounded-pill w-80 text-center"  placeholder="Your player name" onChange={event => setInivtedPlayerName(event.target.value)}/>
                </div>
              
              
                <Link onClick={event => (!inivtedPlayerName) ? event.preventDefault() + setError(true) : null + setError(false)} to={`/play?name=${inivtedPlayerName}&maxscore=${maxscore}&room=${room}`}>
                    <button type="button" className="btn btn-outline-secondary btn-lg w-50 rounded-pill">Join with {name}</button>
                </Link>
              

            
                
            
               
            </div>
        </div>
        <div className="rules-box mb-3">
        
        <div className="row">
            <div className="col">
                <button type="button" className="btn btn-outline-secondary rounded-pill btn-sm" onClick={() => rules ? setRules(false) : setRules(true)}>Rules</button>
            </div>
        </div>
        </div>
           
      </div>
    )
}

export default InvitedPerson;