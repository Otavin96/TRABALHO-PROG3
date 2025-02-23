import style from "./navbar.module.css";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={style.navbar}>
      <ul>
        <Link className={style.brand} to="/">
          Pokedex IFC
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
