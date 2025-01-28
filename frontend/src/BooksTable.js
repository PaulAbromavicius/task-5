import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { generateBooks } from "./DataGenerator";

function BooksTable({ language, seed, likes, reviews }) {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [expandedBook, setExpandedBook] = useState(null);

  useEffect(() => {
    const initialBooks = generateBooks(seed, language, likes, reviews, 1);
    setBooks(initialBooks);
    setPage(1);
  }, [seed, language, likes, reviews]);

  const fetchMoreBooks = () => {
    const newBooks = generateBooks(seed, language, likes, reviews, page + 1);
    setBooks((prev) => [...prev, ...newBooks]);
    setPage((prev) => prev + 1);
  };

  const toggleBookDetails = (index) => {
    setExpandedBook(expandedBook === index ? null : index);
  };

  const handleLike = (index) => {
    setBooks((prevBooks) =>
      prevBooks.map((book, i) =>
        i === index ? { ...book, likes: book.likes + 1 } : book
      )
    );
  };

  const filteredBooks = books.filter((book) => book.likes >= likes); // Filter based on likes

  return (
    <InfiniteScroll
      dataLength={filteredBooks.length}
      next={fetchMoreBooks}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-2 text-left border-b">#</th>
            <th className="p-2 text-left border-b">ISBN</th>
            <th className="p-2 text-left border-b">Title</th>
            <th className="p-2 text-left border-b">Author(s)</th>
            <th className="p-2 text-left border-b">Publisher</th>
            <th className="p-2 text-left border-b">Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book, index) => (
            <React.Fragment key={index}>
              <tr className="hover:bg-gray-50">
                <td className="p-2 border-b">{index + 1}</td>
                <td className="p-2 border-b">{book.isbn}</td>
                <td className="p-2 border-b">{book.title}</td>
                <td className="p-2 border-b">{book.authors}</td>
                <td className="p-2 border-b">{book.publisher}</td>
                <td className="p-2 border-b">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => toggleBookDetails(index)}
                  >
                    {expandedBook === index ? "↑" : "↓"}
                  </button>
                </td>
              </tr>

              {expandedBook === index && (
                <tr>
                  <td colSpan="6" className="p-4">
                    <div className="bg-gray-50 p-4 rounded shadow-sm">
                      <h3 className="font-bold text-lg mb-2">{book.title}</h3>
                      <p className="text-gray-600 mb-1">{book.publisher}</p>
                      <div className="flex items-center space-x-2 mb-2">
                      
                      </div>
                      <p className="italic mb-2">by {book.authors}</p>
                      <span className="text-red-500 text-lg">❤️</span>
                        <span className="text-gray-700 font-bold">
                          {book.likes}
                        </span>
                        <button
                          className="text-blue-500 hover:text-blue-700 ml-4"
                          onClick={() => handleLike(index)}
                        >
                           Likes
                        </button>
                      <p className="font-bold mb-2">
                        Reviews ({book.reviews.length}):
                      </p>
                      <div className="space-y-2">
                        {book.reviews.map((review, i) => (
                          <div key={i} className="p-2 bg-white rounded shadow">
                            {review}
                          </div>
                        ))}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </InfiniteScroll>
  );
}

export default BooksTable;
