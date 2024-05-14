import { useState, useEffect, FC } from "react";
import "modern-normalize";
import { searchImages } from "../../api/searchImages";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import { Image, UnsplashImage } from "./App.types";

const App: FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [pageNum, setPageNum] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [hasMoreImages, setHasMoreImages] = useState<boolean>(false);
  const [clickImage, setClickImage] = useState<Image | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  async function handleSearch(query: string): Promise<void> {
    setLoading(true);

    setError(false);

    setImages([]);

    setPageNum(1);

    setQuery(query);
  }

  useEffect(() => {
    if (!query) return;
    async function loadData() {
      try {
        const data = await searchImages(query, pageNum);

        const normalizeData = data.results.map(
          ({ description, id, urls }: any) => {
            return {
              alt: description,
              id,
              small: urls.small,
              regular: urls.regular,
            };
          }
        );
        setImages((prevImages) => [...prevImages, ...normalizeData]);

        if (data.results.length === 0) {
          setHasMoreImages(false);
        }

        setHasMoreImages(data.total_pages !== pageNum);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
        setError(false);
      }
    }

    loadData();
  }, [query, pageNum]);

  const loadMore = () => {
    setLoading(true);
    setPageNum(pageNum + 1);
  };

  const open = (image: Image): void => {
    setIsOpen(true);
    setClickImage(image);
  };

  const close = (): void => {
    setIsOpen(false);
    setClickImage(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {images.length > 0 && <ImageGallery items={images} onClick={open} />}
      {hasMoreImages && images.length > 0 && <LoadMoreBtn onClick={loadMore} />}
      {clickImage && (
        <ImageModal images={clickImage} open={isOpen} close={close} />
      )}
    </div>
  );
};

export default App;
