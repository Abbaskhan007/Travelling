import React, { useState } from 'react';
import Data from './PriceData';
import { Accordion,Radio, AccordionSummary, Typography, AccordionDetails} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const useStyles = makeStyles({
    filterParent: {
        margin: '20px 0px',
        width: '100%'
    },
    summary: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
          minHeight: 56,
        },},  
    content: {
        display: 'flex', 
        flexWrap: 'wrap', 
        flex: '1',
        '&$expanded': {
          margin: '12px 0',
        },
      },
});

function RadioBox(props) {
    const classes = useStyles();
    const [selected, setSelected] = useState(Data[0]);
    const handleChange = (item => {
        setSelected(item);
        props.handleFilter(item.value);
        console.log('item',item);
    })

    return (
        <div>
            <Accordion >
                <AccordionSummary
                    className={classes.summary}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    <Typography >Price</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.content}>
                    {
                        Data.map(item=>(
                            <label key={item.id}>
                                <Radio
                                 name='Prices'
                                value={item.value}
                                checked={item.name===selected.name}
                                onChange={()=>handleChange(item)}
                                />
                                {item.name}
                            </label>
                        ))
                    }
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default RadioBox


