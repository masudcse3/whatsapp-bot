/** @format */
const Record = require("./model/Record");
const generateMsg = (name, mobile, unit, project) => {
  const message = `Dear ${name},\nI attempted to contact you regarding your property ${unit} in ${project}.\n\nIf you are interested in Renting or Selling your property, please do not hesitate to get in touch with me.\n\nPlease state "YES" if you are interested and we will assist you.\n\nThank you`;
  const encodedMessage = encodeURIComponent(message);
  return `https://web.whatsapp.com/send?phone=${mobile}&text=${encodedMessage}`;
};

const record = async (name, mobile, unit, project) => {
  try {
    const doc = new Record({
      name: name,
      mobile: mobile,
      unit: unit,
      project: project,
    });

    await doc.save();
  } catch (error) {
    console.error(error);
  }
};
module.exports = { generateMsg, record };
