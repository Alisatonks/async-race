import BoxWithInput from './BoxWithInput';

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
      <BoxWithInput>
        <button className="commonBtn" type="button">
          Create
        </button>
      </BoxWithInput>
      <BoxWithInput>
        <button className="commonBtn" type="button">
          Update
        </button>
      </BoxWithInput>
      <div className="controls__group">
        <button className="commonBtn" type="button">
          Generate cars
        </button>
      </div>
    </div>
  );
}
