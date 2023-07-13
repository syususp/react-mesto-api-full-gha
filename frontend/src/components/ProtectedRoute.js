// import React from 'react';
// import { Navigate, Route } from "react-router-dom";

// // const ProtectedRoute = ({ element: Component, loggedIn, ...props }) => {
// //     return (
// //         loggedIn ? <Route {...props} element={Component} /> : <Navigate to="/sign-in" replace />
// //     )
// // }

// function ProtectedRoute({ element, path, loggedIn, ...rest }) {
//     return (
//         <Route
//             path={path}
//             element={loggedIn ? element : <Navigate to="/sign-in" />}
//             {...rest}
//         />
//     );
// }


// export default ProtectedRoute;


// import React from 'react';
// import { Navigate, Route } from "react-router-dom";

// function ProtectedRoute({ element: Component, loggedIn, ...props }) {
//     return (
//         <Route {...props} element={
//             () => loggedIn ? <Component /> : <Navigate to="/sign-in" replace />
//         } />
//     );
// }

// export default ProtectedRoute;


import React from 'react';
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ element, loggedIn, ...props }) {
    const navigate = useNavigate();
    console.log(loggedIn);
    console.log('we are here');
    React.useEffect(() => {
        if (!loggedIn) {
            console.log('not logged in');
            navigate("/sign-in");
        }else{
            console.log('logged in');
            
        }
    }, [loggedIn, navigate]);

    return loggedIn ? React.cloneElement(element, props) : null;
}

export default ProtectedRoute;
