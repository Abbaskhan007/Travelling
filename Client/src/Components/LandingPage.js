import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Grid, Card, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import CheckBox from './CheckBox';
import RadioBox from './RadioBox';
import {Link} from 'react-router-dom'

import ImageSlider from './ImageSlider'
import SearchFunction from './SearchFunction';

const useStyles = makeStyles({

    
    text: {
        paddingTop: '10px',
        paddingLeft: '8px'
    },
    checkbox:{
        width:'100%',
        margin: '20px 0px',
    },
    parent: {
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
    },
    button: {
        padding: '3px',
        alignSelf: 'center',
        marginTop: '30px',
    },
    parentBox:{
        display:'flex',
        margin: 'auto'
    },
    childBox:{
        height:'100%',
        margin: 'auto'
    },
    container: {
        margin: 'auto'
    }
});


function LandingPage() {
    const classes = useStyles();
    const [skip, setSkip] = useState(0);
    const [limit] = useState(3);
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState({
        continent:[],
        price:[],
        title: '',
    })
    const getProduct = (variable) => {
        Axios.post('/api/product/getProduct', variable).then(res => {
            if (res.data.success) {
                console.log(res.data.products)
                setProducts(res.data.products)
            }
            else {
                alert('Failed to display products')
            }
        })
    }
    useEffect(() => {
        const variable = {
            skip: skip,
            limit: limit
        }
        getProduct(variable);
    })

    const loadMore = () => {
        setSkip(limit);
        const variable = {
            skip: skip,
        }
        getProduct(variable);
    }

    const showFilter = (filter) =>{
        const variable = {
            skip:0,
            filter:filter
        }
        getProduct(variable);
    }

    const handleFilter = (value,catogory)=>{
        const newFilter = filter;
        
        filter[catogory] = value;
        setFilter(newFilter);
        showFilter(filter);     
    }
    return (
        <div className={classes.parent}>
            <div style={{marginLeft:'auto'}}>
            <SearchFunction filterSearch={(value)=>handleFilter(value,'title')}/>
            </div>
            <div className={classes.checkbox}>
            <Grid container spacing={3}>
                <Grid className={classes.childBox} item sm={6} xs={9} >
                <CheckBox handleFilter={value=>handleFilter(value,'continent')}/>
                </Grid>
                <Grid  item sm={6} xs={9} className={classes.childBox}>
                <RadioBox handleFilter={value=>handleFilter(value,'price')}/>
                </Grid>
            </Grid>
            </div>
            <Grid  container spacing={2}>
                {products.map((product, index) => (
                    <Grid item xs={9} sm={6} md={4} lg={3} className={classes.container} key={index}>
                        <Link style={{textDecoration:'none'}} to={`/ProductDetails/${product._id}`}><Card className={classes.root}>
                            <ImageSlider images={product.image} />
                            <Typography className={classes.text}>{product.title}</Typography>
                            <Typography className={classes.text} variant='body2'>{`$ ${product.price}`}</Typography>
                        </Card>
                        </Link>
                    </Grid>
                )
                )}
            </Grid>
            {!skip ? <Button variant="outlined" onClick={loadMore} className={classes.button}>Load More</Button> : ''}
        </div>
    )
}
export default LandingPage
