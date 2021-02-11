import React, { useContext } from "react";
import { Link } from "gatsby";
import { Button, Container, Flex, Heading, NavLink } from "theme-ui";
import { IdentityContext } from "../../identity-context";
export default (props) => {
  const { user, identity: netlifyIdentity } = useContext(IdentityContext);

  if (user) {
    return (
      <Container>
        <Flex as="nav">
          <NavLink as={Link} to="/" p={2}>
            Home
          </NavLink>
          <NavLink as={Link} to={"/app"} p={2}>
            DashBord
          </NavLink>
          {user && (
            <NavLink
              href="#!"
              p={2}
              onClick={() => {
                netlifyIdentity.logout();
              }}
            >
              Log out {user.user_metadata.full_name}
            </NavLink>
          )}
        </Flex>
        <Flex sx={{ flexDirection: "column", padding: 3 }}>
          <Heading as="h1">Logged In Welcome to Home</Heading>
        </Flex>
      </Container>
    );
  }

  return (
    <Container>
      <Flex as="nav">
        <NavLink as={Link} to="/" p={2}>
          Home
        </NavLink>
        <NavLink as={Link} to={"/app"} p={2}>
          DashBord
        </NavLink>
        {user && (
          <NavLink href="#!" p={2}>
            {user.user_metadata.full_name}
          </NavLink>
        )}
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
    </Container>
  );
};
