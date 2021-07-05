export interface SingleBook {
  id: string;
  image?: string;
  title: string;
  authors: Array<string>;
  publisher: string;
  published: string;
  description: string;
}

export interface SingleBookDTO {
  id: string;
  volumeInfo: {
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
    };
    title: string;
    authors: Array<string>;
    publisher: string;
    publishedDate: string;
    description: string;
  };
}

export interface AllBooks {
  items: Array<SingleBookDTO>;
}
