const Rectangle: React.FC<React.CSSProperties> = (props) => {
  return <div style={{
    ...props,
    position: "absolute",
    backgroundColor: "red",
  }} />;
};

export default Rectangle;
