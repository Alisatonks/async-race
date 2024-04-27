type Props = {
  color: string;
};

export default function Forward(props: Props) {
  const { color } = props;
  return (
    <svg
      fill={color}
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      width="23px"
      height="23px"
      viewBox="0 0 373.008 373.008"
      xmlSpace="preserve"
      stroke={color}
      transform="matrix(-1, 0, 0, 1, 0, 0)"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        {' '}
        <g>
          {' '}
          <g id="Layer_8_26_">
            {' '}
            <path d="M245.488,19.311v334.393c0,6.9-3.668,13.278-9.654,16.724c-5.976,3.441-13.335,3.441-19.304,0L16.165,203.22 c-5.967-3.44-9.662-9.818-9.662-16.719c0-6.891,3.683-13.269,9.662-16.719L216.53,2.583C219.516,0.859,222.844,0,226.192,0 c3.329,0,6.653,0.864,9.664,2.588C241.814,6.036,245.488,12.413,245.488,19.311z M358.78,0.197h-63.705 c-4.259,0-7.717,3.458-7.717,7.721v357.168c0,4.263,3.458,7.722,7.717,7.722h63.705c4.269,0,7.725-3.459,7.725-7.722V7.917 C366.505,3.655,363.049,0.197,358.78,0.197z" />{' '}
          </g>{' '}
        </g>{' '}
      </g>
    </svg>
  );
}
