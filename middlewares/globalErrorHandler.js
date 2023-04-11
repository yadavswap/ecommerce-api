export const globalErrHandler = (err, req, res, next) => {
    // stack
    // message
    const error = err?.stack;
    const statusCode = err.statusCode?err?.statusCode : 500;
    const message = err?.message;
    res.status(statusCode).json({
        error,
        message
    })
}

// 404 handler

export const notFound = (req,res,next)=>{
    const err = new Error(`Route ${req.originalUrl} not found`)
    next(err)
}