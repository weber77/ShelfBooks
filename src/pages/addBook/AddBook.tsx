import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

import styled from "styled-components";
import { successToast } from "../../utils/toastNotifications";

export type Book = {
  id: number | undefined;
  name: string;
  isbn: string;
  category: string;
  rowNumber: number;
  bookCount: number;
  cost: number;
  availabilty: boolean;
};

const AddBook = () => {
  const [book, setBook] = useState<Book>({
    id: undefined,
    name: "",
    isbn: "",
    category: "",
    rowNumber: 0,
    bookCount: 0,
    cost: 0,
    availabilty: false,
  });

  const [books, setBooks] = useState<Book[]>(() => {
    const cachedBooks = localStorage.getItem("webersBooks");
    return cachedBooks ? JSON.parse(cachedBooks) : [];
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;

    setBook({
      ...book,
      [name]: inputValue,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setBooks([...books, { ...book, id: new Date().getTime() }]);
    successToast("New Book Added!");
  };

  //Update cache when book submitted
  useEffect(() => {
    localStorage.setItem("webersBooks", JSON.stringify(books));
    setBook({
      id: undefined,
      name: "",
      isbn: "",
      category: "",
      rowNumber: 0,
      bookCount: 0,
      cost: 0,
      availabilty: false,
    });
  }, [books]);

  return (
    <FormContainer>
      <Title>Add Book</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Name:</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={book?.name}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="isbn">ISBN:</Label>
          <Input
            type="text"
            id="email"
            name="isbn"
            value={book?.isbn}
            onChange={handleInputChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="category">Category:</Label>
          <Input
            type="text"
            id="category"
            name="category"
            value={book?.category}
            onChange={handleInputChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="rowNumber">Row Number:</Label>
          <Input
            type="number"
            id="rowNumber"
            name="rowNumber"
            value={book?.rowNumber}
            onChange={handleInputChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="bookCount">Count:</Label>
          <Input
            type="number"
            id="bookCount"
            name="bookCount"
            value={book?.bookCount}
            onChange={handleInputChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="cost">Cost:</Label>
          <Input
            type="number"
            id="cost"
            name="cost"
            value={book?.cost}
            onChange={handleInputChange}
            required
          />
        </FormGroup>

        <FormGroup>
          Availabilty:
          <input
            type="checkBox"
            id="availabilty"
            name="availabilty"
            checked={book?.availabilty}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Button type="submit">Submit</Button>
        </FormGroup>
      </form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px;
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 95%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;
const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export default AddBook;
