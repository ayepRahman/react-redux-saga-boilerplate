export default error => {
  let errMsg = error && error.response && error.response.data && error.response.data.errorMsg;

  if (errMsg === undefined || errMsg.length <= 0) {
    errMsg = 'Something went wrong. Please try again.';
  }

  return errMsg;
};
