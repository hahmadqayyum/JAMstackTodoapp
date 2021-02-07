import React from "react";
import { Button, Container, Flex, Heading } from "theme-ui";
import netlifyIdentity from "netlify-identity-widget";

netlifyIdentity.init({});

export default (props) => (
  <Container>
    <Flex sx={{ flexDirection: "column", padding: 3 }}>
      <Heading as="h1">Hello Serverless</Heading>
      <Button
        sx={{
          marginTop: 3,
          outline: "none",
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
