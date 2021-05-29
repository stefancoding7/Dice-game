import React, { useReducer, useState } from 'react';
import CountUp  from 'react-countup';


const Points = ({ 
    currentPoints, 
    allPoints, 
    maxscore, 
    doubleCount, 
    userrolling, 
    doubleUse, 
    showDouble 
}) => {
    
    const currentPoint = (num) => {
       
        const totalScores = num.reduce(
            (previousScore, currentScore, index)=>previousScore+currentScore, 
            0);
            return totalScores
    }
    
    const summedCurrentPoints = currentPoint(currentPoints);
   // console.log(typeof summedCurrentPoints);
    
    let countMiniImg = [];
    for(let i = 0; i < doubleCount.length; i++){
        countMiniImg = <img className="double-mini rounded-pill" alt="..." src={process.env.PUBLIC_URL + `/img/dice-img/dice-9.png`} />
    }
    
   console.log(`show double ${showDouble}`);
    return (
    <>            
        <div className="all-score text-center">
            <h1>{allPoints} - {maxscore}</h1>
        </div>
        <div className="current-box mt-3">
            <div className="current-box-line text-center ">
            <h5 className="position-relative">
            Current <span className="ml-2 position-absolute top-0 start-100 translate-middle badge rounded-pill current-text  ">
                        {
                        doubleCount.length <= 2 ?     
                        
                        doubleCount.map((value, index) => {
                                return <img onClick={e => doubleUse(e)} key={index} className="double-mini mr-1" alt="..." src={process.env.PUBLIC_URL + `/img/dice-img/dice-9.png`} />
                        
                        })
                        
                        :
                            ''
                        }
                <span className="visually-hidden"></span></span>
            </h5>

                
                   
                    <div className="double-mini-icon-box">
                        
                    </div>
                
                
            </div>
            

            <div className="current-score-box shadow-lg" >
          
                <h2 className="text-center"> <CountUp end={summedCurrentPoints} duration={1} /></h2>
                {doubleCount.length >= 3 && showDouble ?
                        <div className="double-button-box">
                            <img onClick={e => doubleUse(e)} className="double-button-img mr-1" alt="..." src={process.env.PUBLIC_URL + `/img/dice-img/dice-9.png`} />
                        </div>
                        :
                        ''
                    }
            </div>
        </div>

        
     
    </>
    )
    
}

export default Points;