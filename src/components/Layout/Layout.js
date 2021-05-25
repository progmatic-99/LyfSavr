import React from 'react';
import {makeStyles} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import { AddShoppingCartIcon, MenuBookIcon, AnnouncementIcon } from '@material-ui/icons';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AnnouncementIcon from '@material-ui/icons/Announcement';

import { useHistory, useLocation } from 'react-router-dom';
import theme from '../../Theme';

import './Layout.css';

const drawerWidth = 240;



const useStyles = makeStyles((theme)=>{
    return{
        page: {
        background: '#484848',
        color: '#fff',
        width: '100%',
        padding: theme.spacing(3)
        },
        drawer: {
            width: drawerWidth,
            
        },
        drawerPaper: {
            width: drawerWidth
        },
        root:{
            display: 'flex',
            
        },
        active: {
            backgroundColor: '#fff2' 
        },
        title: {
            padding: theme.spacing(3)
        },
        sidebar: {
            background: 'skyblue'
        }
    }
   
});

export default function Layout({children}) {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const sidebarItems = [
        {
            text: 'Resources',
            icon: <AddShoppingCartIcon color="secondary" />,
            path: '/'
        },
        {
            text: 'Stats',
            icon: <MenuBookIcon color="secondary" />,
            path: '/stats'
        },
        {
            text: 'News',
            icon: <AnnouncementIcon color="secondary" />,
            path: '/news'
        }
    ] 

    return(
        <div className={classes.root}>
            <div className={classes.sidebar} color="primary">
                    <Drawer className={classes.drawer} 
                        variant="permanent" 
                        anchor="left"
                        classes={{ paper: classes.drawerPaper}}
                    >
                    <div>
                        <Typography variant="h5" className={classes.title} color="secondary" background="primary">
                            Lyfsavr
                        </Typography>
                    </div>

                    <List>
                        {sidebarItems.map(item=>(
                            <ListItem
                                
                                button
                                key={item.text}
                                onClick={()=> history.push(item.path)}
                                className = {location.pathname == item.path ? classes.active : null }
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>

                </Drawer>
            </div>

            <div className={classes.page}>
                {children}
            </div>
            
        </div>
    );
}