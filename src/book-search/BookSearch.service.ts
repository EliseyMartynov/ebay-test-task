import { Dispatch, SetStateAction } from 'react';
import fetchUrl from '../shared/fetchUrl/fetchUrl';
import { AllBooks, SingleBook, SingleBookAPI } from './BookSearch.types';

export async function getBooksByType(type: string) {
  try {
    return await fetchUrl(
      `https://www.googleapis.com/books/v1/volumes?q=${type}`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      }
    );
  } catch (exception) {
    return [];
  }
}

export function debounceSearch(callback: () => Promise<void>) {
  return setTimeout(callback, 500);
}

export function allBooksMapping(allBooks: AllBooks) {
  try {
    const mappedBooks: Array<SingleBook> = allBooks.items.map(
      (book: SingleBookAPI) => {
        const { volumeInfo } = book;
        return {
          id: book.id,
          image: volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail,
          title: volumeInfo.title,
          authors: volumeInfo.authors,
          publisher: volumeInfo.publisher,
          published: volumeInfo.publishedDate,
          description: volumeInfo.description,
        };
      }
    );
    return mappedBooks;
  } catch (error) {
    return [];
  }
}

export function addBookToWishList(
  book: SingleBook,
  setState: Dispatch<SetStateAction<SingleBook[]>>
) {
  setState((state: Array<SingleBook>) => [...state, book]);
}

export function deleteFromWishList(
  book: SingleBook,
  setState: Dispatch<SetStateAction<SingleBook[]>>
) {
  setState((state: Array<SingleBook>) =>
    state.filter((bookInWishList) => bookInWishList.id !== book.id)
  );
}

export function isBookInWishList(
  book: SingleBook,
  wishList: Array<SingleBook>
): boolean {
  return wishList.some(
    (bookInWishList: SingleBook) => bookInWishList.id === book.id
  );
}
