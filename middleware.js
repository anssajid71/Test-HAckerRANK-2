module.exports = (req, res, next) => {
  const { page, limit, searchTerm } = req.query;

  const parsedPage = parseInt(page, 10) || 1;
  const parsedLimit = parseInt(limit, 10) || 9;
  const parsedSkip = (parsedPage - 1) * parsedLimit;
  const searchRegex = new RegExp(searchTerm, 'gi');

  req.context = {
    page: parsedPage,
    limit: parsedLimit,
    skip: parsedSkip,
    searchTerm,
    search: searchRegex,
  };

  next();
};
