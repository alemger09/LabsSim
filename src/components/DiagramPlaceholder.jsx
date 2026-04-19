export default function DiagramPlaceholder({ name }) {
  const renderDiagram = () => {
    switch (name) {
      case 'ph-scale':
        return (
          <svg width="400" height="200" viewBox="0 0 400 200">
            {/* pH Scale */}
            <defs>
              <linearGradient id="phGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff0000" />
                <stop offset="16.7%" stopColor="#ff8000" />
                <stop offset="33.3%" stopColor="#ffff00" />
                <stop offset="50%" stopColor="#80ff00" />
                <stop offset="66.7%" stopColor="#00ff00" />
                <stop offset="83.3%" stopColor="#00ff80" />
                <stop offset="100%" stopColor="#0080ff" />
              </linearGradient>
            </defs>

            {/* Scale bar */}
            <rect x="50" y="80" width="300" height="20" fill="url(#phGradient)" stroke="#000" strokeWidth="1" />

            {/* Labels */}
            <text x="50" y="120" textAnchor="middle" fontSize="12">0</text>
            <text x="100" y="120" textAnchor="middle" fontSize="12">2</text>
            <text x="150" y="120" textAnchor="middle" fontSize="12">4</text>
            <text x="200" y="120" textAnchor="middle" fontSize="12">6</text>
            <text x="250" y="120" textAnchor="middle" fontSize="12">8</text>
            <text x="300" y="120" textAnchor="middle" fontSize="12">10</text>
            <text x="350" y="120" textAnchor="middle" fontSize="12">14</text>

            {/* pH descriptions */}
            <text x="50" y="140" textAnchor="middle" fontSize="10" fill="#ff0000">Strong Acid</text>
            <text x="200" y="140" textAnchor="middle" fontSize="10" fill="#000">Neutral</text>
            <text x="350" y="140" textAnchor="middle" fontSize="10" fill="#0080ff">Strong Base</text>

            {/* Title */}
            <text x="200" y="30" textAnchor="middle" fontSize="16" fontWeight="bold">pH Scale</text>
          </svg>
        );

      case 'ohms-law':
        return (
          <svg width="400" height="150" viewBox="0 0 400 150">
            {/* Ohm's Law Triangle */}
            <text x="200" y="30" textAnchor="middle" fontSize="16" fontWeight="bold">Ohm's Law</text>
            
            {/* Triangle */}
            <polygon points="200,50 150,120 250,120" fill="none" stroke="#1d9e75" strokeWidth="3" />
            
            {/* Labels */}
            <text x="200" y="75" textAnchor="middle" fontSize="14" fill="#1d9e75">V</text>
            <text x="175" y="105" textAnchor="middle" fontSize="14" fill="#1d9e75">I</text>
            <text x="225" y="105" textAnchor="middle" fontSize="14" fill="#1d9e75">R</text>
            
            {/* Formula */}
            <text x="200" y="140" textAnchor="middle" fontSize="14">V = I × R</text>
          </svg>
        );

      case 'pendulum-diagram':
        return (
          <svg width="300" height="250" viewBox="0 0 300 250">
            {/* Pendulum */}
            <line x1="150" y1="50" x2="150" y2="180" stroke="#333" strokeWidth="2" />
            <circle cx="150" cy="180" r="15" fill="#1d9e75" />
            
            {/* Arc showing motion */}
            <path d="M 150 50 Q 200 80 220 120" fill="none" stroke="#666" strokeWidth="1" strokeDasharray="5,5" />
            <path d="M 150 50 Q 100 80 80 120" fill="none" stroke="#666" strokeWidth="1" strokeDasharray="5,5" />
            
            {/* Labels */}
            <text x="150" y="35" textAnchor="middle" fontSize="12">Pivot</text>
            <text x="150" y="200" textAnchor="middle" fontSize="12">Bob</text>
            <text x="235" y="125" fontSize="12">Length (L)</text>
            
            {/* Period formula */}
            <text x="150" y="230" textAnchor="middle" fontSize="14">T = 2π√(L/g)</text>
          </svg>
        );

      case 'projectile-path':
        return (
          <svg width="400" height="200" viewBox="0 0 400 200">
            {/* Ground */}
            <line x1="0" y1="180" x2="400" y2="180" stroke="#333" strokeWidth="2" />
            
            {/* Projectile path */}
            <path d="M 50 180 Q 150 80 250 180" fill="none" stroke="#1d9e75" strokeWidth="3" />
            
            {/* Velocity vectors */}
            <line x1="100" y1="150" x2="130" y2="130" stroke="#ff0000" strokeWidth="2" markerEnd="url(#arrow)" />
            <line x1="100" y1="150" x2="100" y2="120" stroke="#0000ff" strokeWidth="2" markerEnd="url(#arrow)" />
            
            {/* Labels */}
            <text x="135" y="125" fontSize="12" fill="#ff0000">vₓ (constant)</text>
            <text x="85" y="115" fontSize="12" fill="#0000ff">vᵧ (changing)</text>
            <text x="200" y="50" textAnchor="middle" fontSize="14" fontWeight="bold">Projectile Trajectory</text>
            
            {/* Arrow marker */}
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#333" />
              </marker>
            </defs>
          </svg>
        );

      case 'spring-force':
        return (
          <svg width="400" height="200" viewBox="0 0 400 200">
            {/* Spring */}
            <path d="M 50 100 Q 70 80 90 100 Q 110 120 130 100 Q 150 80 170 100 Q 190 120 210 100 Q 230 80 250 100" 
                  fill="none" stroke="#333" strokeWidth="3" />
            
            {/* Masses */}
            <rect x="30" y="85" width="20" height="30" fill="#666" />
            <rect x="250" y="85" width="20" height="30" fill="#666" />
            
            {/* Force arrows */}
            <line x1="20" y1="100" x2="30" y2="100" stroke="#ff0000" strokeWidth="2" markerEnd="url(#arrow)" />
            <line x1="270" y1="100" x2="280" y2="100" stroke="#ff0000" strokeWidth="2" markerStart="url(#arrow)" />
            
            {/* Displacement */}
            <line x1="250" y1="75" x2="250" y2="125" stroke="#0000ff" strokeWidth="1" markerEnd="url(#arrow)" markerStart="url(#arrow)" />
            <text x="260" y="90" fontSize="12" fill="#0000ff">x</text>
            
            {/* Labels */}
            <text x="15" y="95" fontSize="12" fill="#ff0000">F</text>
            <text x="285" y="95" fontSize="12" fill="#ff0000">F</text>
            <text x="200" y="30" textAnchor="middle" fontSize="16" fontWeight="bold">Hooke's Law</text>
            <text x="200" y="170" textAnchor="middle" fontSize="14">F = -kx</text>
            
            {/* Arrow marker */}
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#333" />
              </marker>
            </defs>
          </svg>
        );
    }
  };

  return (
    <div className="diagram-container">
      {renderDiagram()}
    </div>
  );
}