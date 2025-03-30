const Contact = require("../domain/entities/Contact");

const deleteInteractor = async (id) => {
  try {
    const result = await Contact.findByIdAndDelete(id);
    return result ? { success: true } : { success: false };
  } catch (error) {
    console.error("Error deleting contact:", error);
    return { success: false };
  }
};

module.exports = deleteInteractor;
