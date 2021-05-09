import React from 'react';



const Points = ({ currentPoints, allPoints }) => {
    const currentPoint = (num) => {
        const totalScores = num.reduce(
            (previousScore, currentScore, index)=>previousScore+currentScore, 
            0);
            return totalScores
    }
    
   
    return (
    <>            
        <div className="all-score text-center">
                            <h1>{allPoints}</h1>
                        </div>
        <div className="current-box text-center mt-3">
            <h6 className="p-2">Current</h6>
            <div className="current-score-box shadow-lg">
                <h2 className="text-center">{currentPoint(currentPoints)}</h2>
            </div>
        </div>
    </>
    )
    
}

export default Points;