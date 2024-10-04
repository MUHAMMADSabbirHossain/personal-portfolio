const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const jwt = require('jsonwebtoken');
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
        const paymentCollection = database.collection("payments");
        const userCollection = database.collection("users");

        /* middleware */
        /* verify jwt token */
        const verifyJwtToken = async (req, res, next) => {
            console.log(`verify jwt token: `, req.headers.authorization);

            if (!req.headers.authorization) {
                return res.status(401).send({ message: `forbidden access.` });
            }

            const token = req.headers.authorization.split(` `)[1];
            // console.log(token);

            if (!token) {
                return res.status(401).send({ message: `forbidden access.` });
            }

            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, decoded) => {
                if (error) {
                    return res.status(401).send({ message: `forbidden access.` })
                }

                res.decoded = decoded;
                next();
            });
        };

        /* jwt */
        app.post(`/jwt`, async (req, res) => {
            const email = req.body.email;
            console.log(`jwt email: `, email);

            const jwtToken = jwt.sign({
                data: email
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            // console.log(`jwt Token: `, jwtToken);

            res.send(jwtToken);
        });

        /* user */
        app.get(`/users`, verifyJwtToken, async (req, res) => {
            // console.log(`user headers: `, req.headers);

            const result = await userCollection.find().toArray();
            console.log(`get users: `, result);

            res.send(result);
        })

        app.post(`/user`, async (req, res) => {
            const user = req.body;
            console.log(user);
            const queryEmail = { email: user.email };
            console.log(queryEmail);


            const verifyExistingUser = await userCollection.findOne(queryEmail);
            console.log("verifyExistingUser: ", verifyExistingUser);

            if (verifyExistingUser) {
                res.send({
                    message: "User already existed.",
                    insertedId: null
                });
            } else {
                user[`role`] = "member";
                console.log("user: ", user);

                const result = await userCollection.insertOne(user);
                console.log("inserted result: ", result);

                res.send(result);
            }
        });

        app.delete(`/user/:id`, async (req, res) => {
            const id = req.params.id;
            console.log(id);

            const query = { _id: new ObjectId(id) };
            console.log(query);

            const result = await userCollection.deleteOne(query)
            console.log(result);

            res.send(result);
        });

        /* donation */
        app.get("/donations", async (req, res) => {
            const result = await donationCollection.find().toArray();
            console.log(result);

            res.send(result);
        });

        app.get(`/donation/:id`, async (req, res) => {
            const id = req.params.id;
            console.log("params Id: ", id);

            const query = { _id: new ObjectId(id) }

            const result = await donationCollection.findOne(query);
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

        app.patch("/donation/:id", async (req, res) => {
            const id = req.params.id;
            const updatedDonationItem = req.body;
            console.log(id, updatedDonationItem);

            const filter = { _id: new ObjectId(id) };

            const updateDoc = {
                $set: updatedDonationItem
            }

            const result = await donationCollection.updateOne(filter, updateDoc);
            console.log(result);

            res.send(result)
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

        app.get("/volunteering/:id", async (req, res) => {
            const id = req.params.id;
            console.log(id);

            const query = { _id: new ObjectId(id) };

            const result = await volunteeringCollection.findOne(query);
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

        app.patch(`/volunteering/:id`, async (req, res) => {
            const id = req.params.id;
            const updatedVolunteeringItem = req.body;
            console.log(id, updatedVolunteeringItem);

            const filter = { _id: new ObjectId(id) };

            const updateDoc = {
                $set: updatedVolunteeringItem
            }

            const result = await volunteeringCollection.updateOne(filter, updateDoc);
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

        /* payment */

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

        app.post("/payments", async (req, res) => {
            const payment = req.body;
            console.log(payment);

            // insert payment details
            const paymentResult = await paymentCollection.insertOne(payment);

            // delete each item from the cart
            const query = {
                _id: {
                    $in: payment.bookmarkIds.map(id => new ObjectId(id))
                }
            }
            const deleteResult = await bookmarkCollection.deleteMany(query);

            res.send({ paymentResult, deleteResult });
        });

        /* payment history */
        app.post("/paymentHistory", async (req, res) => {
            const body = req.body;
            console.log(body);

            const query = { email: body.email };
            const result = await paymentCollection.find(query).toArray();
            console.log(result);

            res.send(result);
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