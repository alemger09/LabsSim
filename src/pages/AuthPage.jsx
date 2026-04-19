import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useI18n } from '../i18n/I18nContext';

export default function AuthPage() {
  const { t } = useI18n();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      console.log(`Mock authentication successful for ${email}`);
      navigate('/lab');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-top-lang">
        <LanguageSwitcher />
      </div>
      <div className="auth-card card glass">
        <Link to="/" className="back-link">{t('auth.back')}</Link>
        <div className="auth-header">
          <h2>{isLogin ? t('auth.welcomeBack') : t('auth.createAccount')}</h2>
          <p>{t('auth.subtitle')}</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">{t('auth.email')}</label>
            <input
              id="email"
              type="email"
              placeholder={t('auth.emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">{t('auth.password')}</label>
            <input
              id="password"
              type="password"
              placeholder={t('auth.passwordPlaceholder')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary auth-submit">
            {isLogin ? t('auth.signInSubmit') : t('auth.registerSubmit')}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? t('auth.noAccount') : t('auth.hasAccount')}
            <button
              className="link-button"
              onClick={() => setIsLogin(!isLogin)}
              type="button"
            >
              {isLogin ? t('auth.signUpHere') : t('auth.signInHere')}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
