const db = require('../../dataBase/models');

module.exports = async function (req, res) {
  try {
    const ranks = await db.Rank.findAll();
    res.send(ranks);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while fetching ranks.' });
  }
};