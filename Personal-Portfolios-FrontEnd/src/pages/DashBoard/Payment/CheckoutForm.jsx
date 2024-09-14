import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { AuthContext } from '../../../providers/AuthProvider';
import Swal from 'sweetalert2';

const CheckoutForm = () => {

    const [error, setError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const axiosPublic = useAxiosPublic();
    const [bookmarks, setBookmarks] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {

        (async () => {
            const res = await axiosPublic.post(`/bookmarks`, {
                email: user.email
            })
            setBookmarks(res.data);

            const totalAmount = res.data.reduce((total, bookmark) => total + parseFloat(bookmark.donationAmount), 0);

            if (totalAmount > 0) {
                // Create PaymentIntent as soon as the page loads
                (async () => {
                    const res = await axiosPublic.post("/create-payment-intent", {
                        price: totalAmount
                    })
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })()
            } else {
                console.log("For stripe, totalAmount must be greater then 0: ", totalAmount);

            }
        })()


        // axiosPublic.post("/bookmarks", {
        //     email: user.email
        // })
        //     .then(res => {
        //         console.log(res.data);
        //         setBookmarks(res.data);

        //         const totalAmount = res.data.reduce((total, bookmark) => total + parseFloat(bookmark.amount), 0);
        //         console.log("Total Amount: ", totalAmount);

        //         axiosPublic.post("/create-payment-intent", {
        //             price: totalAmount
        //         })
        //             .then(res => {
        //                 console.log(res.data.clientSecret);
        //                 setClientSecret(res.data.clientSecret);
        //             })

        //     })

    }, [])

    console.log("bookmarks", bookmarks);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            console.log("[error]", error);
            setError(error.message);

        } else {
            console.log("[PaymentMethod]", paymentMethod);
            setError("");
        }

        // // confirm payment
        // const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        //     payment_method: {
        //         card: card,
        //         billing_details: {
        //             email: user?.email || "anonymous",
        //             name: user?.displayName || "anonymous"
        //         }
        //     }
        // })

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || "anonymous",
                    name: user?.displayName || "anoymous"
                }
            }
        })

        if (confirmError) {
            console.log("confirm error: ", confirmError);

        } else {
            console.log("payment intent: ", paymentIntent);
            if (paymentIntent.status === "succeeded") {
                console.log("transaction id: ", paymentIntent.id);
                setTransactionId(paymentIntent.id);

                console.log("bookmarks before object: ", bookmarks, bookmarks.reduce((total, bookmark) => total + parseFloat(bookmark.amount), 0), user.email);

                // save the payment in th DB
                const payment = {
                    email: user.email,
                    amount: bookmarks.reduce((total, bookmark) => total + parseFloat(bookmark.amount), 0),
                    transactionId: paymentIntent.id,
                    data: new Date(), // utc date convert. use moment js
                    bookmarkIds: bookmarks.map(bookmark => bookmark._id),
                    status: "pending",
                }

                console.log('payment object: ', payment);


                const res = await axiosPublic.post("/payments", payment);
                console.log("payment saved: ", res.data);
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Thanks to your generous donation.",
                        showConfirmButton: false,
                        timer: 1500
                    })
                }

            }
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}></CardElement>

                <button className='btn btn-primary my-5' type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>

            <p className='text-red-500'>{error}</p>
            {transactionId && <p className='text-green-500'>Your transaction ID: {transactionId}</p>}
        </div>
    );
};

export default CheckoutForm;