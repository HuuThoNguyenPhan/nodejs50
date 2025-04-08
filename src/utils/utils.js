function checkMissingField(res, data, checksField = []) {
  if (data === undefined || data === null) {
    res.status(400).json({ message: "Model is not valid!" });
    return false;
  }

  if (Array.isArray(checksField) && checksField.length > 0) {
    for (let field of checksField) {
      if (!(field in data) || data[field] === null || data[field] === "") {
        res.status(400).json({ message: `Field '${field}' cannot be null or empty!` });
        return false;
      }
    }
  }

  return true;
}

module.exports = {
  checkMissingField,
};