import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { addBook, fetchBook, selectIsLoadingViaAPI } from "../../redux/slices/booksSlice";
import { setError } from "../../redux/slices/errorSlice";
import createBookWithID from "../../utils/createBookWithID";
import booksData from "../../data/books.json";
import "./BookForm.css";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  const isLoadingViaAPI = useSelector(selectIsLoadingViaAPI)
  const dispatch = useDispatch();

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];
    dispatch(addBook(createBookWithID(randomBook, "random")));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && author) {
      dispatch(addBook(createBookWithID({ title, author }, "manual")));
      setTitle("");
      setAuthor("");
    } else {
      dispatch(setError("fill title & author"));
    }
  };

  const handleAddRandomBookViaAPI = () => {
   dispatch(fetchBook("https://api-library-kdqq.onrender.com/random-book-delayed"))
  };

  return (
    <div className="app-block book-form">
      <h2>add a new book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">add book</button>
        <button type="button" onClick={handleAddRandomBook}>
          add random
        </button>
        <button
          type="button"
          onClick={handleAddRandomBookViaAPI}
          disabled={isLoadingViaAPI}
        >
          {isLoadingViaAPI ? (
            <>
              <span>Loading Book...</span>
              <FaSpinner className="spinner" />
            </>
          ) : (
            "add random via API"
          )}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
