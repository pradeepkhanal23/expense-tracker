import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Dashboard } from "./views";
import Auth from "./pages/Auth";
import Hero from "./components/Hero";
import MainLayout from "./components/MainLayout";
import DashLayout from "./components/DashLayout";

// All apollo client related imports
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// it creates the HTTP link to our GraphQL server
const httpLink = createHttpLink({
  // adding url of our GraphQL Server
  //vite config will handle the req and act as the proxy that will redirect to the localhost:3001 to prevent the cors issue
  uri: "/graphql",
});

// Constructing request middleware that will attach the JWT token to every request as an `authorization` header
// The purpose of the "authLink" function is to set up an Apollo Link that injects the authentication token into the headers of each GraphQL request made by the Apollo Client. This ensures that all outgoing requests to the GraphQL server include the necessary authentication information, allowing the server to authenticate and authorize the requests.
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// now creating the new instance of Apollo Client
// link: Combines the authentication link (authLink) and the HTTP link (httpLink) using the concat method. This ensures that the authentication link processes requests first to add the auth headers, and then the HTTP link handles the request to the server.
// cache: Uses InMemoryCache to cache the query results.
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// setting up the router in the page
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <Hero />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
]);

const App = () => {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
};
export default App;
