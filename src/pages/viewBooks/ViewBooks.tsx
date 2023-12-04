import React, { useEffect, useState } from "react";
import EditBook from "../../components/modals/edit/editBook";
import { Book } from "../addBook/AddBook";
import { bookRow } from "./components";
import styled from "styled-components";
import searchIcon from "../../assets/icon-search.svg";
import classes from "./style.module.css";

const ViewBooks = () => {
  const [books, setBooks] = useState<Book[]>(() => {
    const cachedBooks = localStorage.getItem("webersBooks");
    return cachedBooks ? JSON.parse(cachedBooks) : [];
  });
  const [steadyBooks, setSteadyBook] = useState<Book[]>(() => {
    const cachedBooks = localStorage.getItem("webersBooks");
    return cachedBooks ? JSON.parse(cachedBooks) : [];
  });

  const [id, setId] = useState<number | undefined>(undefined);

  // load books when edited
  useEffect(() => {
    const cachedBooks = localStorage.getItem("webersBooks");
    setBooks(JSON.parse(cachedBooks!));
  }, [id]);

  // update cache when books change
  useEffect(() => {
    localStorage.setItem("webersBooks", JSON.stringify(books));
  }, [books]);

  const handleDeleteBook = (bookId: number) => {
    setBooks([...books.filter((b) => b.id !== bookId)]);
    localStorage.setItem("webersBooks", JSON.stringify(books));
  };

  const handleSearch = (searchValue: string) => {
    if (searchValue === "") setBooks(steadyBooks);

    const filtered: Book[] = steadyBooks.filter((e) => {
      return (
        e.name.toLowerCase().includes(searchValue) ||
        e.isbn.toLowerCase().includes(searchValue) ||
        e.cost === parseFloat(searchValue) ||
        e.rowNumber === parseInt(searchValue) ||
        e.category.toLowerCase().includes(searchValue) ||
        e.bookCount === parseInt(searchValue)
      );
    });

    setBooks(filtered);
  };

  return (
    <>
      <TableContainer>
        <div className={classes.search}>
          <img src={searchIcon} alt="" />
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <Table>
          <TableHead>
            <TableHeader>No</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>ISBN</TableHeader>
            <TableHeader>Category</TableHeader>
            <TableHeader>Row Number</TableHeader>
            <TableHeader>Book Count</TableHeader>
            <TableHeader>Cost</TableHeader>
            <TableHeader>Availability</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableHead>
          <tbody>
            {books.map((book, id) => {
              return bookRow({ book, setId, handleDeleteBook, id });
            })}
          </tbody>
        </Table>
      </TableContainer>

      {id && <EditBook close={setId} id={id} />}
    </>
  );
};

export default ViewBooks;

const TableContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const TableHead = styled.thead`
  background-color: #007bff;
  color: white;
`;

const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
`;

const TableBody = styled.tbody`
  & tr:nth-child(even) {
    background-color: #f5f5f5;
  }

  & tr:hover {
    background-color: #ebebeb;
  }
`;
