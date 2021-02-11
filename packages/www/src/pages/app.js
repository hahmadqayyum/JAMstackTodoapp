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
import { IdentityContext } from "../../identity-context";

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
    case "TOGGLE_TODO":
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
        onSubmit={(e) => {
          e.preventDefault();
          if (!Inputref.current.value == "") {
            dispatch({
              type: "ADD_TODO",
              payload: Inputref.current.value,
            });
            Inputref.current.value = "";
          }
        }}
      >
        <Label sx={{ display: "flex" }}>
          <Input ref={Inputref} sx={{ marginLeft: "3" }} />
        </Label>
        <Button type="submit">Submit</Button>
      </Flex>
      <Flex sx={{ flexDirection: "column" }}>
        <ul>
          {todo.map((data, i) => (
            <Flex
              as="li"
              onClick={() => {
                dispatch({
                  type: "TOGGLE_TODO",
                  payload: i,
                });
              }}
            >
              <Checkbox checked={data.done} />
              <span>{data.value}</span>
            </Flex>
          ))}
        </ul>
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
