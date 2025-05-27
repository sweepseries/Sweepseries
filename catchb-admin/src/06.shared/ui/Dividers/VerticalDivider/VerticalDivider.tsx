interface Props {
  height?: string;
  bold?: boolean;
  color?: string;
}

export function VerticalDivider({
  height = "100%",
  bold = false,
  color = "#F5F5F5",
}: Readonly<Props>) {
  return (
    <div
      style={{ height, width: bold ? "2px" : "1px", backgroundColor: color }}
    />
  );
}
