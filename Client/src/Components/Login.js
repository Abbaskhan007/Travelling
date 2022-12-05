import React, {useState, useContext} from 'react'
import {TextField, Grid} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Axios from 'axios'
import Cookies from 'js-cookie'
import {UserContext} from '../Store/Store'


const useStyles = makeStyles({
    container:{
        background: '#9152f8',
        //background: '-webkit-linear-gradient(top,#7579ff,#b224ef)',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        height: '580px',
        color : 'white',
        fontFamily: 'Montserrat, sans-serif',
        boxSizing: 'border-box',
        paddingTop:'30px',
        width:'100%',
        margin: '20px auto',
        borderRadius:'20px'        
    },
    
    
    forget: {
        paddingTop: '20px'
    },
    
    icon: {
        paddingRight: '8px'
    },
    input: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginBottom: '5px',
        marginTop: '30px'
    },
    image: {
        height: '100%',
        width: '100%',
    },
    
    imageDiv:{
        height: '100px',
        width: '100px',
        backgroundColor: 'white',
        borderRadius: '60px',
        alignContent: 'center',  
    },
    
        root: {
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
      resize:{
        fontSize:'50px'
      },
      
    button:{
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
    title:{
        marginBottom: '10px'
    },
    textfield: {
        color: 'white',
        fontSize: '16px',
    },
    
})

function Login(props) {
    const classes = useStyles();
    const [initialState, setState] = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const emailChange = event =>{
        setEmail(event.target.value);
    }
    const passwordChange = event =>{
        setPassword(event.target.value);
    }
    const onSubmit = (event) =>{
        console.log('data',[email,password])
        event.preventDefault();
        const variable ={
            email,
            password
        };
        Axios.post("/api/user/login",variable).then(res=>{
            console.log(res)
            const isAuth = res.data.isAuth;
            if(!isAuth){
                if(res.data.message==="Password not match")
                    setPasswordError(true);
                else{
                    setEmailError(true);
                }
            }
            else{
                Cookies.set('x_auth',res.data.token);
                setState({...initialState,isAuth});
                props.history.push('/')
                console.log('state', initialState)
            }
        })
    }

    return (
        <Grid container >
            <Grid lg={5} md={6} sm={8} xs ={11} item className={classes.container}>
            <div className={classes.imageDiv}>
                <img className={classes.image} alt='Logo of travello' src='https://www.graphicsprings.com/filestorage/stencils/db095faa8035cee1e0cd3606ac6cad1b.png?width=500&height=500'/>
            </div>

            <h2 className={classes.title}>LOG IN</h2>
            <form onSubmit={onSubmit} noValidate>
                <div className={classes.input}>
                    <AccountCircle className={classes.icon} />
                    <TextField className={classes.root}
                       inputProps={{ classes: {
                        input: classes.resize,
                      }, style: { fontFamily: 'nunito', color: 'white', border:'white'}}}
                      name = 'setEmail'  value={email} onChange={emailChange} 
                      error={emailError} helperText={emailError?'Email not found':''}
                      autoComplete='false' type='email' id="input-with-icon-grid" label='Email' />
                </div>
                <div className={classes.input}>
                    <LockOpenIcon className={classes.icon} />
                    <TextField className={classes.root}
                    inputProps={{ classes: {
                        input: classes.resize,
                      }, style: { fontFamily: 'nunito', color: 'white', border:'white'}}}
                       name = 'setPassword'  value={password} onChange={passwordChange}
                       
                       error={passwordError} helperText={passwordError?'Password not match':''}
                       type='password' id="input-with-icon-grid" label="Password" />
                </div>
                
                <div style={{display:'flex',justifyContent:'space-evenly',marginTop:'40px'}}>
                <FacebookIcon style={{fontSize:'35px',cursor:'pointer'}}/>
                <TwitterIcon style={{fontSize:'35px',cursor:'pointer'}}/>
                <span style={{fontFamily: 'Oswald, sans-serif',fontWeight:'bold',fontSize:'30px',cursor:'pointer'}}>G</span>
                </div>
                <div className={classes.input}>
                    <button className={classes.button}>
                        Login
                    </button>
                </div> 
            </form>
            <div className={classes.forget}>Forgot password</div>
            
            </Grid>
        </Grid>
    )
}

export default Login
