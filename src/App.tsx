import React from 'react';
import BookSearch from './book-search';

function App() {
  const height = window.innerHeight || '100vh';

  return (
    <main
      role="main"
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
