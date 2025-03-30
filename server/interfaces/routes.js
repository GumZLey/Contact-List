const express = require("express");
const signInInteractor = require("../usecases/signInInteractor");
const addInteractor = require("../usecases/addInteractor");
const editInteractor = require("../usecases/editInteractor");
const deleteInteractor = require("../usecases/deleteInteractor");
const getContactsInteractor = require("../usecases/getContactsInteractor");

const router = express.Router();

router.post("/signIn", async (req, res, next) => {
  try {
    const result = await signInInteractor(req.body);
    if (result.success) {
      res.status(200).json({ message: "Sign-in successful" });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/contacts", async (req, res, next) => {
  try {
    const contact = await addInteractor(req.body);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
});

router.put("/contacts/:id", async (req, res, next) => {
  try {
    const updatedContact = await editInteractor(req.params.id, req.body);
    if (!updatedContact) {
      res.status(404).json({ error: "Contact not found" });
    } else {
      res.status(200).json(updatedContact);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/contacts/:id", async (req, res, next) => {
  try {
    const result = await deleteInteractor(req.params.id);
    if (result.success) {
      res.status(200).json({ message: "Contact deleted" });
    } else {
      res.status(404).json({ error: "Contact not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/contacts", async (req, res, next) => {
  try {
    const contacts = await getContactsInteractor();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

module.exports = (app) => {
  app.use("/", router);
};
