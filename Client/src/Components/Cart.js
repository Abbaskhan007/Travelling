import Axios from 'axios'
import React, { useEffect, useContext } from 'react'
import { UserContext } from '../Store/Store'
import CartItems from './CartItems'
import Stripe from 'react-stripe-checkout'
import { Button, Typography } from '@material-ui/core'


function Cart(props) {
    const [initialState, setState] = useContext(UserContext);

    async function cart_Detail(res){
        const cartItem = initialState.cart;
        await cartItem.forEach(item => {

            res.data.product.forEach((detail, index) => {

                console.log('Item', item, 'detail....', detail)
                if (item.id === detail._id) {
                    res.data.product[index].quantity = item.quantity;
                }
            })
        });
    }
    useEffect(() => {

        let id = [];
        initialState.cart.map(item => {
            id.push(item.id);
        })
        let variable = {
            id: id
        }
        console.log('id......', id)
        Axios.post('/api/product/productDetails', variable).then(res => {
            console.log(res);
            //const cartItem = initialState.cart;
            cart_Detail(res);
            
            setState({ ...initialState, cartDetail: res.data.product })

            console.log('InitialState', initialState)
        })
    }
        , [initialState.cart])

    const price = initialState.cartDetail.reduce((accumulator, currentItem) =>
        accumulator + currentItem.price * currentItem.quantity, 0
    )


    
    const makePayment = token =>{
        const body = {
            price,
            token,
            cartDetail: initialState.cartDetail,
            cart: initialState.cart
        }
        console.log('Body ...', body)
        Axios.post('/api/payment/stripe',body).then(res=>{
            console.log('res of stripe', res)
        }) 
    }


    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '50px 0px' }}>
                <Typography variant="h3" gutterBottom>Total Price :    ${price}</Typography>
            </div>
            {initialState.cartDetail.map(item => <CartItems key={item._id} cartDetail={item} />)}
            
            <Stripe
            stripeKey= 'pk_test_51HgrsmFQ8VNGXjFtuZOoiJsR9yVQb6PXTernz1qYMIpkEwnQRA8YrRDXmmzh4zwsXTIq5tJnnoduS1Y90nDIXru90062JC1FJs'
            token= {makePayment}
            name = 'Book reservation'
            shippingAddress
            billingAddress
            >
                <div style={{display: 'flex', justifyContent: 'center',marginTop:'30px'}}>
                    <Button variant="contained" color="primary">
                        Payment
                    </Button>
                </div>
                
            </Stripe>

        </div>
    )
}

export default Cart
