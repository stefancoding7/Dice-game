import React, { useEffect } from 'react';
import UseSound from 'use-sound';



   

const Controllers = ( { roll, hold, users, hideButton, playShake } ) => { 

  
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
            
        </div>
    )
        
}  


export default Controllers;