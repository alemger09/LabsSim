import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { LESSONS } from '../../data/lessons';
import { useI18n } from '../../i18n/I18nContext';
import { useProgress } from '../../hooks/useProgress';
import DiagramPlaceholder from '../DiagramPlaceholder';

export default function TheoryReader({ experimentId }) {
  const { t, locale } = useI18n();
  const { theoryComplete, markTheoryComplete } = useProgress(experimentId, locale);
  const [currentSection, setCurrentSection] = useState(0);
  const [readTime, setReadTime] = useState(0);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);

  const lesson = LESSONS[experimentId];
  if (!lesson) return <div>No lesson found</div>;

  const sections = lesson.theory.sections;
  const current = sections[currentSection];

  useEffect(() => {
    const timer = setInterval(() => setReadTime(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (readTime >= 15 || scrolledToBottom) {
      // Mark as read
    }
  }, [readTime, scrolledToBottom]);

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      setReadTime(0);
      setScrolledToBottom(false);
    } else {
      markTheoryComplete();
      confetti();
    }
  };

  if (theoryComplete) {
    return <div>Theory complete!</div>;
  }

  return (
    <div className="theory-reader">
      <div className="progress-bar">
        Section {currentSection + 1} of {sections.length}
      </div>
      <h2>{current.heading[locale]}</h2>
      <div className="body" onScroll={(e) => {
        if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
          setScrolledToBottom(true);
        }
      }}>
        {current.body[locale]}
      </div>
      {current.visual && <DiagramPlaceholder name={current.visual} />}
      {current.keyTerms.map(term => (
        <details key={term.term.en}>
          <summary>{term.term[locale]}</summary>
          <p>{term.definition[locale]}</p>
        </details>
      ))}
      <button onClick={nextSection} disabled={!(readTime >= 15 || scrolledToBottom)}>
        Next
      </button>
    </div>
  );
}