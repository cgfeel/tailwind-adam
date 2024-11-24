"use client";

import ImageCom, { ImageProps } from "next/image";
import { FC, useEffect } from "react";
import { imageLoader } from "./action";

const Img: FC<ImgProps> = ({ id, ...props }) => {
    useEffect(() => {
        const canvas = document.getElementById("customCanvas") as HTMLCanvasElement;
        const origin = document.getElementById(id) as HTMLImageElement;

        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = function () {
            ctx?.drawImage(img, 0, 0, img.width, img.height);
        };

        img.src = origin.src;
    }, [id]);

    fetch(props.src.toString())
        .then((data) => data.body)
        .then((res) => console.log(res));

    return (
        <>
            <ImageCom {...props} id={id} className="hidden" loader={imageLoader} />
            <canvas id="customCanvas"></canvas>
        </>
    );
};

interface ImgProps extends ImageProps {
    id: string;
}

export default Img;
