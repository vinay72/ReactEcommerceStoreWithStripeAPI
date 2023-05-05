// sk_test_51LnUKJDM1jwCEz8OJG69szv032rIo4X0WrFMaXrqxu9g8fdohsL1y54JEUhFUKrqoBquVjN3AzpIFyrbN915bgcd00O5hqoGCJ
// Coffee: price_1LnUTFDM1jwCEz8OGoOSXiSM
// Sunglasses: price_1LnUTxDM1jwCEz8OAqHYTwKQ
// Camera: price_1LnUUoDM1jwCEz8OvxIcJ7to
const express = require('express');
var cors = require('cors');
const stripe = require('stripe')('sk_test_51MnPuzSDWIdOcoieFyPfq4mwrIdaIenJGKAL6YE7QHRXaoG4hgAOgYRbtpJPkH37f8BMsaDDp0ZSDYjFz7u9DzLD00tdkf7eVp');
//var CUSTOMER_ID = 'cus_Noq4IzyokPrZVS'
const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {

    console.log(req.body);
    const items = req.body.items;
    console.log('items', items)
    let lineItems = [];
    items.forEach((item) => {
        lineItems.push(
            {
                price: item.id,
                quantity: item.quantity
            }
        )
    });

    const session = await stripe.checkout.sessions.create({
        //line_items: lineItems,
        line_items: [
            { "price": "price_1N1wjUSDWIdOcoiem4m2QHd8", "quantity": 1 },
            //{ "price": "price_1N1yLnSDWIdOcoie463iRltL", "quantity": 1 },
            //{ "price": "price_1N1xyNSDWIdOcoieDGXsub6U", "quantity": 1 },
            //{ "price": "price_1N3BxTSDWIdOcoieyuJ8Rl0N", "quantity": 1 },
        ],
        mode: 'subscription',
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
        metadata: {
            "rr_customer_id": "201",
        },
    });

    res.send(JSON.stringify({
        url: session.url
    }));
});

app.post('/create-customer-portal-session', async (req, res) => {
    // Authenticate your user.
    console.log(req.body);
    const CUSTOMER_ID = req.body.customer_id;

    const customer = await stripe.customers.update(CUSTOMER_ID, {
        metadata: {
            rr_customer_id: '201',
        },
    });


    const session = await stripe.billingPortal.sessions.create({
        customer: CUSTOMER_ID,
        return_url: 'http://localhost:3000/success',
    });

    res.redirect(session.url);
});

app.listen(4000, () => console.log("Listening on port 4000!"));