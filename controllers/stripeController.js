const stripe = require('stripe');
const { StatusCodes } = require('http-status-codes');
require('dotenv').config()

const stripeController = async (req, res) => {

    const stripe = require('stripe')(process.env.STRIPE_SECRET);
    const { total_amount, shipping_fee } = req.body

    const totalPurchase = () => {
        return total_amount + shipping_fee
    }
    const paymentIntent = await stripe.paymentIntents.create({
        amount: totalPurchase(),
        currency: 'usd',
    });
    console.log(paymentIntent.client_secret);
    res.status(StatusCodes.OK).json({ clientSecret: paymentIntent.client_secret })
}

module.exports = stripeController