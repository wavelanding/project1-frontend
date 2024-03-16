// use debuger to inspect the error structure
const extractErrorMessage = (err: any) => {
  const errorMessage = err.graphQLErrors[0]?.extensions?.originalError?.message;
  if (!errorMessage) {
    return;
  }
  if (Array.isArray(errorMessage)) {
    return errorMessage[0];
  } else {
    return errorMessage;
    // return formatErrorMessage(errorMessage);
  }
};

// purpose: error message => Error message. low yield! igonre
// const formatErrorMessage = (errorMessage: string) => {
//   return errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
// };

export { extractErrorMessage };
