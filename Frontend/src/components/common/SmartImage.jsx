import Image from "next/image";

export default function SmartImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes = "100vw",
  fill = false,
  style,
}) {
  const shared = {
    src,
    alt,
    className,
    priority,
    sizes,
    style,
  };

  if (fill) {
    return <Image {...shared} fill />;
  }

  return <Image {...shared} width={width} height={height} />;
}
