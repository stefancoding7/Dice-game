import React, { useReducer, useState } from 'react';
import CountUp  from 'react-countup';


const Points = ({ currentPoints, allPoints, maxscore, doubleCount, userrolling }) => {


    const currentPoint = (num) => {
       
        const totalScores = num.reduce(
            (previousScore, currentScore, index)=>previousScore+currentScore, 
            0);
            return totalScores
    
    
    }
    
    const summedCurrentPoints = currentPoint(currentPoints);
    console.log(typeof summedCurrentPoints);
    
    
    
   
    return (
    <>            
        <div className="all-score text-center">
                            <h1>{allPoints} - {maxscore}</h1>
                        </div>
        <div className="current-box text-center mt-3">
            <h6 className="p-2">Current <span >{doubleCount.length == 1 ? <> 
                                <img className="double-mini rounded-pill" alt="..." src={process.env.PUBLIC_URL + `/img/dice-img/dice-9.png`} /> 
                            </> : ''}</span></h6>
          
            <div className="current-score-box shadow-lg" >
          
                <h2 className="text-center"> <CountUp end={summedCurrentPoints} duration={1} /></h2>
            </div>
        </div>

        
     
    </>
    )
    
}

export default Points;