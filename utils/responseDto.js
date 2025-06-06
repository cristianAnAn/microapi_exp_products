// utils/responseDto.js

function response(success = true, message = '', data = null) {
  return {
    success,
    message,
    data
  };
}

module.exports = response;
