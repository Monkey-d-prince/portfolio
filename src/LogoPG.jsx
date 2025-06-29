// LogoPG.jsx
// A stylized PG logo SVG for navbar

const LogoPG = ({ size = 38 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer P shape */}
    <path d="M16 52V20C16 13.3726 21.3726 8 28 8C34.6274 8 40 13.3726 40 20C40 26.6274 34.6274 32 28 32H32" stroke="#32215C" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    {/* G shape */}
    <path d="M32 40H48C48 48.8366 40.8366 56 32 56C23.1634 56 16 48.8366 16 40" stroke="#7B4A1D" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default LogoPG;
