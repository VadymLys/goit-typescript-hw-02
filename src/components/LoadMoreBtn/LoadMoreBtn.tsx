import css from "../LoadMoreBtn/LoadMoreBtn.module.css";
import { FC } from "react";

interface LoadMoreBtnProps {
  onClick: () => void;
}

const LoadMoreBtn: FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
    <div>
      <button className={css.loadMoreButton} onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
