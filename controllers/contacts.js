const { response } = require('express');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res,) => {
   //#swagger.tags=['contacts']
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  });
};

const getSingle = async (req, res,) => {
   //#swagger.tags=['contacts']
  const contactsId = new ObjectId(req.params.id);  
  const result = await mongodb.getDatabase().db().collection('contacts').find({ _id: contactsId});
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts[0]);
  });
};

const createContact = async (req, res,) => {
   //#swagger.tags=['contacts']
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
  if (response.acknowledged) {res.status(204).send();
   } else {
      res.status(500).json(response.error || 'some error occurred while updating the contact.');
    } 
};

const updateContact = async (req, res,) => {
   //#swagger.tags=['contacts']
  const contactsId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({ _id: contactsId},contact);
  if (response.modifiedCount > 0) {res.status(204).send();
   } else {
      res.status(500).json(response.error || 'some error occurred while updating the contact.');
    } 
};

const deleteContact = async (req, res,) => {
   //#swagger.tags=['contacts']
  const contactsId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: contactsId});
   if (response.deletedCount > 0) {
    res.status(204).send();
   } else {
      res.status(500).json(response.error || 'some error occurred while deleting the contact.');
    } 

};
module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};