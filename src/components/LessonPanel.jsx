import { useState } from 'react';
import { useI18n } from '../i18n/I18nContext';

export default function LessonPanel({ lesson }) {
  const { t } = useI18n();
  const [openSection, setOpenSection] = useState(0);

  if (!lesson) {
    return (
      <section className="card lesson-panel">
        <h3>{t('lesson.title')}</h3>
        <p className="lesson-empty">{t('lesson.empty')}</p>
      </section>
    );
  }

  return (
    <section className="card lesson-panel">
      <div className="lesson-head">
        <h3>{t('lesson.title')}</h3>
        <span className="lesson-badge">{t('lesson.badge')}</span>
      </div>
      <p className="lesson-summary">{lesson.summary}</p>
      {lesson.objectives?.length ? (
        <div className="lesson-objectives">
          <h4>{t('lesson.objectivesTitle')}</h4>
          <ul>
            {lesson.objectives.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {lesson.sections?.length ? (
        <div className="lesson-sections">
          {lesson.sections.map((section, index) => (
            <div key={`${index}-${section.title}`} className="lesson-accordion-item">
              <button
                type="button"
                className={`lesson-accordion-trigger ${openSection === index ? 'open' : ''}`}
                onClick={() => setOpenSection(openSection === index ? -1 : index)}
              >
                <span>{section.title}</span>
                <span className="lesson-chevron" aria-hidden>
                  {openSection === index ? '−' : '+'}
                </span>
              </button>
              {openSection === index ? (
                <div className="lesson-accordion-body">
                  <p>{section.body}</p>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
