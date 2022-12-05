import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Drawer,List,ListItem, ListItemIcon, ListItemText} from '@material-ui/core'
import {ContactPhone,Add,Info,Home,History} from '@material-ui/icons';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    drawerWidth:{ 
        width :'240px',
        fontSize: '20px',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        fontWeight: 400,
        lineHeight: 1.5
    }
}));

function SideBar(props) {
    const classes = useStyles();
    return (
        <div > 
            <Drawer open={props.drawer} onClose={props.closeDrawer}  >
                <List className={classes.drawerWidth} onClick={props.closeDrawer}>
                    {[{name: 'Home',icon: <Home/>,path: '/' },
                    {name:'Upload',icon: <Add/>,path: '/Upload'},
                    {icon: <ContactPhone/>,name:'Contact Us',path: '/Contact'},
                    {icon: <ShoppingCartIcon/>, name: 'Cart', path: '/Cart'},
                    {icon: <History/>, name: 'History', path: '/History'},
                    {name:'About Us',icon: <Info/>, path:'/About'}].map(text=>
                        <Link key={text.name} to={text.path} style={{textDecoration:'none',color:'black'}}>
                        <ListItem button key={text}>
                        <ListItemIcon>
                            {text.icon}
                        </ListItemIcon>
                        <ListItemText primary={text.name}/>
                        </ListItem>
                        </Link>
                    )}
                </List>
            </Drawer>

        </div>
    )
}

export default SideBar
