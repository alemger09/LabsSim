import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, FlaskConical, GraduationCap, Microscope, Sparkles } from 'lucide-react';
import SimCanvas from '../components/SimCanvas';
import LanguageSwitcher from '../components/LanguageSwitcher';
import experiments from '../experiments';
import { useI18n } from '../i18n/I18nContext';
import { localizeExperiment } from '../i18n/localizeExperiment';

const bgSimState = {
  ph: 10,
  volume: 80,
  color: 0x508cd2,
  indicatorKey: 'base',
  bubbles: 12,
};

export default function LandingPage() {
  const { locale, t } = useI18n();

  const steps = useMemo(
    () => [
      {
        title: t('landing.step1Title'),
        text: t('landing.step1Text'),
        icon: BookOpen,
      },
      {
        title: t('landing.step2Title'),
        text: t('landing.step2Text'),
        icon: Microscope,
      },
      {
        title: t('landing.step3Title'),
        text: t('landing.step3Text'),
        icon: Sparkles,
      },
    ],
    [locale, t]
  );

  const experimentsLocalized = useMemo(
    () => experiments.map((exp) => localizeExperiment(exp, locale)),
    [locale]
  );

  return (
    <div className="landing-container landing-platform">
      <div className="landing-bg">
        <SimCanvas experimentKey="acidBase" simState={bgSimState} running />
      </div>

      <div className="landing-overlay">
        <header className="landing-nav card glass">
          <div className="logo-row">
            <span className="logo-mark" aria-hidden>
              <FlaskConical size={28} strokeWidth={2.2} />
            </span>
            <div className="logo">LabSim</div>
          </div>
          <nav className="landing-nav-actions">
            <LanguageSwitcher className="landing-lang" />
            <Link to="/lab" className="btn btn-secondary landing-nav-link">
              {t('nav.openLab')}
            </Link>
            <Link to="/auth" className="btn btn-primary landing-nav-link">
              {t('nav.signIn')}
            </Link>
          </nav>
        </header>

        <main className="landing-main">
          <section className="hero-section landing-hero">
            <div className="hero-content card glass hero-card">
              <p className="hero-kicker">
                <GraduationCap size={18} strokeWidth={2.2} aria-hidden />
                {t('landing.kicker')}
              </p>
              <h1>{t('landing.heroTitle')}</h1>
              <p className="hero-subtitle">{t('landing.heroSubtitle')}</p>
              <div className="hero-actions">
                <Link to="/auth" className="btn btn-primary" style={{ padding: '16px 28px', fontSize: '1.05rem' }}>
                  {t('landing.getStarted')}
                </Link>
                <Link to="/lab" className="btn btn-secondary" style={{ padding: '16px 28px', fontSize: '1.05rem' }}>
                  {t('landing.trySandbox')}
                </Link>
              </div>
              <ul className="hero-bullets">
                <li>{t('landing.bullet1')}</li>
                <li>{t('landing.bullet2')}</li>
                <li>{t('landing.bullet3')}</li>
              </ul>
            </div>
          </section>

          <section className="landing-section landing-how">
            <h2 className="section-title">{t('landing.howTitle')}</h2>
            <p className="section-lead">{t('landing.howLead')}</p>
            <div className="how-grid">
              {steps.map(({ title, text, icon: Icon }) => (
                <article key={title} className="how-card card glass">
                  <div className="how-icon">
                    <Icon size={22} strokeWidth={2.2} />
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="landing-section landing-catalog">
            <div className="section-header-row">
              <div>
                <h2 className="section-title">{t('landing.catalogTitle')}</h2>
                <p className="section-lead">{t('landing.catalogLead')}</p>
              </div>
              <Link to="/lab" className="btn btn-primary">
                {t('landing.exploreLab')}
              </Link>
            </div>
            <div className="catalog-grid">
              {experimentsLocalized.map((exp) => (
                <article key={exp.key} className="catalog-card card glass">
                  <div className="catalog-card-top">
                    <span className="catalog-subject">{exp.subject}</span>
                    <span className="catalog-grade">{exp.grade}</span>
                  </div>
                  <h3>{exp.name}</h3>
                  <p className="catalog-summary">{exp.lesson?.summary ?? t('landing.catalogFallback')}</p>
                  <Link to="/lab" className="catalog-link">
                    {t('landing.catalogCta')}
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <section className="landing-cta card glass">
            <div>
              <h2>{t('landing.ctaTitle')}</h2>
              <p>{t('landing.ctaText')}</p>
            </div>
            <Link to="/auth" className="btn btn-primary landing-cta-btn">
              {t('landing.ctaButton')}
            </Link>
          </section>

          <footer className="landing-footer">
            <span>{t('landing.footerTagline')}</span>
            <Link to="/lab">{t('landing.footerLab')}</Link>
            <span aria-hidden>·</span>
            <Link to="/auth">{t('nav.signIn')}</Link>
          </footer>
        </main>
      </div>
    </div>
  );
}
