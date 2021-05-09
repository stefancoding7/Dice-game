import React from 'react';

const Controllers = ( { roll, hold, users, hideButton } ) => { 
   // console.log(Object.keys(users));
  // console.log(user.name);
 
    return ( 
        <div className="button-group mb-3">

            <div className="row">
                <div className="d-flex justify-content-between">
                
                    <>
                   { hideButton ?
                    <>
                    <div className="col-4">
                            <button key={users.id} onClick={e => roll(e)} type="button" className="btn btn-danger btn-lg rounded-pill">Roll</button>
                        </div>
                        <div className="col-4">
                            <button key={users.id} onClick={e => hold(e)} type="button" className="btn btn-danger btn-lg rounded-pill">Hold</button>
                        </div>
                       </>
                     :  ''}
                     </>
                  
                  
                
                   
                    <div className="col-4">
                        <a href="/" className="btn btn-danger btn-lg rounded-pill"> Back</a>
                    </div>
                </div>
                
                        
            </div>
        </div>
    )
        
}  


export default Controllers;