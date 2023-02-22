const handleError = (err) => {
  const error = new Error(err);
  error.httpStatusCode = 500;
  return next(error);
};

exports.handleError = handleError;
