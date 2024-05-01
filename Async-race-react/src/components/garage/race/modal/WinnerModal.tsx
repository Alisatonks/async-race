type Props = {
  winner: {
    name: string;
    time: number;
  };
  handleClose: () => void;
};

function WinnerModal(props: Props) {
  const { winner, handleClose } = props;
  const { name, time } = winner;

  setTimeout(() => {
    handleClose();
  }, 4000);

  return (
    <div className="winner-modal" onClick={handleClose} role="button">
      <div>
        <h1>{`The winner is ${name}`}</h1>
        <h2>{`Time: ${time}`}</h2>
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default WinnerModal;
