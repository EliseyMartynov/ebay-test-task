import React, { useState } from 'react';
import styles from './styles.module.scss';
import { SingleBook } from './BookSearch.types';
import Button from '../base/Button';

interface BookSingleProps {
  book: SingleBook;
  isBookInWishList?: boolean;
  type?: 'default' | 'wish-list';
  addBookToWishList?: () => void;
  deleteFromWishList?: () => void;
}

const BookSingle = ({
  book,
  type = 'default',
  addBookToWishList,
  isBookInWishList,
  deleteFromWishList,
}: BookSingleProps) => {
  const { image, title, authors, publisher, published, description } = book;

  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  const BottomBtn = {
    default: (
      <Button
        type={!!isBookInWishList ? 'disabled' : 'secondary'}
        className={styles.actionBtn}
        onClick={addBookToWishList}
      >
        {!!isBookInWishList ? 'added' : 'add to wishlist'}
      </Button>
    ),
    'wish-list': (
      <Button
        onClick={deleteFromWishList}
        type="remove"
        className={styles.actionBtn}
      >
        remove
      </Button>
    ),
  };

  return (
    <div className={styles.bookSingle}>
      {!showAdditionalInfo ? (
        <div className={styles.header}>
          <h4>{title}</h4>
          <Button
            className={styles.infoBtn}
            type="info"
            onClick={() => setShowAdditionalInfo(true)}
          >
            ?
          </Button>
        </div>
      ) : (
        <div className={styles.additionalInfo}>
          <Button
            onClick={() => setShowAdditionalInfo(false)}
            className={styles.closeInfo}
            type="close"
          >
            ✕
          </Button>
          <div className={styles.infoBox}>
            <div className={styles.row}>{title}</div>
            <div className={styles.row}>
              {authors &&
                `Author${authors.length > 1 ? 's' : ''}: ${
                  authors.length > 1 ? authors.join(', ') : authors[0]
                }`}
            </div>
            <div className={styles.row}>Publisher: {publisher}</div>
            <div className={styles.row}>Published: {published}</div>
            <div className={styles.row}>{description}</div>
          </div>
        </div>
      )}
      {image ? (
        <img className={styles.img} src={image} alt={`${title}`} />
      ) : (
        <div className={styles.imageReplacer}>no image</div>
      )}
      {BottomBtn[type]}
    </div>
  );
};

export default BookSingle;
