function successResponse(data, statusCode = 200) {
    return {
      statusCode,
      body: JSON.stringify({ success: true, data }),
    };
  }
    function errorResponse(errorMessage, statusCode = 500) {
    return {
      statusCode,
      body: JSON.stringify({ success: false, error: errorMessage }),
    };
  }
  
  module.exports = {
    successResponse,
    errorResponse,
  };
  