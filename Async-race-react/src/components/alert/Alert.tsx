type Props = {
  handleCloseAlert: () => void;
  error: string;
};

export default function Alert(props: Props) {
  const { handleCloseAlert, error } = props;

  return (
    <div className="alert-container">
      <div className="alert">
        <h4>{error}</h4>

        <button type="button" onClick={handleCloseAlert}>
          Close
        </button>
      </div>
    </div>
  );
}
