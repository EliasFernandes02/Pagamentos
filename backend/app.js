import express from 'express';
import Stripe from 'stripe';
import bodyParser from 'body-parser'; 
import cors from 'cors'; 
import dotenv from "dotenv"
dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/create-checkout-session', async (req, res) => {
    try {
        const { amount } = req.body; 

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'brl',
                    product_data: {
                        name: 'Selected Product',
                    },
                    unit_amount: amount, 
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: 'http://localhost:5500/frontend/sucess.html',
            cancel_url: 'https://your-website.com/cancel',
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(4242, () => console.log('Servidor rodando na porta 4242'));
