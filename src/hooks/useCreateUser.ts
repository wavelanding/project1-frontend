import { useMutation } from "@apollo/client";
import { graphql } from "../gql";

/**
 * Why there's a outer CreateUser in the query??
 * Executing a Mutation: When you call the createUser function (obtained from the useMutation hook) in your component, you're actually invoking the outer CreateUser mutation that you defined with the gql tag.
 * The useMutation hook uses the Apollo Client instance (obtained from context) to send this mutation to your GraphQL server.
 *
 * rename $createUserInput to $createUserPayload to avoid confusion!
 */

const createUserDocument = graphql(`
  mutation CreateUser($createUserPayload: CreateUserInput!) {
    createUser(createUserInput: $createUserPayload) {
      _id
      email
    }
  }
`);

const useCreateUser = () => {
  return useMutation(createUserDocument);
};

export { useCreateUser };
