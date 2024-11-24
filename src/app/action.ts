import { ImageLoader } from "next/image";

const imageLoader: ImageLoader = ({ src, width, quality }) => {
    fetch(src);
    return src;
}

export { imageLoader};