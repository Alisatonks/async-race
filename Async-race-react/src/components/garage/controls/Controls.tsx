import Form from './Form';

export default function Controls() {
  return (
    <div className="controls">
      <div className="controls__group">
        <button className="commonBtn" type="button">
          Race
        </button>
        <button className="commonBtn" type="button">
          Reset
        </button>
      </div>
      <Form action="create" />
      <Form action="update" />
      <div className="controls__group">
        <button className="commonBtn" type="button">
          Generate cars
        </button>
      </div>
    </div>
  );
}
