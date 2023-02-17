const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const USERS = 'users';
const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this.id = id;
  }

  save() {
    const db = getDb();
    return db.collection(USERS).insertOne(this);
  }

  static addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQty = 1;
    const updatedCartItems = [...this.cart.items];
    
    if (cartProductIndex >= 0) {
      newQty = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQty;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQty,
      });
    }
    const updatedCart = {
      items: updatedCartItems,
    };
    const db = getDb();
    return db
      .collection(USERS)
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  static findById(id) {
    const db = getDb();
    return db
      .collection(USERS)
      .findOne({ _id: new ObjectId(id) })
      .then((user) => user)
      .catch((err) => console.error(err));
  }
}

module.exports = User;
