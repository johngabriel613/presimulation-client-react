import React from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircularProgress = ({value, text}) => {
  return (
    <CircularProgressbarWithChildren 
      value={value}
      styles={buildStyles({
        // Rotation of path and trail, in number of turns (0-1)
        rotation: 1,
    
        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
        strokeLinecap: 'round',
    
        // Text size
        textSize: '16px',
    
        // How long animation takes to go from one percentage to another, in seconds
        pathTransitionDuration: .5,
    
        // Can specify path transition in more detail, or remove it entirely
        // pathTransition: 'none',
    
        // Colors
        pathColor: `#DD4F4F`,
        textColor: '#000',
        trailColor: 'rgba(255,255,255,0.2)',
        backgroundColor: '#fff',
      })}
    >
      <span className='text-4xl font-bold'>{value}%</span>
      <p className='text-lg'>{text}</p>
    </CircularProgressbarWithChildren> 
  )
}

export default CircularProgress
