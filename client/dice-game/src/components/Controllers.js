import React, { useEffect } from 'react';
import UseSound from 'use-sound';



   

const Controllers = ( { roll, hold, users, hideButton, playShake } ) => { 
    console.log(`${playShake}`);

    
        let shake = document.getElementsByClassName("audio-element")[0]
       
           if(playShake) {
                shake.play()
           }
           
      
   
    
        
      
    
    
   // console.log(Object.keys(users));
  // console.log(user.name);
 
    return ( 
        <div className="button-group mb-3">

            <div className="row">
                <div className="d-flex justify-content-between">
                
                    <>
                   
                   { !hideButton ?
                    <>
                    <div className="col-4">
                            <button key={users.id} onClick={e => roll(e)} type="button" className="btn btn-danger btn-lg rounded-pill">Roll</button>
                        </div>
                        <div className="col-4">
                            <button key={users.id} onClick={e => hold(e)} type="button" className="btn btn-danger btn-lg rounded-pill">Hold</button>
                        </div>
                        
                       </>
                     :  ''}
                     <div className="col-4">
                        <a href="/" className="btn btn-danger btn-lg rounded-pill">Exit</a>
                    </div>
                     </>
                  
                  
                
                   
                    
                </div>
                   
                        
            </div>
            <audio className="audio-element">
                <source src="http://192.168.0.21:3000/sound/shake.mp3"></source>
            </audio>
        </div>
    )
        
}  


export default Controllers;