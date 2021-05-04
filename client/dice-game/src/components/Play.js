import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

const Play = ({ location }) => {
    const [room, setRoom] = useState('');
    const ENDPOINT = 'http://localhost:5000';
    useEffect(() => {
        const { room } = queryString.parse(location.search);

        socket = io(ENDPOINT, {
            withCredentials: true,
        });
        setRoom(room);

        socket.emit('join', { room })

        console.log(socket);

        return () => {
            socket.emit('disconnect');

            socket.off();
        }
    }, [ENDPOINT, location.search])

    return (
        <div className="container-fluid">
        <div className="row">
            <div className="col mb-5 mt-5">
                <h1 className="text-center">Play</h1>
            </div>
        </div>
       
        
           
        <div className="row" >
        
            <div className="col-sm-12  text-center mt-5">
                <h5>Room {room}</h5>
                
            </div>
           
        </div>
        <div className="row" >
        
        <div className="col-sm-12  text-center mt-5">
            <h5></h5>
            <Link to={`/`}>
                <button type="button" className="btn btn-outline-secondary btn-lg w-50">Back</button>
            </Link>
        </div>
    </div>
       
           
      </div>
    )
}

export default Play;