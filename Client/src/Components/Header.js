import React, { useContext } from 'react'
import { AppBar, Toolbar, Typography, IconButton, Button, Badge } from '@material-ui/core'
import { Add, Menu } from '@material-ui/icons'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core/styles';
import SideBar from './SideBar';
import { Link } from 'react-router-dom'
import { UserContext } from '../Store/Store'
import Cookies from 'js-cookie'


const useStyles = makeStyles((theme) => ({
    design:{
        boxShadow: 'none',
        width: '95%',
        margin: '30px auto',
        backgroundColor:'black',
        borderRadius: '3px'
    
    },
    root: {
        flexGrow: 1,
        color: 'black',

    },
    size: {
        fontSize: '20px'
    },
    name: {
        display: 'none',
        color: 'white',
        [theme.breakpoints.up('md')]: {
            display: 'block'
        }
    },
    tabs: {
        marginRight: theme.spacing(3),
        color: 'white'
    },
    icon: {
        width: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    menu: {
        [theme.breakpoints.up("sm")]: {
            display: 'none',
        }
    },
    mobile: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
            alignItems: 'center'
        }
    }
}));

function Header(props) {

    const [initialState, setState] = useContext(UserContext);
    const [drawer, setDrawer] = React.useState(false);
    const toggleDrawer = () => {
        setDrawer(!drawer);
    }
    const closeDrawer = () => {
        setDrawer(false);
    }

    const logout = () => {
        Cookies.remove('x_auth');
        setState({ ...initialState, isAuth: false, name: '', email: '', _id: '',cartDetail:[],cart:[] });
    }

    const items = initialState.cart.length;
    const classes = useStyles();
    return (

        <div >
            <AppBar position='static' className={classes.design}>
                <Toolbar>
                    <div className={classes.menu}>
                        <IconButton color='inherit' onClick={toggleDrawer}>
                            <Menu style={{ fontSize: '40px', fill: 'white', color:'white' }} />
                        </IconButton>
                    </div>
                    <div className={classes.root}>
                        <div className={classes.mobile}>
                            <div className={classes.icon}>
                                <img className={classes.tabs} height='40px' alt='Background' src='https://www.freeiconspng.com/thumbs/travel-icon/--global-globe-plane-travel-worldwide-icon--icon-search-engine-1.png' />
                                <Typography className={classes.name} variant='h6'>
                                    Tourists
                                </Typography>
                            </div>
                            <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
                                <Typography className={classes.tabs} variant='h6'>
                                    Home
                                </Typography>
                            </Link>
                            <Link to='/Upload' style={{ textDecoration: 'none', color: 'white' }}>
                                <IconButton color="inherit" className={classes.tabs}>
                                    <Add />
                                </IconButton>
                            </Link>
                            <Link to='/Contact' style={{ textDecoration: 'none', color: 'white' }}>
                                <Typography className={classes.tabs} variant='h6'>
                                    Contact
                                </Typography>
                            </Link>
                            <Link to='/About' style={{ textDecoration: 'none', color: 'white' }}>
                                <Typography className={classes.tabs} variant='h6'>
                                    AboutUs
                                </Typography>
                            </Link>
                            <Link to='/Cart' style={{ textDecoration: 'none', color: 'white' }}>

                                <IconButton color="inherit" className={classes.tabs}>
                                    <Badge badgeContent={items} color="secondary">
                                        <ShoppingCartIcon />
                                    </Badge>
                                </IconButton>

                            </Link>
                            <Link to='/History' style={{ textDecoration: 'none', color: 'white' }}>
                                <Typography className={classes.tabs} variant='h6'>
                                    History
                                </Typography>
                            </Link>
                        </div>
                    </div>
                    <Link to='/Register' style={{ textDecoration: 'none', color: 'white' }}>

                        {initialState.isAuth ?
                            <Button variant="outlined" color='inherit' className={classes.tabs} onClick={logout}> LogOut </Button>
                            :
                            <Button variant="outlined" color='inherit' className={classes.tabs}> Sign In </Button>}

                    </Link>
                </Toolbar>
            </AppBar>
            <SideBar drawer={drawer} closeDrawer={closeDrawer} />

        </div>
    )
}
export default Header
