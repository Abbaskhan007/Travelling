import React, { useState } from 'react'
import continents from './ContinentData';
import { Accordion, AccordionSummary, Typography, AccordionDetails } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const useStyles = makeStyles({
        
    filterParent: {
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


function CheckBox(props) {
    const classes = useStyles();


    const [Checked, setChecked] = useState([]);

    const handleChange = (value) => {
        const newChecked = [...Checked];
        let index = newChecked.indexOf(value);
        if (index === -1) {
            newChecked.push(value);
        }
        else {
            newChecked.splice(index, 1);
        }
        setChecked(newChecked);
        props.handleFilter(newChecked);
    }
    return (
        <div>
            <Accordion >
                <AccordionSummary
                    className={classes.summary}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    <Typography >Continents</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.content}>
                    {continents.map(cont => (
                        <span key={cont.id} style={{ marginLeft: '15px', marginBottom: '15px',paddingTop:'8px' }}>

                            <input onChange={() => handleChange(cont.value)} checked={Checked.indexOf(cont.value) === -1 ? false : true} type='checkbox' value={cont.value} />
                            <span style={{ marginRight: '5px' }}>
                                {cont.value}
                            </span>
                        </span>
                    ))}
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default CheckBox
