import { ImageLoader } from "next/image";

const imageLoader: ImageLoader = ({ src }) => {
    fetch(src);
    return src;
}

export { imageLoader};