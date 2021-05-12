import React, { useEffect, useState} from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import Points from './Points';

const PlaySide = ({ users, maxscore, urlname, room }) => {
    const [linkToSend, setLinkToSend] = useState('');
    const [onCopy, setOnCopy] = useState(false);
    console.log(room)



   const setCopy = () => {
       setOnCopy(true);
   }

      return (
            <>
    
        <div className="row">
            
            {users.map((user) => (
                    
                    <div key={user.id} className="col-12 ">
                    <div className={user.activePlayer == user.rollId ? 'player-box' : 'player-box opacity'}>
                        <h3 className="text-center mt-2">{user.name}</h3>
                        {console.log(user.name)}    
                        
                        <Points currentPoints={user.currentPoints} allPoints={user.allPoints} maxscore={maxscore}/>
                        <div className="dice-img-box d-flex justify-content-center mt-3">
                        {console.log(`User name: ${user.name}, user active: ${user.activePlayer}, user rollId: ${user.rollId}`)}
                            {user.currentPoints.length >= 2  ?
                            <> 
                                <img className="dice-img rounded-pill" alt="..." src={process.env.PUBLIC_URL + `/img/dice-img/dice-${user.currentPoints[user.currentPoints.length - 1]}.png`} /> 
                            </>
                            : ''}

                            {user.rolling ?
                            <> 
                                <img className="dice-img rounded-pill fadein" alt="..." src={process.env.PUBLIC_URL + `/img/dice-img/loading.gif`} /> 
                            </>
                            : ''}
                        </div>
                    </div>
                    <hr></hr>
                    {users.length <= 1 ? 
                    <>
                        <div className="inivte-box d-flex flex-row justify-content-center">
                        <div className="row">
                            <div className="col-12">
                                <h6 className="inivite-text text-center">Click to the button to copy the link, than send to your friend</h6>
                            </div>
                       
                            
                            
                                <div className="col-4">
                                <CopyToClipboard text={`http://192.168.0.21:3000/invite?name=${user.name}&maxscore=${user.maxscore}&room=${room}`} onCopy={setCopy}>
                                {!onCopy ? 
                                    <button type="button" className="btn btn-danger btn-lg rounded-pill mt-2">Invite friend</button>
                                    :
                                    <button type="button" className="btn btn-danger btn-lg rounded-pill mt-2">Link Copied</button>                               }
                                   
                                </CopyToClipboard>
                                
                                </div>
                            </div>
                        </div>
                        
        
       
                   
                    </>
                     : ''}       
                </div>
                
            ))}
        </div>
      
       
  </> 
      )
    
}

export default PlaySide;