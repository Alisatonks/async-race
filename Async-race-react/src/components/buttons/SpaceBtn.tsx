type Props = {
  text: string;
};

export default function SpaceBtn(props: Props) {
  const { text } = props;

  return (
    <button className="space-btn" type="button">
      <span className="space-btn__text">{text}</span>
      <div id="stars-wrapper">
        <div id="stars" />
      </div>

      <div id="shine">
        <div className="shine__circle" />
        <div className="shine__circle" />
      </div>
    </button>
  );
}
