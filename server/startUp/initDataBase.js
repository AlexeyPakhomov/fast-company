const Profession = require('../models/Profession');
const Quality = require('../models/Quality');
const professionMock = require('../mockData/professions.json');
const qualityMock = require('../mockData/qualities.json');

module.exports = async () => {
  const professions = await Profession.find();
  if (professions.length !== professionMock.length) {
    await createInitialEntity(Profession, professionMock);
  }
  const qualities = await Quality.find();

  if (qualities.length !== qualityMock.length) {
    await createInitialEntity(Quality, qualityMock);
  }
};

async function createInitialEntity(Model, data) {
  const collectionExists = await Model.exists();
  if (collectionExists) {
    await Model.collection.drop();
  }

  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        // или Model.create(item)
        return newItem;
      } catch (e) {
        return e.message;
      }
    }),
  );
}
