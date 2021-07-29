import React , {useContext} from 'react';
import { Route , Redirect } from 'react-router-dom';
import UserContext from '../../Context/UserContext/UserContext';

const PrivateRoute = ({ children, ...rest }) => {

  const {user} = useContext(UserContext);
    console.log('PrivateRoute' , user)

    if(!user){
      return <Redirect to='/login' />
    }

  return  <Route {...rest} render={() => children} />
}

export default PrivateRoute;
