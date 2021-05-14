import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState(Math.floor(Math.random() * 100000000000000));
    const [maxscore, setMaxScore] = useState(0)
    
    
    

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
        
            <div className="col-12 text-center mt-5">
                <h5>Play insteat with your friend</h5>
                <div class="form-group">
                    <div className="mb-3 d-flex justify-content-center">
                
                        <input type="text" className="form-control rounded-pill w-80 text-center"  placeholder="Your player name" onChange={event => setName(event.target.value)}/>
                    </div>
                    <div className="mb-3 selectWrapper">
                        <select className="form-control form-select-lg selectBox rounded-pill" aria-label=".form-select-lg" onChange={event => setMaxScore(event.target.value)}  value={maxscore}>
                            <option >Select max points</option>
                            <option value="10">10 points</option>
                            <option value="20">20 points</option>
                            <option value="30" selected>30 points</option>
                            <option value="40">40 points</option>
                            <option value="50">50 points</option>
                            <option value="60">60 points</option>
                            <option value="70">70 points</option>
                            <option value="80">80 points</option>
                            <option value="90">90 points</option>
                            <option value="100">100 points</option>
                        </select>
                    </div>
                </div>
               
                <Link onClick={event => (!name) ? event.preventDefault() : null} to={`/play?name=${name}&maxscore=${maxscore}&room=${room}`}>
                    <button type="button" className="btn btn-outline-secondary btn-lg w-50 rounded-pill">Play</button>
                </Link>
            </div>
        </div>
          
           
      </div>
        
    )
}

export default Join;