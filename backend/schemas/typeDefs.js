const typeDefs = `

   type User{
    _id:ID!
    username: String
    email:String
    expenses: [Expense]
   } 

   type Expense{
    _id: ID!
    description: String!
    amount: Float!
    date: String!
    category: String!
   }
  
   type Auth{
    token: ID!
    user: User
   }

   type Query{
    me: User
    expenses:[Expense]
   }


   type Mutation{
    register(username: String! , email: String! , password: String!): Auth
    login(email:String! , password: String!): Auth
    addExpense(description: String!, amount: Float!, date: String!, category: String!): Expense
    updateExpense(_id: ID!, description: String, amount:Float, date:String! , category: String!): Expense
    deleteExpense(_id: ID!):Expense
   }

`;

module.exports = typeDefs;
