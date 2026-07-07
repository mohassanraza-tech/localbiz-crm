const getErrorMessage = (error, fallback = 'Something went wrong. Please try again.') => {
  if (!error) return fallback;

  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  if (error.code === 'ERR_NETWORK') {
    return 'Cannot reach server. Make sure the backend is running.';
  }

  if (error.message) {
    return error.message;
  }

  return fallback;
};

export default getErrorMessage;
