import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_EXPENSE = gql`
  mutation addExpense(
    $description: String!
    $amount: Float!
    $date: String!
    $category: String!
  ) {
    addExpense(
      description: $description
      amount: $amount
      date: $date
      category: $category
    ) {
      _id
      description
      amount
      date
      category
    }
  }
`;

export const UPDATE_EXPENSE = gql`
  mutation updateExpense(
    $_id: ID!
    $description: String
    $amount: Float
    $date: String!
    $category: String!
  ) {
    updateExpense(
      _id: $_id
      description: $description
      amount: $amount
      date: $date
      category: $category
    ) {
      _id
      description
      amount
      date
      category
    }
  }
`;

export const DELETE_EXPENSE = gql`
  mutation deleteExpense($_id: ID!) {
    deleteExpense(_id: $_id) {
      _id
      description
      amount
      date
      category
    }
  }
`;
