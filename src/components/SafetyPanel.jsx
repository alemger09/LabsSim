import { useState, useEffect } from 'react';
import { Shield, Glasses, Hand, Shirt } from 'lucide-react';
import { SAFETY_DATA } from '../experiments';
import { useI18n } from '../i18n/I18nContext';

const ppeIcons = {
  goggles: Glasses,
  gloves: Hand,
  'lab-coat': Shirt,
};

export default function SafetyPanel({ experimentId }) {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(`safety-${experimentId}`);
    if (stored) {
      setIsOpen(JSON.parse(stored));
    }
  }, [experimentId]);

  const toggleOpen = () => {
    const newOpen = !isOpen;
    setIsOpen(newOpen);
    localStorage.setItem(`safety-${experimentId}`, JSON.stringify(newOpen));
  };

  const data = SAFETY_DATA[experimentId];
  if (!data) return null;

  return (
    <div className={`safety-panel ${isOpen ? 'open' : 'closed'}`}>
      <div className="safety-tab" onClick={toggleOpen}>
        <Shield size={16} />
        <span>{t('safety.title')}</span>
      </div>
      {isOpen && (
        <div className="safety-content">
          <div className="safety-section">
            <h4>{t('safety.ppe')}</h4>
            <div className="ppe-list">
              {data.ppe.map(item => {
                if (item === 'none-required') {
                  return <div key={item} className="ppe-item">{t('safety.none')}</div>;
                }
                const Icon = ppeIcons[item];
                return (
                  <div key={item} className="ppe-item">
                    {Icon && <Icon size={20} />}
                    <span>{t(`safety.ppe.${item}`)}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="safety-section">
            <h4>{t('safety.hazards')}</h4>
            <ul>
              {data.hazards.map((hazard, i) => <li key={i}>{hazard}</li>)}
            </ul>
          </div>
          <div className="safety-section">
            <h4>{t('safety.realLab')}</h4>
            <p>{data.realLab}</p>
          </div>
        </div>
      )}
    </div>
  );
}