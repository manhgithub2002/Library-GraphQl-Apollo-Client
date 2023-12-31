import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useQuery, useMutation } from "@apollo/client";
import { getAuthors, getBooks } from "../graphql-client/queries";
import { addSingleBook } from "../graphql-client/mutations";
import AuthorForms from "./AuthorForms";

const Forms = () => {
  const [newBook, setNewBook] = useState({
    name: "",
    genre: "",
    authorId: "",
  });

  const onInputChange = (event) => {
    setNewBook({
      ...newBook,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    addBook({
      variables: {
        name: newBook.name,
        genre: newBook.genre,
        authorId: newBook.authorId,
      },
      refetchQueries: [{ query: getBooks }],
    });

    setNewBook({
      name: "",
      genre: "",
      authorId: "",
    });
  };
  //GraphQL
  const { loading, data } = useQuery(getAuthors);

  const [addBook, dataMutation] = useMutation(addSingleBook);
  return (
    <Row>
      <Col>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Book name"
              name="name"
              onChange={onInputChange}
              value={newBook.name}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Book genre"
              name="genre"
              onChange={onInputChange}
              value={newBook.genre}
            />
          </Form.Group>
          <Form.Group>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <Form.Control
                as="select"
                name="authorId"
                onChange={onInputChange}
                value={newBook.authorId}
              >
                <option value="" disabled>
                  Select author
                </option>
                {data.authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </Form.Control>
            )}
          </Form.Group>
          <Button className="float-right" variant="info" type="submit">
            Add Book
          </Button>
        </Form>
      </Col>

      <Col>
        <AuthorForms />
      </Col>
    </Row>
  );
};

export default Forms;
