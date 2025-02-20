import ButtonInfo from "./event/ButtonInfo";

const Card = ({ pokemon }) => {
  function handleInfo(id) {
    console.log(id);
  }

  return (
    <>
      {pokemon.map((item, index) => (
        <div
          key={index}
          className="card rounded-md h-64 ml-2 mr-2 bg-red-400 shadow-xl relative "
        >
          <div className="header-card rounded-t-md bg-white h-8">
            <h2 className="font-bold text-center uppercase">{item.name}</h2>
          </div>

          <img
            className="absolute bottom-2 left-30 "
            width={200}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${index + 1}.png`}
            alt={`Pokemon ${item.name}`}
          />

          <div className="info">
            <ButtonInfo id={index} event={handleInfo} text="Ver mais" />
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
