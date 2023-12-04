import React, { useRef } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import { Book } from "../addBook/AddBook";
import html2canvas from "html2canvas";
import { QRCode } from "react-qrcode-logo";

const ViewBook = () => {
  const { pathname, state } = useLocation();
  const { book } = state;
  const qrCodeRef = useRef<HTMLInputElement | null>(null);

  const handleDownloadClick = () => {
    if (qrCodeRef.current !== null)
      html2canvas(qrCodeRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "qrcode.png";
        link.click();
      });
  };

  return (
    <BookContainer>
      <BookInfo>
        {/* <BookImage src={img} alt={name} /> */}
        <div ref={qrCodeRef}>
          <QRCode
            value={pathname}
            logoOpacity={0.3}
            quietZone={50}
            logoPaddingStyle={"circle"}
            qrStyle={"dots"}
            eyeRadius={2}
          />
        </div>
        <BookDetails>
          <BookTitle>{book.name}</BookTitle>
          <BookText>ISBN: {book.isbn}</BookText>
          <BookText>Category: {book.category}</BookText>
          <BookText>Row Number: {book.rowNumber}</BookText>
          <BookText>Book Count: {book.bookCount}</BookText>
          <BookText>Cost: ${book.cost}</BookText>
        </BookDetails>
      </BookInfo>
      <BookActions>
        <BookButton available={book.availabilty}>
          {book.availabilty ? "Available" : "Not Available"}
        </BookButton>

        <BookButton available={false} onClick={handleDownloadClick}>
          Download QR Code
        </BookButton>
      </BookActions>
    </BookContainer>
  );
};

interface ButtonProps {
  available: boolean;
}

const BookContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const BookInfo = styled.div`
  display: flex;
  align-items: center;
`;

const BookDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const BookTitle = styled.h2`
  margin: 0;
  margin-bottom: 5px;
`;

const BookText = styled.p`
  margin: 0;
  color: #666;
`;

const BookActions = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const BookButton = styled.button<ButtonProps>`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => (props.available ? "#4caf50" : "#f44336")};
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.available ? "#388e3c" : "#d32f2f")};
  }
`;

export default ViewBook;
