import { useState, useEffect } from 'react';
import { LESSONS } from '../../data/lessons';
import { useProgress } from '../../hooks/useProgress';
import { useI18n } from '../../i18n/I18nContext';

export default function SimulateTasks({ experimentId, simState }) {
  const { locale } = useI18n();
  const { markTaskComplete } = useProgress(experimentId, locale);
  const [completedTasks, setCompletedTasks] = useState([]);

  const lesson = LESSONS[experimentId];
  const tasks = lesson?.simulateTasks || [];

  useEffect(() => {
    tasks.forEach(task => {
      if (task.completionCondition(simState) && !completedTasks.includes(task.id)) {
        setCompletedTasks(prev => [...prev, task.id]);
        markTaskComplete(task.id);
      }
    });
  }, [simState, tasks, completedTasks, markTaskComplete]);

  return (
    <div className="simulate-tasks">
      {tasks.map(task => (
        <div key={task.id} className={`task ${completedTasks.includes(task.id) ? 'completed' : ''}`}>
          <p>{task.instruction[locale]}</p>
          <details>
            <summary>Hint</summary>
            {task.hint[locale]}
          </details>
        </div>
      ))}
    </div>
  );
}