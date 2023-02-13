const fs = require('fs');
const path = require('path');

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    const p = path.join(
      path.dirname(require.main.filename),
      'data',
      'products.json'
    );
    
    fs.readFile(p, (err, fileContent) => {
      if (err) return;
      let products = [];
      products = JSON.parse(fileContent);
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.error(err);
      });
    });
  }

  static fetchAll(cb) {
    const p = path.join(
      path.dirname(require.main.filename),
      'data',
      'products.json'
    );

    fs.readFile(p, (err, fileContent) => {
      if (err) cb([]);
      cb(JSON.parse(fileContent));
    });
  }
};
