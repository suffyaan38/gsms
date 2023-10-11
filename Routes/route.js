const express=require('express');
const router=express.Router();
const shopController=require('../Controllers/shop');

router.get('/get-items',shopController.getAll);
router.post('/add-items',shopController.saveItems);
router.patch('/edit-items/:id/:qty',shopController.editQuantity);

module.exports=router;