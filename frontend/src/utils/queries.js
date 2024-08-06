import { gql } from "@apollo/client";

//query to get the logged-in user's info
export const GET_ME = gql`
  query Me {
    me {
      _id
      email
      username
      expenses {
        _id
        amount
        category
        date
        description
      }
    }
  }
`;
