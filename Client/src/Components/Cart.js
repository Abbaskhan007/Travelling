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
        initialState.cart.map(item =>( 
            id.push(item.id)
        ))
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
            if(res.data.success){
                props.history.push('/')
                setState({...initialState,cart:[],cartDetail:[]});
                alert('Purchase succeded');
            }
        }) 
    }


    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '50px 0px' }}>
                <Typography style={{ fontSize: '30px', fontWeight: 'bold'}} gutterBottom>Total Price :    ${price}</Typography>
            </div>
            {initialState.cartDetail.map(item => <CartItems key={item._id} cartDetail={item} />)}
            
            <Stripe
            stripeKey= {process.env.REACT_APP_KEY}
            token= {makePayment}
            name = 'Book reservation'
            shippingAddress
            billingAddress
            >
                <div style={{display: 'flex', justifyContent: 'center',margin:'30px 0px'}}>
                    <Button variant="contained" color="primary">
                        Payment
                    </Button>
                </div>
                
            </Stripe>

        </div>
    )
}

export default Cart
