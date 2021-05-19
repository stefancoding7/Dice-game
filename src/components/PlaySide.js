import React, { useEffect, useState} from 'react';

import CopyToClipboard from 'react-copy-to-clipboard';
import Points from './Points';

const PlaySide = ({ users, maxscore, urlname, room, winner, playAgain, playSound }) => {
    
    



    const [linkToSend, setLinkToSend] = useState('');
    const [onCopy, setOnCopy] = useState(false);
    

    const playEffect = (word) => {
        const audio = new Audio(`${process.env.PUBLIC_URL}/sound/${word}.mp3`)
        playSound[0] ? audio.play() : audio.pause()
    }

    useEffect(() => {
        if(playSound[1] == 'shake'){
            playEffect('shake')
        } else if (playSound[1] == 'fart') {
            playEffect('fart')
        } else if (playSound[1] == 'scissors') {
            playEffect('scissors')
        } else if (playSound[1] == 'double') {
            playEffect('double')
        } else if (playSound[1] == 'double-ones') {
            playEffect('double-ones')
        } else if (playSound[1] == 'hold') {
            playEffect('hold')
        } else if (playSound[1] == 'winner') {
            playEffect('winner')
        } 
    }, [playSound])
   
   // console.log(`playshake ${playSound}`);




   const setCopy = () => {
       setOnCopy(true);
   }
   
   const percent = (partialValue, totalValue) => {
        const perc =  ((100 * partialValue) / totalValue);
        console.log(perc);
        return perc;

   }

      return (
            <>
        {!winner[0] ?
        <>
            <div className="row">
            
            {users.map((user) => (
                    
                    <div key={user.id} className="col-12 ">
                    <div className={user.activePlayer == user.rollId ? 'player-box' : 'player-box opacity'} style={{backgroundImage: `linear-gradient(90deg, #FF6347 ${percent(user.allPoints, maxscore)}%, transparent 0%)`}}>
                        <h3 className="text-center mt-2" >{user.name}</h3>
                     
                        
                        <Points currentPoints={user.currentPoints} allPoints={user.allPoints} maxscore={maxscore} doubleCount={user.doubleCount} userrolling={user.rolling}/>
                        <div className="dice-img-box d-flex justify-content-center mt-3">
                     
                            {user.currentPoints.length >= 2 && !user.rolling && !user.scissors && !user.double ?
                            <> 
                                <img className="dice-img " alt="..." src={process.env.PUBLIC_URL + `/img/dice-img/dice-${user.currentPoints[user.currentPoints.length - 1]}.png`} /> 
                            </>
                            : ''}

                            {user.rolling ?
                            <> 
                                <img className="dice-img  fadein" alt="..." src={process.env.PUBLIC_URL + `/img/dice-img/loading.gif`} /> 
                            </>
                            : ''}

                            {user.scissors ? 
                                <> 
                                <img className="dice-img" alt="..." src={process.env.PUBLIC_URL + `/img/dice-img/dice-8.png`} /> 
                            </>
                            : ''
                            }

                            {user.double  ? 
                                <> 
                                <img className={playSound[1] == 'double-ones' ? 'dice-img' : 'dice-img flash'}  alt="..." src={process.env.PUBLIC_URL + `/img/dice-img/dice-9.png`} /> 
                            </>
                            : ''
                            }

                            {user.fart ? 
                                <> 
                                <img className="dice-img" alt="..." src={process.env.PUBLIC_URL + `/img/dice-img/dice-7.png`} /> 
                            </>
                            : ''
                            }
                        </div>
                    </div>
                    <hr></hr>
                    {users.length <= 1 ? 
                    <>
                        <div className="inivte-box ">
                        <div className="row d-flex flex-row justify-content-center">
                            <div className="col-12">
                                <h6 className="inivite-text text-center">Click to the button to copy the link, than send to your friend</h6>
                            </div>
                       
                            
                            
                                <div className="mt-3">
                                <CopyToClipboard text={`http://192.168.0.21:3000/invite?name=${user.name}&maxscore=${user.maxscore}&room=${room}`} onCopy={setCopy}>
                                {!onCopy ? 
                                    <button type="button" className="btn btn-danger btn-lg rounded-pill mt-2">Invite friend</button>
                                    :
                                    <button type="button" className="btn btn-danger btn-lg rounded-pill mt-2">Link Copied <span> <img className="link-done-icon rounded-pill" alt="..." src={process.env.PUBLIC_URL + `/img/outline_done_black_24dp.png`} /> </span></button>                               }
                                   
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
        : 
        <>
        <div className="container-fluid">
        <div className="row">
            <div className="col mb-5 mt-5">
                <h1 className="text-center"><b>{winner[1]}</b> won</h1>
            </div>
        </div>
        <div className="d-flex justify-content-center">
            <img className="dice-img-join" alt="..." src={process.env.PUBLIC_URL + '/img/winner.jpg'} /> 
        </div>
        
           
        <div className="row">
        
            <div className="col-sm-12  text-center mt-5">
                    <button onClick={e => playAgain(e)} type="button" className="btn btn-outline-secondary btn-lg w-50 rounded-pill">Play again</button>
               
            </div>
        </div>
          
           
      </div>
        </>
        
        
        
        }
        
      
       
  </> 
      )
    
}

export default PlaySide;