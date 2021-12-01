import "./index.scss";

const Label = ({ title, color }: { title: string; color: string }) => {
  return (
    <span
      style={{
        background: color + "1A",
        padding: "5px 10px 5px 10px",
        borderRadius: "10px",
        color: color,
        textAlign: "center",
      }}
    >
      {title}
    </span>
  );
};

export default Label;
