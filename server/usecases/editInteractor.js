const Contact = require("../domain/entities/Contact");

const editInteractor = async (id, updatedData) => {
  try {
    const result = await Contact.findByIdAndUpdate(id, updatedData, { new: true }); // Return the updated contact
    return result ? result : null; // Return the updated contact or null if not found
  } catch (error) {
    console.error("Error updating contact:", error);
    throw new Error("Failed to update contact");
  }
};

module.exports = editInteractor;
