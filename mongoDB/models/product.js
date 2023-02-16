const mongodb = require('mongodb')
const getDb = require('../util/database').getDb;

const PRODUCTS = 'products'

class Product {
  constructor(title, price, imageUrl, description, id) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this._id = id ? new mongodb.ObjectId(id) : null;
  }

  save() {
    const db = getDb();
    let dbOperation;
    if (this._id) {
      dbOperation = db
        .collection(PRODUCTS)
        .updateOne({ _id: this._id }, { $set: this })
    } else {
      dbOperation = db.collection(PRODUCTS).insertOne(this);
    }
    return dbOperation
      .then(result => {
        console.log('Success.');
      })
      .catch(err => {
        console.error(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection(PRODUCTS)
      .find()
      .toArray()
      .then(products => {
        return products;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(id) {
    const db = getDb();
    return db
      .collection(PRODUCTS)
      .find({ _id: new mongodb.ObjectId(id) })
      .next()
      .then(product => {
        return product;
      }).catch(err => console.error(err))
  }

  static deleteById(id) {
    const db = getDb();
    return db
      .collection(PRODUCTS)
      .deleteOne({ _id: new mongodb.ObjectId(id) })
      .then(result => console.log('Success.'))
      .catch(err => console.error(err))
  }
}

module.exports = Product;
