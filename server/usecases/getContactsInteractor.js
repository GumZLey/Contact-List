const Contact = require("../domain/entities/Contact");

const getContactsInteractor = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw new Error("Failed to fetch contacts");
  }
};

module.exports = getContactsInteractor;
