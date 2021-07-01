import React from 'react';
import BookSearch from './book-search/BookSearch';

function App() {
  const height = window.innerHeight || '100vh';

  return (
    <main
      style={{
        height: height,
        maxHeight: height,
      }}
    >
      <BookSearch />
    </main>
  );
}

export default App;
