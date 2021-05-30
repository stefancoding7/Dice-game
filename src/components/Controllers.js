import React, { useEffect } from 'react';
import UseSound from 'use-sound';



   

const Controllers = ( { roll, hold, users, hideButton, playShake, doubleUse, showDouble } ) => { 

  
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
                        <a href="/" className="btn btn-danger btn-lg rounded-pill">Exit</a>
                    </div>
                    
                     </>
                  
                  
                
                   
                    
                </div>
                   
                        
            </div>
            
        </div>
    )
        
}  


export default Controllers;