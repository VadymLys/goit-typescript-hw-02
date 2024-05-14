import ImageCard from "../ImageCard/ImageCard";
import css from "../ImageGallery/ImageGallery.module.css";
import { Image } from "../App/App.types";
import { FC } from "react";
interface ImageGalleryProps {
  items: Image[];
  onClick: (item: Image) => void;
}

const ImageGallery: FC<ImageGalleryProps> = ({ items, onClick }) => {
  return (
    <ul className={css.imageGallery}>
      {items.length > 0 &&
        items.map((item) => {
          return (
            <li key={item.id}>
              <ImageCard
                imageUrl={item.small}
                alt={item.alt}
                onClick={() => onClick(item)}
              />
            </li>
          );
        })}
    </ul>
  );
};

export default ImageGallery;
