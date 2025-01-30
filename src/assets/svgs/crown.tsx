interface CrownProps {
  fill?: string;
}

const Crown: React.FC<CrownProps> = ({ fill = '#000' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="gradStroke" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style={{stopColor:'#ffc6ff',stopOpacity:1}} />
      <stop offset="10%" style={{stopColor:'#ff70a6',stopOpacity:1}} />
      <stop offset="20%" style={{stopColor:'#ff928b',stopOpacity:1}} />
      <stop offset="30%" style={{stopColor:'#ffd6a5',stopOpacity:1}} />
      <stop offset="40%" style={{stopColor:'#fae588',stopOpacity:1}} />
      <stop offset="50%" style={{stopColor:'#c1fba4',stopOpacity:1}} />
      <stop offset="60%" style={{stopColor:'#a5ffd6',stopOpacity:1}} />
      <stop offset="70%" style={{stopColor:'#9bf6ff',stopOpacity:1}} />
      <stop offset="80%" style={{stopColor:'#70d6ff',stopOpacity:1}} />
      <stop offset="90%" style={{stopColor:'#a0c4ff',stopOpacity:1}} />
      <stop offset="100%" style={{stopColor:'#bdb2ff',stopOpacity:1}} />
    </linearGradient>
  </defs>
  <g>
    <path fill={fill} d="M512,152.469c0-21.469-17.422-38.875-38.891-38.875c-21.484,0-38.906,17.406-38.906,38.875
      c0,10.5,4.172,20.016,10.938,27c-26.453,54.781-77.016,73.906-116.203,56.594c-34.906-15.438-47.781-59.563-52.141-93.75
      c14.234-7.484,23.938-22.391,23.938-39.594C300.734,78.016,280.719,58,256,58c-24.703,0-44.734,20.016-44.734,44.719
      c0,17.203,9.703,32.109,23.938,39.594c-4.359,34.188-17.234,78.313-52.141,93.75c-39.188,17.313-89.75-1.813-116.203-56.594
      c6.766-6.984,10.938-16.5,10.938-27c0-21.469-17.422-38.875-38.891-38.875C17.422,113.594,0,131,0,152.469
      c0,19.781,14.781,36.078,33.875,38.547l44.828,164.078h354.594l44.828-164.078C497.234,188.547,512,172.25,512,152.469z"/>
    <path fill={fill} d="M455.016,425.063c0,15.984-12.953,28.938-28.953,28.938H85.938C69.953,454,57,441.047,57,425.063v-2.406 c0-16,12.953-28.953,28.953-28.953h340.125c16,0,28.953,12.953,28.953,28.953V425.063z"/>
  </g>
</svg>

  )
};

export default Crown;