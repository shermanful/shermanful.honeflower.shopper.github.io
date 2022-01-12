const { Cart } = require("../db/models")
const router = require("express").Router()


router.post("/:id", async (req, res, next) => {
  try {
    const [ userCart, created ] = await Cart.findOrCreate( {where: {
      cartId: req.params.id,
      status: "open"
    }})
    if (created) {
      res.json(userCart)
    } else {
      res.json("Cannot have two open carts") // can we merge carts? or is this a case of please sign in?
    }
  } catch (err) {
    next(err)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const userCart = await Cart.findOne( {where: {
      cartId: req.params.id,
      status: "Open"
    }})
    res.json(userCart)
  } catch (err) {
    next(err)
  }
})

router.put("/:id", async (req, res, next) => {
  try {
    const userCart = await Cart.findOne( {where: {
      cartId: req.params.id,
      status: "Open"
    }})
  res.json(await userCart.update(req.body))
  } catch (err) {
    next(err)
  }
})

router.get("/:id/:userId", async (req, res, next) => {
  try {
    const userCart = await Cart.findOne( {where: {
      userId: req.params.userId,
      status: "Open"
    }})
    res.json(userCart)
  } catch (err) {
    next(err)
  }
})

router.put("/:id/:userId", async (req, res, next) => {
  try {
    const userCart = await Cart.findOne( {where: {
      userId: req.params.userId,
      status: "Open"
    }})
  res.json(await userCart.update(req.body))
  } catch (err) {
    next(err)
  }
})
//is cart with id when guest, and then /:id/:userId when logged in?
//does cart model need guest id?
//no deleting of cart since we will use 'placed' to 'clear cart '