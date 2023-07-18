import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useMutation } from "@apollo/client";
import { getAuthors } from "../graphql-client/queries";
import { addSingleAuthor } from "../graphql-client/mutations";

const AuthorForms = () => {
  const [newAuthor, setNewAuthor] = useState({
    name: "",
    age: "",
  });

  const onInputChange = (event) => {
    setNewAuthor({
      ...newAuthor,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    addAuthor({
      variables: {
        name: newAuthor.name,
        age: newAuthor.genre,
      },
      refetchQueries: [{ query: getAuthors }],
    });

    setNewAuthor({
      name: "",
      age: "",
    });
  };
  //GraphQL
  const [addAuthor, dataMutation] = useMutation(addSingleAuthor);
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="invisible">
        <Form.Control />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Author name"
          name="name"
          onChange={onInputChange}
          value={newAuthor.name}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="number"
          placeholder="Author age"
          name="age"
          onChange={onInputChange}
          value={newAuthor.age}
        />
      </Form.Group>
      <Button className="float-right" variant="info" type="submit">
        Add Author
      </Button>
    </Form>
  );
};

export default AuthorForms;
