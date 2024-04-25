type Props = {
  handleCloseAlert: () => void;
};

export default function Alert(props: Props) {
  const { handleCloseAlert } = props;

  return (
    <div className="alert-container">
      <div className="alert">
        <h4>Something went wrong</h4>

        <button type="button" onClick={handleCloseAlert}>
          Close
        </button>
      </div>
    </div>
  );
}
