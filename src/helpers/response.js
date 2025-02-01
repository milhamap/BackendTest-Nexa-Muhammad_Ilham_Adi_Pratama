const ResponseFormatter = (res, code, message, status = 'success', data = null) => {
    return res.status(code).json({ status, message, data, code });
}

const ResponseFormatterPagination = (res, code, message, status = 'success', data = null, metadata) => {
    return res.status(code).json({ status, message, data, code, metadata });
}

module.exports = {
    ResponseFormatter,
    ResponseFormatterPagination
};