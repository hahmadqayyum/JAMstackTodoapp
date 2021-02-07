import React, { useEffect } from "react";
import { Button, Container, Flex, Heading } from "theme-ui";
import netlifyIdentity from "netlify-identity-widget";

export default (props) => {
  useEffect(() => {
    netlifyIdentity.init({});
  });
  return (
    <Container>
      <Flex sx={{ flexDirection: "column", padding: 3 }}>
        <Heading as="h1">Hello Serverless</Heading>
        <Button
          sx={{
            marginTop: 3,
            outline: "none",
          }}
          onClick={() => {
            console.log(netlifyIdentity.currentUser());
            netlifyIdentity.open();
          }}
        >
          LogIn
        </Button>
      </Flex>
    </Container>
  );
};
