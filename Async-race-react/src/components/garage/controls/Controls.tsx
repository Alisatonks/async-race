import Form from './Form';
import useCreate100Cars from '../../../customHooks/useCreate100Cars';

export default function Controls() {
  const { createCarsPromise, isLoading } = useCreate100Cars();

  const handleClick = async () => {
    await createCarsPromise();
  };

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
        <button
          className="commonBtn"
          type="button"
          onClick={handleClick}
          disabled={isLoading}
        >
          {isLoading ? '...Generating' : 'Generate cars'}
        </button>
      </div>
    </div>
  );
}
