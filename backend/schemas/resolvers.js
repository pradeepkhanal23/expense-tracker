const { User, Expense } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const { GraphQLError } = require("graphql");

const resolvers = {
  Query: {
    // Query to get the currently authenticated user and their expenses
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("expenses");
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    // Mutation to register a new user and return a token
    register: async (parent, { username, email, password }) => {
      // Create a new user in the database
      const user = await User.create({ username, email, password });
      // Generate a token for the newly created user
      const token = signToken(user);
      // Return the user and the token
      return { token, user };
    },

    // Mutation to log in a user and return a token
    login: async (parent, { email, password }) => {
      // Find the user by their email
      const user = await User.findOne({ email });

      // If the user does not exist, throw an authentication error
      if (!user) {
        throw AuthenticationError;
      }

      // Verify the user's password
      const correctPw = await user.isCorrectPassword(password);

      // If the password is incorrect, throw an authentication error
      if (!correctPw) {
        throw AuthenticationError;
      }

      // Generate a token for the authenticated user
      const token = signToken(user);
      // Return the user and the token
      return { token, user };
    },

    // Mutation to add a new expense for the authenticated user
    addExpense: async (
      parent,
      { description, amount, date, category },
      context
    ) => {
      // Ensure the request is authenticated
      if (context.user) {
        try {
          //checking if the expense with the same description is present
          const existingExpense = await Expense.findOne({ description });

          if (existingExpense) {
            // If an expense with the same description exists, we throw an error
            throw new GraphQLError(
              "An expense with the same description already exists",
              {
                extensions: {
                  code: "BAD_USER_INPUT",
                },
              }
            );
          }

          // Create a new expense and associate it with the user
          const newExpense = await Expense.create({
            description,
            amount,
            date,
            category,
          });

          await newExpense.save();

          console.log(newExpense);
          // Add the new expense to the user's list of expenses
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $push: { expenses: newExpense._id } },
            { new: true }
          );

          // Return the created expense
          return newExpense;
        } catch (err) {
          console.log(err);
          // Throw an error if there is an issue adding the expense
          throw new GraphQLError("Error adding expense", {
            extensions: {
              code: "INTERNAL_SERVER_ERROR",
            },
          });
        }
      }
      // Throw an authentication error if the user is not authenticated
      throw AuthenticationError;
    },

    // Mutation to update an existing expense
    updateExpense: async (
      parent,
      { _id, description, amount, date, category },
      context
    ) => {
      // Ensure the request is authenticated
      if (context.user) {
        try {
          // Update the expense details
          const updatedExpense = await Expense.findOneAndUpdate(
            { _id },
            { description, amount, date, category },
            { new: true, runValidators: true }
          );

          // Return the updated expense
          return updatedExpense;
        } catch (err) {
          console.log(err);
          // Throw an error if there is an issue updating the expense
          throw new GraphQLError("Error updating expense", {
            extensions: {
              code: "INTERNAL_SERVER_ERROR",
            },
          });
        }
      }
      // Throw an authentication error if the user is not authenticated
      throw AuthenticationError;
    },

    // Mutation to delete an expense
    deleteExpense: async (parent, { _id }, context) => {
      // Ensure the request is authenticated
      if (context.user) {
        try {
          // Find and delete the expense
          const deletedExpense = await Expense.findByIdAndDelete(_id);

          // Remove the deleted expense from the user's list of expenses
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { expenses: _id } },
            { new: true }
          );

          // Return the deleted expense
          return deletedExpense;
        } catch (err) {
          console.log(err);
          // Throw an error if there is an issue deleting the expense
          throw new GraphQLError("Error deleting expense", {
            extensions: {
              code: "INTERNAL_SERVER_ERROR",
            },
          });
        }
      }
      // Throw an authentication error if the user is not authenticated
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
