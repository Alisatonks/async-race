export default function Finish() {
  return (
    <svg
      version="1.1"
      id="Icons"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 32 32"
      width="50"
      height="50"
      xmlSpace="preserve"
    >
      <style type="text/css">
        {`.st0 {
      fill: none;
      stroke: #9B7EDA;
      stroke-width: 1.5;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-miterlimit: 10;
    }
    .neonGlow {
      filter: url(#neonGlow);
    }`}
      </style>

      <filter id="neonGlow" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur stdDeviation="0" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="glow" />
          <feMergeNode in="glow" />
          <feMergeNode in="glow" />
        </feMerge>
      </filter>

      <g className="neonGlow">
        <path
          className="st0"
          d="M6,18.3c8-4.9,12,6.4,20,1.4c0-5.6,0-8.4,0-14c-8,4.9-12-6.4-20-1.4C6,9.9,6,12.7,6,18.3z"
        />
        <line className="st0" x1="6" y1="29" x2="6" y2="18" />
      </g>
    </svg>
  );
}
