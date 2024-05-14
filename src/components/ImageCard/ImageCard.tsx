import { FC } from "react";

interface ImageCardProps {
  alt: string;
  imageUrl: string;
  onClick: () => void;
}

const ImageCard: FC<ImageCardProps> = ({ alt, imageUrl, onClick }) => {
  return (
    <li>
      <div>
        <img
          src={imageUrl}
          alt={alt}
          onClick={onClick}
          width="320"
          height="200"
        />
      </div>
    </li>
  );
};

export default ImageCard;
