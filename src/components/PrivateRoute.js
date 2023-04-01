import React from 'react';
import { Route, Redirect } from 'react-router-dom';


function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            { ...rest }
            render={() => {
                if (window.sessionStorage.getItem('token')) {
                    return <Component/>
                } else {
                    return <Redirect to="/Login" />;
                }
            }} 
        />    
    )
}

export default PrivateRoute