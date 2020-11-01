import React, {useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {UserContext} from '../Store/Store'


function PrivateRoutes({component:Component,...rest}) {
    const [initialState] = useContext(UserContext);
/*
    const loadUSer = () =>{
        console.log('Initial State ',initialState)
        Axios.get("/api/user/auth").then(res=>{
            console.log('res data', res.data)
            const {isAuth} = res.data.isAuth;
            if(isAuth){
                const {name,email,_id} = res.data.user;
                 return setState({...initialState,name,email,isAuth,_id});
                }
            else{
                setState({...initialState,isAuth:false})
            }
            
            //<Redirect to='/Login'/>
        })
          }
       
        useEffect(()=>{
              loadUSer();
          },[])*/
    return (
        console.log('Route ',rest),
        <Route {...rest} render={(props)=>(
            initialState.isAuth === true ? <Component {...props}/>:<Redirect to='/Login' />
        )}/>
    )
}

export default PrivateRoutes
