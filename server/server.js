const express = require("express");
const { postgraphile } = require("postgraphile");

const app = express();

app.use(
  postgraphile(
    process.env.DATABASE_URL ||
      "postgres://Scloak:scloak777@localhost:5432/postgraphile",
    ["anbar", "users"],
    {
      watchPg: true,
      dynamicJson: true,
      enableCors: true,
      pgDefaultRole: "user_anonymous",
      graphiql: true,
      enhanceGraphiql: true,
      jwtSecret: "secret_for_jwts",
      jwtPgTypeIdentifier: "users.jwt",
      showErrorStack: true,
      extendedErrors: ["hint", "detail", "errcode"],
      appendPlugins: [
        require("@graphile-contrib/pg-simplify-inflector"),
        require("postgraphile-plugin-connection-filter"),
      ],
    }
  )
);

app.listen({ port: 3000 }, () => {
  console.log("app listen on port  3000");
});
