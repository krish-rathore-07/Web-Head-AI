const getErrorMessage = (
  error,
  fallbackMessage = "Something went wrong"
) => {
  // Backend error response
  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  // Network error
  if (!error.response) {
    return "Unable to connect to the server";
  }

  return fallbackMessage;
};

export default getErrorMessage;