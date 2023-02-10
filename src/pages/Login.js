import React, {useState } from 'react'
import { useHistory } from 'react-router-dom';
import Card from '@material-tailwind/react/Card';
import CardBody from '@material-tailwind/react/CardBody';
import CardFooter from '@material-tailwind/react/CardFooter';
import InputIcon from '@material-tailwind/react/InputIcon';
import Checkbox from '@material-tailwind/react/Checkbox';
import Button from '@material-tailwind/react/Button';
import LoginNavbar from 'components/Navbars/LoginNavbar';
import SimpleFooter from 'components/Footers/LoginFooter';
import Page from 'components/login/Page';
import Container from 'components/login/Container';
import animationData from '../assets/lotties/animated';
import Lottie from 'react-lottie';
// import H6 from '@material-tailwind/react/Heading6';
import { Link } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import {NotificationContainer, NotificationManager} from 'react-notifications';

import './style.css'
import { login } from '../actions/UserAction'
import ForgetPassword from 'components/login/ForgetPassword';



export default function Login(props) {


    const {setUser} = props
    const history = useHistory();


    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
        }
      };

      const [loading, setLoading] = useState(false);
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');

      const [forgetPasswordScreen, setForgetPasswordScreen] = useState({isOpen: false})




      const handleLogin = async (e) => {
        e.preventDefault();


            setLoading(true)

            const result = await login(email, password)
            if (result === 'Login Success') {
                setLoading(false)
                NotificationManager.success(result)
                await setUser(JSON.parse(localStorage.getItem('user')))
                setTimeout(function(){
                    history.push("/home");
                  }, 1000);
            } else {
                setLoading(false)
                NotificationManager.error(result)
            }
        

       
        // form.current.validateAll();
        // if (form.current.context._errors.length === 0) {
        //     setLoading(true);

        //     const result = await login(email, password)
        // }

        

    
    
        // if (checkBtn.current.context._errors.length === 0) {
        //   dispatch(login(Email, password, props.history))
        //     .then(() => {
        //       setTimeout(function(){
        //         setLoading(false);
        //         // props.history.push("/web/admin");
        //       }, 1000);
              
        //       // debugger
        //       // window.location.reload();
        //     })
        //     .catch((e) => {
        //       setLoading(false);
        //     });
        // } else {
        //   setLoading(false);
        // }
      };


    return (
        <Page>
            <LoginNavbar />
            <Container>
            <form onSubmit={handleLogin} >

                <Card>

                    <CardBody>
                        <Lottie 
                            options={defaultOptions}
                            height={250}
                            width={250}
                        />
                       {/* <center> <H6 color="indigo">WORK POINT</H6></center><br/> */}
                        <div className="mb-12 px-4 bg-bb">
                            <InputIcon
                                type="email"
                                color="indigo"
                                placeholder="Email Address"
                                iconName="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                required='true'

                            />
                        </div>
                        <div className="mb-8 px-4">
                            <InputIcon
                                type="password"
                                color="indigo"
                                placeholder="Password"
                                iconName="lock"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                                required='true'
                            />

                        </div>
                        {/* <div className="mb-4 px-4">
                            <Checkbox
                                color="indigo"
                                text="Remember Me"
                                id="remember"
                            />
                        </div> */}
                         <div className="mb-4 px-4">
                    
                            <small className='forget-password' onClick={() => { setForgetPasswordScreen({isOpen:true}) }} color="indigo">Forgot password?</small>
                    
                               
                        </div>
                    </CardBody>
                    <CardFooter>
                        <div className="flex justify-center bg-bb">
                            <Button
                                color="indigo"
                                buttonType="filled"
                                size="lg"
                                rounded={true}
                                ripple="dark"
                                disabled={loading}
                            >
                               <ClipLoader color="white" loading={loading}  size={20} />
                                
                                Login
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </form>

            </Container>
            <SimpleFooter />
            <NotificationContainer/>
            {
                forgetPasswordScreen.isOpen && <ForgetPassword forgetPasswordScreen={forgetPasswordScreen} setForgetPasswordScreen={setForgetPasswordScreen} />
            }

        </Page>
    );
}
