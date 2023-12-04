import { Book } from "../addBook/AddBook";
import styled from "styled-components";
import { Link } from "react-router-dom";

type rowProp = {
  book: Book;
  setId: React.Dispatch<React.SetStateAction<number | undefined>>;
  handleDeleteBook: (bookId: number) => void;
  id: number;
};

export const bookRow = ({ book, setId, handleDeleteBook, id }: rowProp) => {
  return (
    <TableRow>
      <TableCell>{id + 1}</TableCell>
      <TableCell>{book.name}</TableCell>
      <TableCell>{book.isbn}</TableCell>
      <TableCell>{book.category}</TableCell>
      <TableCell>{book.rowNumber}</TableCell>
      <TableCell>{book.bookCount}</TableCell>
      <TableCell>{book.cost}</TableCell>
      <TableCell>{book.availabilty ? "Available" : "None"}</TableCell>
      <TableCell>
        <Actions>
          <Link
            style={{
              padding: "10px",
              border: "none",
              borderRadius: "4px",
              backgroundColor: "#007bff",
              color: "white",
              fontSize: "14px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            to={`/book/${book.id}`}
            state={{ book: book }}
          >
            View
          </Link>
          <Button available={true} onClick={() => setId(book.id)}>
            Edit
          </Button>
          <Button available={false} onClick={() => handleDeleteBook(book.id!)}>
            Delete
          </Button>
        </Actions>
      </TableCell>
    </TableRow>
  );
};

const TableRow = styled.tr`
  &:hover {
    background-color: #ebebeb;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  text-align: left;
`;

const Actions = styled.div`
  display: flex;
  gap: 5px;
`;

const Button = styled.button<ButtonProps>`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => (props.available ? "#4caf50" : "#f44336")};
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.available ? "#388e3c" : "#d32f2f")};
  }
`;

interface ButtonProps {
  available: boolean;
}
