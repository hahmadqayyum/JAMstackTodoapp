import React, { useContext, useReducer, useRef, useState } from "react";
import { Router } from "@reach/router";
import { Link } from "gatsby";
import {
  Flex,
  Heading,
  Button,
  NavLink,
  Container,
  Label,
  Input,
  Checkbox,
} from "theme-ui";
import { gql, useMutation, useQuery } from "@apollo/client";
import { IdentityContext } from "../../identity-context";

const ADD_TODO = gql`
  mutation AddTodo($value: String!) {
    addTodo(value: $value) {
      id
    }
  }
`;

const UPDATE_TODO_DONE = gql`
  mutation UpdateTodoDone($id: ID!) {
    updateTodoDone(id: $id) {
      text
      done
    }
  }
`;

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      value
      done
    }
  }
`;

const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        {
          done: false,
          id: Math.floor(Math.random() * 10000),
          value: action.payload,
        },
        ...state,
      ];
    case "UPDATE_TODO_DONE":
      const newState = [...state];
      newState[action.payload] = {
        done: !state[action.payload].done,
        value: state[action.payload].value,
      };
      return newState;
    default:
      return state;
  }
};

let Dash = () => {
  const Inputref = useRef();
  const [todo, dispatch] = useReducer(todoReducer, []);
  const { user } = useContext(IdentityContext);
  const { identity: netlifyIdentity } = useContext(IdentityContext);
  const [addTodo] = useMutation(ADD_TODO);
  const [updateTodoDone] = useMutation(UPDATE_TODO_DONE);
  const { loading, error, data, refetch } = useQuery(GET_TODOS);

  return (
    <Container>
      <Flex as="nav">
        <NavLink as={Link} to="/" p={2}>
          Home
        </NavLink>
        <NavLink as={Link} to={"/app"} p={2}>
          Dashboard
        </NavLink>
        {user && (
          <NavLink
            as={Link}
            to="/"
            p={2}
            onClick={() => {
              netlifyIdentity.logout();
            }}
          >
            Log out {user.user_metadata.full_name}
          </NavLink>
        )}
      </Flex>
      <span>Dash hasUser: {user && user.user_metadata.full_name}</span>
      <Flex
        as="form"
        onSubmit={async (e) => {
          e.preventDefault();
          if (Inputref.current.value !== "") {
            await addTodo({ variables: { value: Inputref.current.value } });
            Inputref.current.value = "";
            await refetch();
          }
        }}
      >
        <Label sx={{ display: "flex" }}>
          <Input ref={Inputref} sx={{ marginLeft: "3" }} />
        </Label>
        <Button type="submit">Submit</Button>
      </Flex>
      <Flex sx={{ flexDirection: "column" }}>
        {loading ? <div>Loading...</div> : null}
        {error ? <div>{error.message}</div> : null}
        {!loading && !error && (
          <ul>
            {data.todos.map((data) => (
              <Flex
                key={data.id}
                as="li"
                onClick={async () => {
                  await updateTodoDone({ variables: { id: data.id } });
                  console.log(data.id);
                  await refetch();
                }}
              >
                <Checkbox checked={data.done} />
                <span>{data.value}</span>
              </Flex>
            ))}
          </ul>
        )}
      </Flex>
    </Container>
  );
};

let DashLoggedOut = (props) => {
  const { identity: netlifyIdentity } = useContext(IdentityContext);
  return (
    <Flex>
      <Flex as="nav">
        <NavLink as={Link} to="/" p={2}>
          Home
        </NavLink>
        <NavLink as={Link} to={"/app"} p={2}>
          Dashboard
        </NavLink>
      </Flex>
      <Flex sx={{ flexDirection: "column", padding: 3 }}>
        <Heading as="h1">Hello Serverless</Heading>

        <Button
          sx={{
            marginTop: 3,
          }}
          onClick={() => {
            netlifyIdentity.open();
          }}
        >
          LogIn
        </Button>
      </Flex>
    </Flex>
  );
};

export default (props) => {
  const { user } = useContext(IdentityContext);

  if (!user) {
    return (
      <Router>
        <DashLoggedOut path="/app" />
      </Router>
    );
  }

  return (
    <Router>
      <Dash path="/app" />
    </Router>
  );
};

// render(
//   <Router>
//     <Dash path="/app" />
//   </Router>
// );
