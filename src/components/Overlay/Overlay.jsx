import { Outlet, NavLink } from 'react-router-dom';
import css from './Overlay.module.css';

const Overlay = () => {
  return (
    <div>
      <nav className={css.navigation}>
        <div>
          <NavLink className={css.link} to="/">
            Home
          </NavLink>
        </div>
        <div>
          <NavLink className={css.link} to="movies">
            Movies
          </NavLink>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Overlay;
