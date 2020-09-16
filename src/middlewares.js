//express middleware는 아님. graphQL middleware 같은것임.
export const isAuthenticated = (request) => {
  if (!request.user) {
    throw Error("You need to log in to perform this action.");
  }
  return;
};
