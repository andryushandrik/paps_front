import React, { useEffect } from 'react';
const Stopwatch = (props) => {
  // state to store time
  

  useEffect(() => {
    let intervalId;
    if (props.isRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => props.setTime(props.time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [props.isRunning, props.time]);

  // Hours calculation
  const hours = Math.floor(props.time / 360000);

  // Minutes calculation
  const minutes = Math.floor((props.time % 360000) / 6000);

  // Seconds calculation
  const seconds = Math.floor((props.time % 6000) / 100);

  // Milliseconds calculation
  const milliseconds = props.time % 100;




  return (
      <div style={{padding: "2em 0"}}>
        <p style={{textAlign:"center", padding:"2em", fontWeight:"bold", fontSize:"1.5em"}}>
          {hours}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}:
          {milliseconds.toString().padStart(2, '0')}
        </p>
      </div>
  );
};

export default Stopwatch;
