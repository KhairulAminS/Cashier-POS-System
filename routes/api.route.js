const router = require('express').Router();
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const cors = require('cors');
router.use(cors());

//Get all products
router.get('/products', async (req, res, next) => {
  try {

    const product = await prisma.product.findMany({})

    res.json(product)

  } catch (error) {
    next(error)
  }
});


//Get all orders including transaction and order items
router.get('/orders/all', async (req, res, next) => {
  try {
    const orders = await prisma.orders.findMany({
      include:{
        transaction: true,
        order_items: true
      }
    })

    orders.map((order) => (
      order.transaction.map((data) => (
        data.order_id = data.order_id.toString()
      )),

      order.order_items.map((data) => (
        data.order_id = data.order_id.toString()
      ))
    ))

    res.json(orders)
  } catch (error) {
    next(error);
  }
});

//Get all orders
router.get('/orders', async (req, res, next) => {
  try {
    const orders = await prisma.orders.findMany({})

    res.json(orders)
  } catch (error) {
    next(error);
  }
});

//Get all transactions
router.get('/orders/transactions', async (req, res, next) => {
  try {
    const transaction = await prisma.transaction.findMany({})

    transaction.map((data) => (
      data.order_id = data.order_id.toString()
    ))

    res.json(transaction)
  } catch (error) {
    next(error);
  }
});

//Get all order items
router.get('/orders/items', async (req, res, next) => {
  try {
    const items = await prisma.order_items.findMany({})

    items.map((data) => (
      data.order_id = data.order_id.toString()
    ))

    res.json(items)
  } catch (error) {
    next(error);
  }
});


//Get order by reference number
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

//Create new product
router.post('/products', async (req, res, next) => {
  try {

    const order = await prisma.product.create({
      data: req.body
    })

    res.json("Product created!")

  } catch (error) {
    next(error)
  }
});

//Create new order
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


//Create new item
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


//Create new transaction
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


//Update status in order and transaction
router.put('/orders/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const update = await prisma.orders.update({
      where: {
        id: id
      },
      data: {
        status: req.body.status,
        transaction : {
          updateMany: {
            where: {
              status: "Pending"
            },
            data: {
              status: req.body.status,
            }
          }
        }
      }
    })

    res.json("Order's status has been updated!")

  } catch (error) {
    next(error)
  }
});

module.exports = router;
