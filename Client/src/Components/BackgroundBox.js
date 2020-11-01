import React from 'react'
import { Box, Typography } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    bgImage: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '700px',
        backgroundImage: `url('https://www.ontaheen.com/wp-content/uploads/2018/07/Travelling-to-the-World.jpg')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        top: 0,
        zIndex: -1,

        [theme.breakpoints.down('md')]: {
            height: '600px'
        },
        [theme.breakpoints.down('sm')]: {
            height: '430px'
        },
        [theme.breakpoints.down('xs')]: {
            height: '300px'
        },
    },

    title: {
        display: 'flex',
        height: '100%',
        fontFamily: 'Kite One ,sans-serif',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    }
}));

function BackgroundBox() {
    
    const classes = useStyles();
    return (
        <div>
            <Box className={classes.bgImage}>
                
                <Box className={classes.title}>
                <Typography variant='h3'>TO TRAVEL <br/>
                    IS TO LIVE
                </Typography>
        
            </Box>
            </Box>
            
        </div>
    )
}

export default BackgroundBox
