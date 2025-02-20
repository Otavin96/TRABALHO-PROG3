import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="h-12 bg-zinc-700 shadow-xl">
      <ul className="ml-10 pt-3">
        <Link className="inline float-left text-white" to="/">
          Pokedex IFC
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
