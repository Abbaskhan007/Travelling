import React, { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    box: {
        display: 'flex',
        alignItems: 'center',
        border: '1px solid gray',
        borderRadius: '5px',
        marginTop: '10px',
        padding: '3px'
    }
})

function SearchFunction(props) {
    const classes = useStyles();
    const [searchTerm, setSearchTerm] = useState('');
    const handleChange = event => {
        setSearchTerm(event.target.value);
        props.filterSearch(event.target.value);
    }
    return (
        <div>
            <div className={classes.box}>
                <input placeholder='Search by typing...'
                    onChange={handleChange}
                    value={searchTerm}
                    type='text' style={{ border: 'none', outline: 'none', }} /><SearchIcon color="disabled" />
            </div>
        </div>
    )
}

export default SearchFunction
