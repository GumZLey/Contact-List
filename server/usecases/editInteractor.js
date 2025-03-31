const Contact = require("../domain/entities/Contact");

const editInteractor = async (id, updatedData) => {
  try {
    const result = await Contact.findByIdAndUpdate(id, updatedData, { new: true });
    return result ? result : null; 
  } catch (error) {
    console.error("Error updating contact:", error);
    throw new Error("Failed to update contact");
  }
};

module.exports = editInteractor;
