import React from 'react';

import Points from './Points';

const PlaySide = ({ users }) => (
    <>
    
        <div className="row">
            {users.map((users) => (
                    <div key={users.id} className="col-12 ">
                    <div className={users.activePlayer == users.rollId ? 'player-box' : 'player-box opacity'}>
                        <h3 className="text-center mt-2">{users.name}</h3>
                        
                        <Points currentPoints={users.currentPoints} allPoints={users.allPoints}/>
                    </div>
                    <hr></hr>       
                </div>
                
            ))}
        </div>
      
       
  </> 
)

export default PlaySide;