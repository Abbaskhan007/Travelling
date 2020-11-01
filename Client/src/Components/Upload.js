import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import continents from './ContinentData';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
    add: {
        border: '2px solid lightgray',
        height: '270px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '100px',
        margin: '10px 0px',
        [theme.breakpoints.down('sm')]: {
            height: '200px'
        }
    },
    image: {
        border: '2px solid lightgray',
        '&::-webkit-scrollbar': {
            display: 'none',

          },
          margin: '10px 0px',
        height: '270px',
        display: 'flex',
        overflowX: 'scroll',
        
        
        [theme.breakpoints.down('sm')]: {
            height: '200px'
        }
    },
    inputField: {
        padding: '8px',
        width: '70%'
    },
    root: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    large: {
        fontFamily: 'Material Icons',
        fontSize: '250px',
        fontWeight: '100',
        fontStyle: 'normal'
    },
    forms: {
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        margin: 'auto',
        boxSizing: 'border-box',
        [theme.breakpoints.down('md')]: {
            width: '90%'
        }
    },
    field: {
        padding: '20px 0',
    },
    label: {
        fontSize: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '60%',
        [theme.breakpoints.down('md')]: {
            width: '85%'
        }
    },
    button: {
        width: '90px',
        marginTop: '35px',
        '&:hover': {
            backgroundColor: '#6B8E23',
            color: 'white'
        }
    }
}));

function Upload(props) {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [descp, setDescp] = useState('');
    const [cont, setCont] = useState();
    const [images, setImages] = useState([]);

    const handleName = e => {
        setName(e.target.value);
    }
    const handlePrice = e => {
        setPrice(e.target.value);
    }
    const handleDescp = e => {
        setDescp(e.target.value);
    }
    const handleSubmit = e => {
        e.preventDefault();

        const variable = {
            title : name,
            price:price,
            continent: cont,
            image: images,
            description: descp
        }
        console.log('variables',variable)
        
        if(!name||!price||!cont||!images||!descp){
            alert('Please fill all fields');
        }
        else{
            Axios.post('/api/product/uploadProduct',variable).then(response=>{
                if(response.data.success){
                    console.log('if........');
                    alert('Upload successfully');
                    props.history.push('/');
                }
                else{
                    console.log('else........');
                    alert('Failed to upload product');
                }
            })
        }
    }
    const handleContinenet = e => {
        setCont(e.target.value)
    }
    const handleDrop = files => {
        let formData = new FormData();
        console.log(files[0])
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])
        Axios.post('/api/product/uploadImage', formData, config)
        .then(response =>{
            if(response.data.success){
                setImages([...images, response.data.image]) 
            }
            else{
                alert('failed to save the image')
            }
        })
        
    }

    const handleDelete = (img) =>{    
        const newImages = images.filter(image=>image!==img);
       setImages(newImages);
    }
    return (
        <div>
            <form className={classes.forms} onSubmit={handleSubmit}>
                <Grid container className={classes.root}>
                    <Dropzone
                        onDrop={handleDrop}
                        multiple={false}
                        maxSize={8000000000}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <Grid {...getRootProps()} item xs={10} sm={5} className={classes.add}>
                                <input {...getInputProps()} />

                                <div >+</div>
                            </Grid>
                        )}
                    </Dropzone>
                        <Grid item xs={10} sm={5} className={classes.image}>{images.map((pic, index)=>(
                            <img key={index} onClick={()=>handleDelete(pic)} style={{width:'100%',height:'100%'}} src={`http://localhost:5000/${pic}`} alt={`${index}-index`}/>
                        ))}</Grid>
                </Grid>
                <div className={classes.field}>
                    <label className={classes.label}>
                        Name:
                    <input onChange={handleName} value={name} className={classes.inputField} type='text' />
                    </label>
                </div>
                <div className={classes.field}>
                    <label className={classes.label}>
                        Description:
                    <textarea onChange={handleDescp} value={descp} className={classes.inputField} />
                    </label>
                </div>
                <div className={classes.field}>
                    <label className={classes.label}>
                        Price:
                    <input onChange={handlePrice} type='number' value={price} className={classes.inputField} />
                    </label>
                    <select value={cont} onChange={handleContinenet} style={{ width: '150px', height: '35px', marginTop: '25px' }}>
                        {continents.map(continent =>
                            <option key={continent.id}>{continent.value}</option>
                        )}
                    </select>
                </div>
                <Button type='submit' variant="outlined" color='inherit' className={classes.button}>Submit</Button>
            </form>
        </div>
    )
}

export default Upload
