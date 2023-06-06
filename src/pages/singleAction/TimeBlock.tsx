import React, { useState } from 'react';
import { Button } from 'rsuite';
import Stopwatch from './Stopwatch';
import { endAction, startAction } from '@/http/api';

export const TimeBlock = props => {
  const [time, setTime] = useState(0);
  const [actionId, setActionId] = useState(0);

  // state to check stopwatch running or not
  const [isRunning, setIsRunning] = useState(false);

  // Method to start and stop timer
  const startAndStop = () => {
    if (!isRunning) {
      reset();
      startAction(3, props.taskId).then(data => {
        setActionId(data.id);
        props.updateParent(prevState => !prevState);
      });
    } else endAction(actionId).then(data => props.updateParent(prevState => !prevState));
    console.log(actionId);

    setIsRunning(!isRunning);
  };

  // Method to reset timer back to 0
  const reset = () => {
    setTime(0);
  };
  return (
    <div style={{ padding: '2em 0' }}>
      <Stopwatch
        time={time}
        setTime={setTime}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
      ></Stopwatch>
      <div style={{ gap: '1em', display: 'flex', justifyContent: 'center' }}>
        <Button appearance="primary" onClick={startAndStop}>
          {isRunning ? 'Стоп' : 'Старт'}
        </Button>
        {/* <Button appearance="ghost" onClick={reset}>
          Выполнено
        </Button> */}
      </div>
    </div>
  );
};
