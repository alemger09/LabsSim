import { useState, useEffect } from 'react';

export function useProgress(experimentId, language) {
  const [theoryComplete, setTheoryComplete] = useState(false);
  const [tasksComplete, setTasksComplete] = useState(false);
  const [testScore, setTestScore] = useState(null);
  const [testPassed, setTestPassed] = useState(false);

  useEffect(() => {
    const theoryKey = `labsim_theory_${experimentId}_${language}`;
    const tasksKey = `labsim_tasks_${experimentId}`;
    const testKey = `labsim_test_${experimentId}_best`;

    setTheoryComplete(localStorage.getItem(theoryKey) === 'true');
    setTasksComplete(localStorage.getItem(tasksKey) === 'true');
    setTestScore(parseInt(localStorage.getItem(testKey)) || null);
    setTestPassed(testScore >= 3);
  }, [experimentId, language, testScore]);

  const markTheoryComplete = () => {
    const key = `labsim_theory_${experimentId}_${language}`;
    localStorage.setItem(key, 'true');
    setTheoryComplete(true);
  };

  const markTaskComplete = (taskId) => {
    const key = `labsim_tasks_${experimentId}`;
    localStorage.setItem(key, 'true');
    setTasksComplete(true);
  };

  const saveTestScore = (score) => {
    const key = `labsim_test_${experimentId}_best`;
    localStorage.setItem(key, score.toString());
    setTestScore(score);
    setTestPassed(score >= 3);
  };

  const resetProgress = () => {
    const theoryKey = `labsim_theory_${experimentId}_${language}`;
    const tasksKey = `labsim_tasks_${experimentId}`;
    const testKey = `labsim_test_${experimentId}_best`;
    localStorage.removeItem(theoryKey);
    localStorage.removeItem(tasksKey);
    localStorage.removeItem(testKey);
    setTheoryComplete(false);
    setTasksComplete(false);
    setTestScore(null);
    setTestPassed(false);
  };

  const overallProgress = (theoryComplete ? 33 : 0) + (tasksComplete ? 33 : 0) + (testPassed ? 34 : 0);

  return {
    theoryComplete,
    tasksComplete,
    testScore,
    testPassed,
    overallProgress,
    markTheoryComplete,
    markTaskComplete,
    saveTestScore,
    resetProgress
  };
}