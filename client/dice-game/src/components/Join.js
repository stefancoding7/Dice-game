import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Join = () => {
    const [room, setRoom] = useState(Math.floor(Math.random() * 100000000000000));
    console.log(room);
    
    

    return (
      <div className="container-fluid">
        <div className="row">
            <div className="col mb-5 mt-5">
                <h1 className="text-center">Dice Game</h1>
            </div>
        </div>
        <div className="d-flex justify-content-center">
            <img className="dice-img" src={process.env.PUBLIC_URL + '/img/dice-png-30.png'} /> 
        </div>
        
           
        <div className="row" >
        
            <div className="col-sm-12  text-center mt-5">
                <h5>Play insteat with your friend</h5>
                <Link to={`/play?room=${room}`}>
                    <button type="button" className="btn btn-outline-secondary btn-lg w-50">Play</button>
                </Link>
            </div>
        </div>
          
           
      </div>
        
    )
}

export default Join;