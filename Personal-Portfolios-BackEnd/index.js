const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const port = process.env.PORT || 5000;

/* middleware */
app.use(cors());
app.use(express.json());

// MongoDB connection string
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ot5ajnb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        /* all collections */
        const database = client.db("personalPortfoliosDb");
        const donationCollection = database.collection("donations");
        const volunteeringCollection = database.collection("volunteerings");
        const bookmarkCollection = database.collection("bookmarks");

        /* donation */
        app.get("/donations", async (req, res) => {
            const result = await donationCollection.find().toArray();
            console.log(result);

            res.send(result);
        });

        app.post("/donation", async (req, res) => {
            const donationItem = req.body;
            // console.log("donationItem: ", donationItem);

            const result = await donationCollection.insertOne(donationItem);
            console.log(result);

            res.send(result);
        });

        app.delete("/donation/:id", async (req, res) => {
            const id = req.params.id;
            console.log(id);

            const query = { _id: new ObjectId(id) }
            const result = await donationCollection.deleteOne(query);
            console.log(result);

            res.send(result);
        });

        /* volunteering */
        app.get("/volunteerings", async (req, res) => {
            const result = await volunteeringCollection.find().toArray();
            console.log(result);

            res.send(result);
        });

        app.post("/volunteering", async (req, res) => {
            const volunteeringItem = req.body;
            console.log("volunteeringItem: ", volunteeringItem);

            const result = await volunteeringCollection.insertOne(volunteeringItem);
            console.log(result);

            res.send(result);
        });

        app.delete("/volunteerings/:id", async (req, res) => {
            const id = req.params.id;
            console.log(id);

            const query = { _id: new ObjectId(id) };
            const result = await volunteeringCollection.deleteOne(query);

            console.log(result);
            res.send(result);
        });

        /* bookmark */

        app.post(`/bookmark`, async (req, res) => {
            const bookmarkItem = req.body;
            console.log(bookmarkItem);

            const result = await bookmarkCollection.insertOne(bookmarkItem);
            console.log(result);
            res.send(result);
        });

        app.delete(`/bookmark/:id`, async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = { _id: new ObjectId(id) }

            const result = await bookmarkCollection.deleteOne(query)
            res.send(result);
        });

        app.post(`/bookmarks`, async (req, res) => {
            const reqEmail = req.body.email;
            console.log(reqEmail);

            const query = { email: reqEmail };
            const result = await bookmarkCollection.find(query).toArray();
            // console.log(result);

            res.send(result)
        });

        /* payment intent */
        app.post("/create-payment-intent", async (req, res) => {

            const { price } = req.body;
            const amount = parseInt(price * 100);
            console.log("payment intent amount: ", amount);

            // Create a PaymentIntent with the order amount and currency
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: "usd",
                payment_method_types: ["card"],
            })

            res.send({
                clientSecret: paymentIntent.client_secret
            });
        });

        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


// base url for server
app.get("/", (req, res) => {
    console.log(`Application: base-url get route`);
    res.send(`Personal Portfolios Server application is running...`)
})

app.listen(port, (req, res) => {
    console.log(`Personal Portfolios Server applicaiton is running on: ${port}`);
});