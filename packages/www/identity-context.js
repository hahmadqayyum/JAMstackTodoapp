const React = require("react");
const netlifyIdentity = require("netlify-identity-widget");
const { useState, useEffect } = require("react");

const IdentityContext = React.createContext({});

exports.IdentityContext = IdentityContext;

const IdentityProvider = ({ children }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    netlifyIdentity.init({});
  });
  netlifyIdentity.on("login", (user) => {
    netlifyIdentity.close();
    setUser(user);
  });
  netlifyIdentity.on("logout", () => {
    netlifyIdentity.close();
    setUser();
  });

  return (
    <IdentityContext.Provider
      value={{
        identity: netlifyIdentity,
        user,
      }}
    >
      {children}
    </IdentityContext.Provider>
  );
};

exports.Provider = IdentityProvider;
