import { useEffect, useState } from "react";
import axios from "axios";
import "./card.css";

const Card = () => {
  const [books, setBooks] = useState([]);
  const [searchTitleBook, setSearchTitleBook] = useState("");
  const [searchGenreBook, setSearchGenreBook] = useState("");
  const genres = [
    "Fantasia",
    "Distopia",
    "Romance",
    "Suspense",
    "Realismo Mágico",
    "Ficção",
    "Infantil",
    "Drama",
    "Tecnologia",
    "Horror",
  ];
  const [isFilteredGenreBook, setIsFilteredGenreBook] = useState(false);

  const allBooks = async () => {
    try {
      const response = await axios.get(
        "https://api-book-waxq.onrender.com/book"
      );
      setBooks(response.data);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
    }
  };

  useEffect(() => {
    allBooks();
  }, []);

  const handleSearchTitleBook = async (event) => {
    event.preventDefault();
    if (searchTitleBook) {
      try {
        const response = await axios.get(
          `https://api-book-waxq.onrender.com/book/title/${searchTitleBook}`
        );
        const bookData = response.data;
        if (Array.isArray(bookData)) {
          setBooks(bookData);
        } else {
          setBooks([bookData]);
        }
      } catch (error) {
        console.error("Erro ao buscar o livro:", error);
      }
    } else {
      allBooks();
    }
  };

  const handleSearchGenreBook = async (event) => {
    event.preventDefault();
    if (isFilteredGenreBook) {
      allBooks();
      setIsFilteredGenreBook(false);
    } else {
      if (searchGenreBook) {
        try {
          const response = await axios.get(
            `https://api-book-waxq.onrender.com/book/genre/${searchGenreBook}`
          );
          setBooks(response.data);
          setIsFilteredGenreBook(true);
        } catch (error) {
          console.error("Erro ao buscar livros:", error);
        }
      }
    }
  };

  return (
    <div className="container">
      <div className="filter-container">
        <div>
          <form onSubmit={handleSearchGenreBook}>
            <select
              value={searchGenreBook}
              onChange={(e) => setSearchGenreBook(e.target.value)}
            >
              <option value="">Selecione um Gênero</option>
              {genres.map((genre, index) => (
                <option key={index} value={genre}>
                  {genre}
                </option>
              ))}
            </select>

            <button type="submit">
              {isFilteredGenreBook ? "Remover Filtro" : "Buscar por Gênero"}
            </button>
          </form>
        </div>
        <div>
          <form onSubmit={handleSearchTitleBook}>
            <input
              type="text"
              placeholder="Digite o nome do livro"
              value={searchTitleBook}
              onChange={(e) => setSearchTitleBook(e.target.value)}
            />
            <button type="submit">Buscar Livro</button>
          </form>
        </div>
      </div>

      <h1 className="h1-list">Lista de Livros</h1>

      <div className="book-container">
        {Array.isArray(books) && books.length > 0 ? (
          books.map((book) => (
            <div className="book-card" key={book.id}>
              <h2>{book.title}</h2>
              <p>
                <strong>Autor:</strong> {book.author}
              </p>
              <p>
                <strong>Páginas:</strong> {book.pag}
              </p>
              <p>
                <strong>Gênero:</strong> {book.genre}
              </p>
              <p>
                <strong>Data de Publicação:</strong>{" "}
                {new Date(book.date_publication).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p>Nenhum livro encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default Card;
