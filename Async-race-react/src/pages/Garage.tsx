import Controls from '../components/garage/controls/Controls';
import RaceBlock from '../components/garage/race/RaceBlock';

export default function GaragePage() {
  return (
    <div className="garage-wrapper">
      <Controls />
      <RaceBlock />
    </div>
  );
}
