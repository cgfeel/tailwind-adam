import { getImageProps } from "next/image";

function getBackgroundImage(srcSet = "") {
  const imageSet = srcSet
    .split(", ")
    .map((str) => {
      const [url, dpi] = str.split(" ");
      return `url("${url}") ${dpi}`;
    })
    .join(", ");
  return `image-set(${imageSet})`;
}

export default function Home() {
  const {
    props: { srcSet },
  } = getImageProps({
    alt: "",
    width: 128,
    height: 128,
    src: "https://groupchatavatar.s3.us-east-2.amazonaws.com/images/coin_icon/64/pilotsato.png",
  });
  const backgroundImage = getBackgroundImage(srcSet);
  const style = { height: "100vh", width: "100vw", backgroundImage };

  return (
    <main style={style}>
      <h1>Hello World</h1>
    </main>
  );
}
