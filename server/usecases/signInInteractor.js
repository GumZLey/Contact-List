const Account = require("../domain/entities/Account");

const signInInteractor = async ({ username, password }) => {
    const account = await Account.findOne({
        userName: username,
        password: password,
    });

    return account ? { success: true } : { success: false };
};

module.exports = signInInteractor;
