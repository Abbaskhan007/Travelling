import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Gallery from './Gallery';
import { Grid } from '@material-ui/core'
import ProductInfo from './ProductInfo'
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles({
    parent:{
        
        padding:'10px 20px',
        display:'flex',
        justifyContent:'center',
        boxSizing:'border-box',
        width:'100%',
        
    },
    title:{
        backgroundColor:'#7678ED',
        borderRadius: '20px',
        color:'white',
        padding:'10px 0px 5px 15px',
        fontFamily: 'Dancing Script, cursive'
        
    }
})

function ProductDetails(props) {
    const classes = useStyles();
    const [data, setData] = useState({})
    const id = props.match.params.id;
    const variable = {
        id: id
    }
    useEffect(() => {
        Axios.post('/api/product/productDetails', variable).then(res => {
            if (res.data.success) {
                setData(res.data.product[0])
                console.log('data', res.data.product[0])
            }
            else {
                console.log(res.data.error)
            }
        })
    }, [])
    return (
            
            <Grid className={classes.parent} container spacing={3}>
                <Grid  item xs={10}>
                    <h2 className={classes.title}>{data.title}</h2>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Gallery image={data.image} />
                </Grid>
                <Grid item xs={12} md={5}>
                    <ProductInfo data={data}/>
                </Grid>
            </Grid>
        
    )
}

export default ProductDetails
