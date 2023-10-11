const Item = require('../Models/item');

exports.getAll = (req, res, next) => {
  Item.findAll()
    .then((userData) => {
      res.json(userData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
};

exports.saveItems = (req, res, next) => {
  const item_name = req.body.item_name;
  const description = req.body.description;
  const price = req.body.price;
  const quantity = req.body.quantity;
  Item.create({
    item_name: item_name,
    description: description,
    price: price,
    quantity: quantity
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
};

exports.editQuantity = (req, res, next) => {
  const id = req.params.id;
  const qty = req.params.qty;

  Item.findByPk(id)
    .then((row) => {
      if (!row) {
        // Handle if the item with the given ID is not found
        return res.status(404).json({ error: 'Item not found' });
      }
      
      // Ensure qty is a number before subtraction
      if (!isNaN(qty)) {
        row.quantity = row.quantity - qty;
        row.save()
          .then((updatedRow) => {
            res.json(updatedRow);
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send('Internal Server Error');
          });
      } else {
        res.status(400).json({ error: 'Invalid quantity value' });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
};
