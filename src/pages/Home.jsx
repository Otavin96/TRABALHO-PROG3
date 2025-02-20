import Card from "../components/card";

// eslint-disable-next-line react/prop-types
const Home = ({ pokemon }) => {
  return (
    <div className="grid grid-cols-4 gap-4 mt-6">
      <Card pokemon={pokemon} />
    </div>
  );
};

export default Home;
