import {useState, useEffect} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Landing from './pages/Landing';
import Profile from './pages/Profile';
import Login from './pages/Login';
// import Register from './pages/Register';

// Font Awesome Style Sheet
import '@fortawesome/fontawesome-free/css/all.min.css';
import "@material-tailwind/react/tailwind.css";
import 'react-notifications/lib/notifications.css';

// Tailwind CSS Style Sheet
import 'assets/styles/tailwind.css';
import 'assets/styles/style.css';
import Home from './pages/Home';
import OnlineWork from './pages/OnlineWork';
import Leave from './pages/Leave';
import Requests from './pages/Requests';
import Schedule from './pages/Schedule';
import Reservation from 'pages/Reservation';
import Desck from 'pages/Desck';
import Team from './pages/Team';
import Request from './pages/Request';
import TeamRequests from './pages/TeamRequests';
import DetailsRequest from './pages/DetailsRequest';
import jwt from 'jwt-decode'
import axios from 'axios';
import { useParams } from 'react-router';

function App() {
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('user')));
    // const token = JSON.parse(localStorage.getItem("user"))
    // const [user, setUser] = useState(jwt(localStorage.getItem('user')));
    // const user = jwt(JSON.parse(localStorage.getItem("user")))
    const t = JSON.parse(localStorage.getItem("user"))

    const user =  t && jwt(t.token)
    // console.log('token', token && token.token)

    console.log('user', user)


    // if (token){
    //    let decodedData = jwt(token, { header: true });
    //    let expirationDate = decodedData.exp;
    //    console.log('exp', expirationDate)
    //     var current_time = Date.now() / 1000;
    //     if(expirationDate < current_time)
    //     {
    //         localStorage.removeItem("user");
    //         setToken()
    //     }
    // }

    useEffect(() => {
        async function Auth() {
            if (token && (!token.refresh_token || user.isBlocked === true ) ) {
                window.location.pathname = '/login'
                localStorage.removeItem("user");
                setToken()
                
            }
           
        }

        Auth()
    }, []);
    
   

    return (
        <Switch>
                   
                {token && ( <Route exact path="/home" component={Home} /> )}
                {token && ( <Route exact path="/reservation" component={Reservation} /> )}
                {token && ( <Route exact path="/floor/:id"  component={Desck} /> )}
                {token && ( <Route exact path="/onlinework" component={OnlineWork} /> )}
                {token && ( <Route exact path="/requests" component={Requests} /> )}
                {/* {token && ( <Route exact path="/leave" component={Leave} /> )} */}
                {token && ( <Route exact path="/schedule" component={Schedule} /> )}
                {/* {token && ( <Route exact path={`${encodeURIComponent('/request/:id')}`} component={Request} /> )} */}
                {token && ( <Route exact path="/details/:id" component={DetailsRequest} /> )}
                {token && (user.role === "manager_validator" || user.role == "validator") && ( <Route exact path="/team" component={() => <Team />} /> )}
                {token && (user.role === "manager_validator" || user.role == "validator") && ( <Route exact path="/request/:id" component={Request} /> )}
                {token && ( <Route exact path="/profile" component={Profile} /> )}
                {token && (user.role === "manager_validator" || user.role == "manager") && ( <Route exact path="/teamRequests" component={TeamRequests} /> )}            
            
                    
            <Route exact path="/login">
                <Login user={token} setUser={setToken} />
            </Route>
            
            <Redirect from="*" to="/login" />
        </Switch>
    );
}

export default App;
