import React, {useState, useContext } from 'react'
import Axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { TextField, Grid } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import Cookies from 'js-cookie';
import {UserContext} from '../Store/Store'

const useStyles = makeStyles({
    container: {
        background: '-webkit-linear-gradient(top,#7579ff,#b224ef)',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        height: '580px',
        color: 'white',
        fontFamily: 'Montserrat, sans-serif',
        boxSizing: 'border-box',
        paddingTop: '30px',
        width: '100%',
        margin: '20px auto',
        borderRadius: '25px'
    },
    forget: {
        position: 'absolute',
        bottom: '0px'
    },
    icon: {
        paddingRight: '8px'
    },
    input: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginBottom: '15px',

    },
    image: {
        height: '100%',
        width: '100%',
    },

    imageDiv: {
        height: '100px',
        width: '100px',
        backgroundColor: 'white',
        borderRadius: '60px',
        alignContent: 'center',
    },
    root: {

        '&.MuiFormHelperText-root.Mui-error': {
            color: 'white'
        },
        '& label.Mui-focused': {
            color: 'white',
        },
        '& label': {
            color: 'white',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'yellow',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white',
            },
            '&:hover fieldset': {
                borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'yellow',
            },
        },
    },
    resize: {
        fontSize: '50px'
    },
    button: {
        backgroundColor: 'white',
        borderRadius: '25px',
        width: '120px',
        height: '50px',
        fontSize: '16px',
        border: 'none',
        fontFamily: 'Poppins-Medium',
        color: '#555',
        lineHeight: '1.2',
        background: '-webkit-linear-gradient(left,#00B4D8,#EDF6F9)',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    title: {
        marginBottom: '10px'
    },
    textfield: {
        color: 'white',
        fontSize: '16px',
    }
})

function Register(props) {

    const [initialState, setState] = useContext(UserContext);
    const classes = useStyles('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const moveToLogin = () =>{
        props.history.push('/Login')
    }


    const onSubmit = (event) => {
        console.log('data', [name, lastname, email, password])
        event.preventDefault();
        const variable = {
            name,
            lastname,
            email,
            password
        };
        if (password.length < 6) {
            setPasswordError(true)
        }
        else {
            Axios.post("/api/user/register", variable).then(res => {
                console.log('register', res.data)
                const isAuth = res.data.isAuth;
                if (!isAuth) {
                    setEmailError(true);
                }
                else if (isAuth) {  
                    Cookies.set('x_auth', res.data.token)
                    setState({...initialState,isAuth});
                    props.history.push('/');
                    alert('User created successfully')
                     
                    
                }
            })
        }
    }

    const nameChange = event => {
        setName(event.target.value);
    }
    const lastnameChange = event => {
        setLastname(event.target.value);
    }
    const emailChange = event => {
        setEmail(event.target.value);
    }
    const passwordChange = event => {
        setPassword(event.target.value);
    }

    return (
        <Grid container>
            <Grid lg={5} md={6} sm={8} xs={11} item className={classes.container}>
                <div className={classes.imageDiv}>
                    <img className={classes.image} alt='Logo of travello' src='https://www.graphicsprings.com/filestorage/stencils/db095faa8035cee1e0cd3606ac6cad1b.png?width=500&height=500' />
                </div>

                <h2 className={classes.title}>SiGN UP</h2>
                <form onSubmit={onSubmit} autocomplete="off">
                    <div className={classes.input}>
                        <AccountCircle className={classes.icon} />
                        <TextField className={classes.root}
                            name='setName' value={name} onChange={nameChange} required
                            inputProps={{
                                classes: {
                                    input: classes.resize,
                                }, style: { fontFamily: 'nunito', color: 'white', border: 'white' }
                            }}
                            autoComplete='false' type='text' id="input-with-icon-grid" label='First Name' />
                    </div>
                    <div className={classes.input}>
                        <AccountCircle className={classes.icon} />
                        <TextField className={classes.root}

                            inputProps={{
                                classes: {
                                    input: classes.resize,
                                }, style: { fontFamily: 'nunito', color: 'white', border: 'white' }
                            }}
                            name='setLastname' value={lastname} onChange={lastnameChange} required
                            autoComplete='false' type='text' id="input-with-icon-grid" label='Last Name'
                        />
                    </div>
                    <div className={classes.input}>
                        <EmailIcon className={classes.icon} />
                        <TextField className={classes.root}
                            inputProps={{
                                classes: {
                                    input: classes.resize,
                                }, style: { fontFamily: 'nunito', color: 'white', border: 'white' }
                            }} required
                            name='setEmail' value={email} onChange={emailChange}
                            error={emailError} helperText={emailError ? 'Email already exist' : ''}
                            autoComplete='false' type='email' id="input-with-icon-grid" label='Email' />
                    </div>
                    <div className={classes.input}>
                        <LockIcon className={classes.icon} />
                        <TextField className={classes.root}
                            required
                            inputProps={{ style: { fontFamily: 'nunito', color: 'white', border: 'white' } }}
                            name='setPassword' value={password} onChange={passwordChange}

                            error={passwordError} helperText={emailError ? 'Enter at least 6 characters Password' : ''}
                            type='password' id="input-with-icon-grid" label="Password" />
                    </div>
                    <div className={classes.input}>
                        <button type='submit' className={classes.button}>
                            Sign In
                    </button>
                    </div>
                </form>
                <p style={{ justifyContent: 'flex-end', alignItems: 'center' }}>Already have account? <span style={{cursor:'pointer'}} onClick={moveToLogin} >Click to Login</span> </p>
            </Grid>
        </Grid>
    )
}

export default Register
