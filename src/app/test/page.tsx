import { getImageProps } from "next/image";

export default function Home() {
  const common = { alt: "Art Direction Example", sizes: "100vw" };
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    width: 1440,
    height: 875,
    quality: 80,
    src: "https://groupchatavatar.s3.us-east-2.amazonaws.com/images/coin_icon/64/pilotsato.png",
  });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    width: 750,
    height: 1334,
    quality: 70,
    src: "https://groupchatavatar.s3.us-east-2.amazonaws.com/images/coin_icon/64/pilotsato.png",
  });

  return (
    <picture>
      <source media="(min-width: 1000px)" srcSet={desktop} />
      <source media="(min-width: 500px)" srcSet={mobile} />
      <img {...rest} style={{ width: "100%", height: "auto" }} />
    </picture>
  );
}
