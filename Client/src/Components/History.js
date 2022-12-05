import Axios from 'axios'
import React,{useEffect, useState} from 'react'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import {Table, TableHead, TableRow, TableCell, TableBody,Paper,TableContainer, Typography} from '@material-ui/core'

const useStyles = makeStyles({
    table:{
        width: '95%',
        margin: 'auto',
        
    },
    tableContainer:{
        backgroundColor: '#f5f5f5',
        padding: '20px 5px',
        boxSizing:'border-box',
        width: '95%',
        margin: 'auto',
        maxHeight: 440
    },
    title: {
        display: 'flex',
        justifyContent: 'center'
    }
});

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  

function History() {
    const classes = useStyles();
     const [history, setHistory] = useState([]);
    useEffect(()=>{
        Axios.post('api/user/history').then(res=>{
            console.log('Response Data: ', res.data)
            if(res.data.success){
            setHistory(res.data.historyData);
        }
        else{
            alert('Failed to gt history')
        }
        })
    },[])
    
    return (
        <div>
            
            <Typography className={classes.title} variant="h3" gutterBottom>History</Typography>
            <TableContainer className={classes.tableContainer} component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell >PaymentID</StyledTableCell>
                        <StyledTableCell align="right">Location</StyledTableCell>
                        <StyledTableCell align="right">Price</StyledTableCell>
                        <StyledTableCell align="right">Quantity</StyledTableCell>
                        <StyledTableCell align="right">Date of purchase</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>  
                        {history.map(item=>(
                            <StyledTableRow>
                            <StyledTableCell component="th" scope="row">{item.paymentId}</StyledTableCell>
                            <StyledTableCell align="right">{item.name}</StyledTableCell>
                            <StyledTableCell align="right">{item.price}</StyledTableCell>
                            <StyledTableCell align="right">{item.quantity}</StyledTableCell>
                            <StyledTableCell align="right">{item.date}</StyledTableCell>    
                        </StyledTableRow>                
                        ))}
                    
                </TableBody>
            </Table>
            </TableContainer>

        </div>
    )
}

export default History
