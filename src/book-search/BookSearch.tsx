import React, { useEffect, useState } from 'react';
import Button from '../base/Button';
import Skeleton from '../base/Skeleton';
import {
  addBookToWishList,
  allBooksMapping,
  debounceSearch,
  deleteFromWishList,
  getBooksByType,
  isBookInWishList,
} from './BookSearch.service';
import { SingleBook } from './BookSearch.types';
import BookSingle from './BookSingle';
import BooksWrapper from './BooksWrapper';
import styles from './styles.module.scss';

const BookSearch = () => {
  const [bookType, updateBookType] = useState('');
  const [allAvailableBooks, setAllAvailableBooks] = useState(
    (): Array<SingleBook> => []
  );
  const [booksLoading, setBooksLoading] = useState(true);

  async function getAllBooks() {
    if (bookType) {
      setBooksLoading(true);
      const allBooks = allBooksMapping(await getBooksByType(bookType));
      setBooksLoading(false);
      setAllAvailableBooks(allBooks);
    }
  }

  useEffect(() => {
    debounceSearch(() => getAllBooks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookType]);

  const searchHandler = (value: string) => {
    updateBookType(value);
  };

  const [wishList, setWishList] = useState((): Array<SingleBook> => []);

  return (
    <>
      <section className={styles.bookSearchBox}>
        <div className={styles.mainSide}>
          <input
            className={styles.searchInput}
            tabIndex={1}
            name="gsearch"
            type="search"
            value={bookType}
            placeholder="Enter your bookname for ex: Javascript"
            onChange={(e) => searchHandler(e.target.value)}
          />
          <div className={styles.booksBox}>
            {!bookType ? (
              <div className={styles.placeholder}>
                <span>Try searching for a topic, for example</span>
                <Button
                  className={styles.exampleBtn}
                  onClick={() => {
                    updateBookType('Javascript');
                  }}
                >
                  "Javascript"
                </Button>
              </div>
            ) : (
              <BooksWrapper
                skeletonCount={10}
                skeletonElement={(key: number) => (
                  <Skeleton key={key} className={styles.skeleton} />
                )}
                isLoading={booksLoading}
              >
                {allAvailableBooks.length > 1 ? (
                  allAvailableBooks.map((book: SingleBook) => (
                    <BookSingle
                      key={book.id}
                      book={book}
                      addBookToWishList={() =>
                        addBookToWishList(book, setWishList)
                      }
                      isBookInWishList={isBookInWishList(book, wishList)}
                    />
                  ))
                ) : (
                  <div className={styles.placeholder}>
                    Books have not been founded
                  </div>
                )}
              </BooksWrapper>
            )}
          </div>
        </div>
        <aside className={styles.wishListBox}>
          <header className={styles.header}>
            My wish list ({wishList.length})
          </header>
          <div className={styles.wishListBooks}>
            {!!wishList.length ? (
              wishList.map((bookInWishList) => (
                <BookSingle
                  key={bookInWishList.id}
                  book={bookInWishList}
                  type="wish-list"
                  deleteFromWishList={() =>
                    deleteFromWishList(bookInWishList, setWishList)
                  }
                />
              ))
            ) : (
              <div className={styles.isEmpty}>
                You have not any books in your wish list yet
              </div>
            )}
          </div>
        </aside>
      </section>
    </>
  );
};

export default BookSearch;
