import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button,ButtonGroup } from '@material-ui/core';
import { UserContext } from '../Store/Store'
import DeleteIcon from '@material-ui/icons/Delete';
import Axios from 'axios'

const useStyles = makeStyles({
    parent: {
        display: 'flex',
        marginTop: '15px'
    },
    image: {
        width: '100%',
        height:'150px'
    },
    detail: {
        display: 'flex',
        flexDirection: 'column',
        height:'100%',
        justifyContent:'space-between'
    },
    quantity: {
        display:'flex',
        height:'100%',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent:'space-between'
    },
    
    title:{
        paddingTop:'30px',
    },
    buttonGroup:{
        fontSize: '20px'
    },
    border:{   
        borderBottom: '1px solid #6c757d'
    },
    removeItem:{
        display: 'flex',
        alignItems: 'center',
        paddingTop: '20px',
        paddingLeft: '0px',
        '&:hover':{
            cursor: 'pointer'
        }

    }
    
    
})
function CartItems(props) {
    const { continent, image, price, title,quantity,_id } = props.cartDetail;
    const classes = useStyles();
    const [initialState, setState] = useContext(UserContext);
    const removeItem = (id) =>{
        console.log('id',id)
        const variable = {
            id: id
        }
        Axios.post('/api/user/removeFromCart',variable).then(res=>{
            console.log('Remove',res.data.cart)
            setState({...initialState,cart:res.data.cart})
        })
    }

    const changeQuantity = (id,num) =>{
        console.log('id',quantity)
        if(quantity===1&&num===-1){
            console.log('remove It.............')
            removeItem(id);
        }
        else{
        const variable = {
            id: id,
            num: num
        }
        Axios.post('/api/user/changeQuantity',variable).then(res=>{
            console.log('Quantity',res.data.cart)
            setState({...initialState,cart:res.data.cart})
        })}
    }
    return (
        <Grid container spacing={4} className={classes.parent} justify='center'>
            <Grid item sm={4} xs = {7} >
                <img className={classes.image} alt='place' src={`${image[0]}`} />
            </Grid>
            <Grid item sm={4} xs = {6}>
                <div className={classes.detail}>
                    <div>
                    <Typography  variant='h5'>{continent}</Typography>
                    <Typography className={classes.title} variant='body1'>{title}</Typography>
                    </div>
                    <span className={classes.removeItem} onClick={()=>removeItem(_id)}><DeleteIcon /> <Typography variant="subtitle1">REMOVE ITEM</Typography></span>
                </div>
            </Grid>
            <Grid item  sm={3} xs={5}>
                <div className={classes.quantity}>
                    <ButtonGroup className={classes.buttonGroup} aria-label="large outlined button group">
                        <Button style={{fontSize: '20px'}} onClick={()=>changeQuantity(_id,1)}>+</Button>
                        <Button style={{fontSize: '20px'}}>{quantity}</Button>
                        <Button style={{fontSize: '20px'}} onClick={()=>changeQuantity(_id,-1)}>-</Button>
                    </ButtonGroup>
                    <Typography className={classes.price} variant='h5'>{`$${price}`}</Typography>
                </div>
            </Grid>
            <Grid className= {classes.border} item xs={6} >
                
            </Grid>
            

        </Grid>


    )
}

export default CartItems
