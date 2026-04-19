import { useState, useEffect, useRef } from 'react';

export function useGraphRecorder(experimentKey, simState, running) {
  const [graphData, setGraphData] = useState([]);
  const intervalRef = useRef(null);

  const getXY = (experimentKey, simState) => {
    switch (experimentKey) {
      case 'acidBase':
        return { x: simState.volume || 0, y: simState.ph || 7 };
      case 'circuitOhm':
        return { x: simState.voltage || 0, y: simState.current || 0 };
      case 'pendulum':
        return { x: simState.elapsedSeconds || 0, y: simState.period || 0 };
      case 'projectile':
        return { x: simState.elapsedSeconds || 0, y: simState.height || 0 };
      case 'spring':
        return { x: simState.elapsedSeconds || 0, y: simState.displacement || 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        const { x, y } = getXY(experimentKey, simState);
        setGraphData(prev => [...prev, { x, y }]);
      }, 500);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [running, experimentKey, simState]);

  const addSnapshot = (label) => {
    const { x, y } = getXY(experimentKey, simState);
    setGraphData(prev => [...prev, { x, y, label }]);
  };

  const clearGraph = () => {
    setGraphData([]);
  };

  return { graphData, addSnapshot, clearGraph };
}