import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import Axios from 'axios'
import {UserContext} from '../Store/Store'


const useStyles = makeStyles({
    parent: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

    },
    space: {
        marginBottom: '20px'
    },
    button: {
        backgroundColor: '#011627',
        color: 'white',
        '&:hover':{
            backgroundColor: 'black',
        color: 'white',
        }
    },
    bottom:{
        marginBottom:'12px'
    }

})

function ProductInfo({ data }) {
    console.log('DATA:',data)
    const classes = useStyles();
    const [initialState, setState] = useContext(UserContext);
    const { price, title, image, description, continent, sold, view,_id } = data;
    const onAddToCart = () =>{
        console.log('initial State', initialState)
   
        const variable = {
            id: initialState._id,
            productId:_id,
            title,
            description,
            image,
            continent,
            price
        };
        console.log('data',data)
        Axios.post("/api/user/addToCart",variable).then(res=>{
            
            console.log('Add to cart', res.data)
            if(res.data.success){
            setState({...initialState,cart:res.data.cart});
            }
        })
    }

    return (
        <div className={classes.parent}>
            <div className={classes.border}>
                <div className={classes.space}>
                    <Typography variant="h4" gutterBottom >{continent}</Typography>
                </div>

                <div className={classes.space}><Typography variant="h5" gutterBottom>{`$${price}`}</Typography></div>
                <Typography variant="h6">Solid: {sold}</Typography>

                <div className={classes.space}><Typography variant="h6" gutterBottom>View: {view}</Typography></div>
                <div className={classes.space}>
                    <Typography variant="body1" gutterBottom>{description}{description}{description}</Typography>

                </div>
            </div>
            <div className={classes.bottom}>
            <Button onClick={onAddToCart} className={classes.button} variant='contained' >Add to cart</Button>
            </div>
        </div>
    )
}

export default ProductInfo
