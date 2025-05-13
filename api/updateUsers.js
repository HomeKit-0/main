const fs = require('fs');

module.exports = (req, res) => {
  if (req.method === 'POST') {
    const updatedUsers = req.body;
    fs.writeFileSync('./users.json', JSON.stringify(updatedUsers, null, 2));
    res.status(200).json({ message: 'Users updated successfully' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
