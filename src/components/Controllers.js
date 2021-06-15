import React, { useEffect, useState } from 'react';
import UseSound from 'use-sound';
import { confirmAlert } from 'react-confirm-alert'; // Import



   

const Controllers = ( { roll, hold, users, hideButton, playShake, doubleUse, showDouble } ) => { 

    const [askBefore, setAskBefore] = useState(false);

    const changeAskBefore = () => {

        
       
        alert("Are you sure?");
        window.location.href = "/";
        return askBefore ? setAskBefore(false) : setAskBefore(true); 
    }
  
    return ( 
        <div className="button-group mb-3">

            <div className="row">
                <div className="d-flex justify-content-between">
                
                    <>
                   
                   { !hideButton ?
                    <>
                    <div className="col">
                            <button key={users.id} onClick={e => roll(e)} type="button" className="btn btn-danger btn-lg rounded-pill">Roll</button>
                        </div>
                        <div className="col">
                            <button key={users.id} onClick={e => hold(e)} type="button" className="btn btn-danger btn-lg rounded-pill">Hold</button>
                        </div>
                        
                    {showDouble ? 
                        <div className="col">
                            <button key={users.id} onClick={e => doubleUse(e)} type="button" className="btn btn-danger btn-lg rounded-pill pr-4 pl-4 p-1">
                                <img  className="double-button-img" alt="..." src={process.env.PUBLIC_URL + `/img/dice-img/dice-9.png`} />
                            </button>
                        </div>
                     :
                     ''
                     }
                       </>
                    
                     :  ''}
                   
                     
                            
                        
                     <div className="col">
                     {
                       askBefore ? 
                       ''
                       
                        : <button onClick={changeAskBefore} className="btn btn-danger btn-lg rounded-pill">Exit</button>
                   }
                        
                    </div>
                    
                     </>
                  
                  
                
                   
                    
                </div>
                   
                        
            </div>
            
        </div>
    )
        
}  


export default Controllers;