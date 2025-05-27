interface Props {
  bold?: boolean;
  color?: string;
}

export function Divider({ bold = false, color = "#0F0F70" }: Readonly<Props>) {
  return (
    <div
      style={{
        width: "100%",
        height: bold ? "2px" : "1px",
        backgroundColor: color,
      }}
    />
  );
}
