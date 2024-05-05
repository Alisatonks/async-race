import { NavLink } from 'react-router-dom';
import SpaceBtn from '../buttons/SpaceBtn';

function Navbar() {
  return (
    <nav className="nav">
      <ul className="nav__ul">
        <li className="nav__li">
          <NavLink to="/" className="nav__link">
            <SpaceBtn text="Garage" />
          </NavLink>
        </li>
        <li className="nav__li">
          <NavLink to="/winners" className="nav__link">
            <SpaceBtn text="Winners" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;
