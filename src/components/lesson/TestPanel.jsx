import { useState } from 'react';
import { LESSONS } from '../../data/lessons';
import { useProgress } from '../../hooks/useProgress';
import { useI18n } from '../../i18n/I18nContext';

export default function TestPanel({ experimentId }) {
  const { locale } = useI18n();
  const { theoryComplete, saveTestScore, testScore } = useProgress(experimentId, locale);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const lesson = LESSONS[experimentId];
  const questions = lesson?.test?.questions || [];

  if (!theoryComplete) {
    return <div>Complete theory first</div>;
  }

  if (showResult) {
    const score = Object.values(answers).filter(a => a.correct).length;
    return (
      <div>
        Score: {score}/{questions.length}
        {score >= lesson.test.passingScore ? 'Passed' : 'Try again'}
        <button onClick={() => saveTestScore(score)}>Save</button>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const handleAnswer = (answerId) => {
    const correct = answerId === question.correctAnswer;
    setAnswers(prev => ({ ...prev, [currentQuestion]: { answer: answerId, correct } }));
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="test-panel">
      <p>{question.question[locale]}</p>
      {question.options.map(option => (
        <button key={option.id} onClick={() => handleAnswer(option.id)}>
          {option.text[locale]}
        </button>
      ))}
    </div>
  );
}