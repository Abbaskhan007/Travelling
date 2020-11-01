import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Drawer,List,ListItem, ListItemIcon, ListItemText} from '@material-ui/core'
import {ContactPhone,Add,Info,Home} from '@material-ui/icons';

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
                    {[{name: 'Home',icon: <Home/> },
                    {name:'Upload',icon: <Add/>},
                    {icon: <ContactPhone/>,name:'Contact Us'},
                    {name:'About Us',icon: <Info/>}].map(text=>
                        <ListItem button key={text}>
                        <ListItemIcon>
                            {text.icon}
                        </ListItemIcon>
                        <ListItemText primary={text.name}/>
                        </ListItem>
                    )}
                </List>
            </Drawer>

        </div>
    )
}

export default SideBar
