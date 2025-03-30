const Contact = require('../domain/entities/Contact');

const addInteractor = async ({ contactID, firstName, lastName, phone, email, facebook, imageUrl }) => {
    try {
        const contact = new Contact({
            contactID,
            firstName,
            lastName,
            phone,
            email,
            facebook,
            imageUrl,
        });

        await contact.save();
    } catch (error) {
        console.error("Error adding contact:", error);
        throw new Error("Failed to add contact");
    }
};

module.exports = addInteractor;