import React from 'react'
import {useDispatch , useSelector} from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import { placeOrder } from '../actions/orderActions'
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from '../components/Success'
export default function Checkout({subtotal}) {

    const orderstate = useSelector((state) => state.placeOrderReducer)
    const {loading , error , success} = orderstate
    const dispatch = useDispatch()
    function tokenHander(token)
    {
        console.log(token);
        dispatch(placeOrder(token , subtotal))

    }

    return (
        <div>

            {loading && (<Loading/>)}
            {error && (<Error error='Something went wrong'/>)}
            {success && (<Success success='Your Order Placed Successfully'/>)}

            <StripeCheckout
                amount={subtotal*100}
                shippingAddress
                token={tokenHander}
                stripeKey='pk_test_51JtZ6dGoV449bb5dSkbshH60SrBBsIoT585KbfeA9F5iVFSKRfLmYl8yv7Zt9KLYzfnc0RJBrDfQliOnsuc1eBLr00mrZFpyRL'
                currency='UAH'
            >


                <button className='btn'>Pay Now</button>

            </StripeCheckout>

        </div>
    )
}