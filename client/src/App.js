import React, { useMemo } from "react";
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";

const App = () => {
  // Apollo Clientを初期化する
  const client = useMemo(
    () => new ApolloClient({ uri: "http://localhost:4000" }),
    []
  );

  return (
    <div className="App">
      <ApolloProvider client={client}>
        <div>
          <h2>
            My first Apollo app{" "}
            <span role="img" aria-label="Rocket">
              🚀
            </span>
          </h2>
          <Books />
        </div>
      </ApolloProvider>
    </div>
  );
};

const Books = () => {
  // 発行クエリを定義する
  const booksQuery = useMemo(
    () => gql`
      {
        books {
          title
          author
        }
      }
    `,
    []
  );

  // クエリを発行する
  const { loading, error, data } = useQuery(booksQuery);

  // 結果を表示する
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.books.map(({ title, author }, index) => (
    <div key={title}>
      <h3>book{index + 1}</h3>
      <p>title:{title}</p>
      <p>author:{author}</p>
    </div>
  ));
};

export default App;
