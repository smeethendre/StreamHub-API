const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    res.send(err.code || 500).json({
      success: false,
      Message: err.Message,
    });
  }
};

export default asyncHandler;


//this wrapper function wrapps around the route functions such that you error are handled. 