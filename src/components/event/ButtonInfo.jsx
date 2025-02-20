const ButtonInfo = (props) => {
  return <button onClick={() => props.event(props.id)}>{props.text}</button>;
};

export default ButtonInfo;
