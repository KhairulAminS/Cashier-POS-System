const router = require('express').Router();
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const cors = require('cors');
router.use(cors());

router.get('/products', async (req, res, next) => {
  try {

    const product = await prisma.product.findMany({})

    res.json(product)

  } catch (error) {
    next(error)
  }
});

router.get('/orders', async (req, res, next) => {

});

router.get('/orders/:reference_no', async (req, res, next) => {

  try {

    const refNum = req.params.reference_no;
    const order = await prisma.orders.findUnique({
      where: { reference_no: refNum }
    });

    res.json(order.id)

  } catch (error) {
    next(error);
  }
});

router.post('/orders', async (req, res, next) => {
  try {

    const order = await prisma.orders.create({
      data: req.body
    })

    res.json("Order created!")

  } catch (error) {
    next(error)
  }
});

router.post('/orders/items', async (req, res, next) => {
  try {

    const order = await prisma.order_items.create({
      data: req.body
    })

    res.json("Order item added!")

  } catch (error) {
    next(error)
  }
});

router.post('/orders/transaction', async (req, res, next) => {
  try {

    const order = await prisma.transaction.create({
      data: req.body
    })

    res.json("Order transaction details added!")

  } catch (error) {
    next(error)
  }
});

router.delete('/orders/:id', async (req, res, next) => {

});

router.patch('/orders/:id', async (req, res, next) => {

});

module.exports = router;
