import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from '@material-tailwind/react/Navbar';
import NavbarContainer from '@material-tailwind/react/NavbarContainer';
import NavbarWrapper from '@material-tailwind/react/NavbarWrapper';
import NavbarBrand from '@material-tailwind/react/NavbarBrand';
import NavbarToggler from '@material-tailwind/react/NavbarToggler';
import NavbarCollapse from '@material-tailwind/react/NavbarCollapse';
import Nav from '@material-tailwind/react/Nav';
import NavLink from '@material-tailwind/react/NavLink';
import Dropdown from '@material-tailwind/react/Dropdown';
import DropdownItem from '@material-tailwind/react/DropdownItem';
import Icon from '@material-tailwind/react/Icon';
import logo from '../../assets/img/logo_WP_web_bleu.png';
import { logout } from '../../actions/UserAction'
import Badge from '@mui/material/Badge';
import openSocket from "socket.io-client";
import jwt from 'jwt-decode'

// const color = '#052d6b'
// const color = '#0d47a1'
// const color = '#3f51b5'
const color = '#083985'
// const color = '#000063'

// import Button from '@material-tailwind/react/Button';

export default function DefaultNavbar() {
    const [openNavbar, setOpenNavbar] = useState(false);
    const history = useHistory();
    const storage = JSON.parse(localStorage.getItem("user"))
    const token = storage.token
    
    const [ user, setUser ] = useState(jwt(token))
    // const [ counter, setCounter ] = useState(0)
    const [ socket, setSocket ] = useState(null)
    const [ notif, setNotif ] = useState(0)

    var counter = 0

    

    // const socket = openSocket("http://localhost:5000/", {
    //     transports: ["websocket", "polling", "flashsocket"],
    //     });

    // useEffect(() => {
    //     setSocket(openSocket("http://localhost:5000/", {transports: ["websocket", "polling", "flashsocket"]}))
    // }, []);
        
    // const getData = idUser => {
    //     console.log(idUser);
    //     if (user._id === idUser ) {
    //         console.log('notiiiiiiiiiiiiiif')
    //         console.log('counterbefore', counter)
    //         setCounter(counter+1)
    //         console.log('counterafter', counter)
    //     }
    // };


    // useEffect(() => {
              

    //     // socket?.on("change_counter", getData);
    //     socket?.on('change_counter', (idUser) => {
    //         console.log('msg', idUser)
    //         if (user._id === idUser ) {
    //             console.log('notiiiiiiiiiiiiiif')
    //             // setCounter(idUser)
    //             counter = counter +1
    //             // console.log('counter', counter)

    //         }
    //     } )

    //     // socket?.on('change_counter', (id) => {
    //     //     console.log('hey')
    //     //     setCounter(id);
    //     // });

    //     return () => socket?.disconnect();

    // }, [socket, counter]);


    // useEffect(() => {
    //     console.log('kkkkkkk')
    //    setNotif(counter)
    // }, [counter]);

    // console.log(counter)
    // console.log('notif', notif)


  


    const handleSignOut = async (event) => {
        event.preventDefault();
        await logout(history)
      };
    
    const handleClick = (e) => {
        e.preventDefault();
        // setCounter(0)

    };
    
    // setTimeout(() => {
    //     setCounter(counter+1)
    // }, 4000);

    // console.log('counter', counter)

      
    return (
        <Navbar color="transparent" navbar>
            <NavbarContainer>
                <NavbarWrapper>
                    <a
                        href="/home"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <NavbarBrand color="gray">
                            {/* WORK POINT */}
                            <img src={logo} width={150} />
                        </NavbarBrand>
                    </a>
                    <NavbarToggler
                        onClick={() => setOpenNavbar(!openNavbar)}
                        color="white"
                    />
                </NavbarWrapper>
                <NavbarCollapse open={openNavbar}>
                    <Nav >
                        <div  className="flex  flex-col z-50 lg:flex-row lg:items-center text-gray">
                            <div className="text-blue ">
                                <div className="py-2.5 font-medium flex items-center">
                                
                                    <NavLink
                                        href="/home"
                                        // target="_blank"
                                        rel="noreferrer"
                                        ripple="light"
                                    >
                                        <Icon style={{ color: color }} name="dashboard" size="xl"  />
                                        <span style={{ color: color }} className="ml-1">
                                                <b> Home</b>
                                        </span>
                                    </NavLink>
                                    
                                </div>

                            </div>
                            
                           {(user.role === "manager_validator")  ? <div className="text-blue ">
                                <div className="py-2.5 font-medium flex items-center">
                           
                                     <NavLink
                                        href="/validator"
                                        // target="_blank"
                                        rel="noreferrer"
                                        ripple="light"
                                    >
                                        <Icon style={{ color: color }} name="people" size="2xl"  />
                                        <span style={{ color: color }} className="ml-1">
                                                <b> My Validations</b>
                                        </span>
                                    </NavLink>
                            </div>
                           
                            </div> : <>
                            <div className="text-blue">
                                <div className="py-2.5 font-medium flex items-center">
                                    {/* <Icon name="calendar_today" size="xl"  />
                                    <Link to="/schedule">
                                        <span className="text-gray-900 ml-2">
                                            My schedule
                                        </span>
                                    </Link> */}
                                     <NavLink
                                        href="/schedule"
                                        // target="_blank"
                                        rel="noreferrer"
                                        ripple="light"
                                    >
                                        <Icon style={{ color: color }} name="calendar_today" size="xl"  />
                                        <span style={{ color: color }} className="ml-1">
                                                <b> My schedule</b>
                                        </span>
                                    </NavLink>
                            </div>
                           
                            </div>
                            <div className="text-blue ">
                                <div className="py-2.5 font-medium flex items-center">
                           
                                     <NavLink
                                        href="/leaves"
                                        // target="_blank"
                                        rel="noreferrer"
                                        ripple="light"
                                    >
                                        <Icon style={{ color: color }} name="fa fa-file" family="font-awesome"   />
                                        <span style={{ color: color }} className="ml-1">
                                                <b> My requests</b>
                                        </span>
                                    </NavLink>
                            </div>
                           
                            </div>                            
                            </>}
                            
                            <div className="text-gray">
                                <Dropdown
                                    color="transparent"
                                    size="sm"
                                    buttonType="link"
                                    style={{ color: color }}
                                    buttonText={
                                        <div className="py-2.5 font-medium flex items-center">
                                            <Icon
                                                name="fa fa-user"
                                                // size="xl"
                                                family="font-awesome"
                                                style={{ color: color }}
                                            />
                                            <span style={{ color: color }} className="text-gray-900 ml-2 dropdown-menu">
                                            {user.firstname} {user.lastname}
                                            </span>
                                        </div>
                                    }
                                    ripple="light"
                                >
                                    <Link to="/profile">
                                        <DropdownItem color="indigo">
                                            Profile
                                        </DropdownItem>
                                    </Link>
                                    
                                    {/* <Link to="/login"> */}
                                        <DropdownItem color="indigo" onClick={handleSignOut}>
                                            Logout
                                        </DropdownItem>
                                    {/* </Link> */}
                                </Dropdown>
                            </div>

                            {/* <div className="text-gray">
                                <Dropdown
                                    color="transparent"
                                    size="sm"
                                    buttonType="link"
                                    style={{ color: color }}
                                    buttonText={
                                        <div className="py-2.5 font-medium flex items-center">
                                            {
                                                notif !== 0 ?
                                                    <Badge badgeContent={notif} color="error" onClick={(e) => {handleClick(e)}} >
                                                        <Icon
                                                            name="notifications"
                                                            size="xl"
                                                            style={{ color: color }}
                                                        />
                                                    </Badge>
                                                : 
                                                    <Icon
                                                        name="notifications"
                                                        size="xl"
                                                        style={{ color: color }}
                                                    />

                                            }
                                            
                                        </div>
                                    }
                                    ripple="light"
                                >
                                    <Link to="/profile">
                                        <DropdownItem color="indigo">
                                        <label
                                                                className="
                                                                    items-center
                                                                    flex        
                                                                    cursor-pointer
                                                                    hover:bg-indigo-500 hover:text-white
                                                                    text-gray-700
                                                                    ease-linear
                                                                    transition-all
                                                                    duration-150
                                                                    px-2
                                                                    py-2
                                                                    
                                                                "
                                                                >
                                                                <i className="fas fa-bell"></i>
                                                                <p className='pl-5' >Amira accepted your sick leave</p>
                                                </label>
                                        </DropdownItem>
                                    </Link>
                                    
                                    <Link to="/register">
                                        <DropdownItem color="indigo">
                                        <label
                                                                className="
                                                                    items-center
                                                                    flex        
                                                                    cursor-pointer
                                                                    hover:bg-indigo-500 hover:text-white
                                                                    text-gray-700
                                                                    ease-linear
                                                                    transition-all
                                                                    duration-150
                                                                    px-2
                                                                    py-2
                                                                    
                                                                "
                                                                >
                                                                <i className="fas fa-bell"></i>
                                                                <p className='pl-5' >Amira accepted your sick leave</p>
                                                </label>
                                        </DropdownItem>
                                    </Link>
                                </Dropdown>
                            </div> */}
                            
                        </div>
                    </Nav>
                </NavbarCollapse>
                

                
            </NavbarContainer>
        </Navbar>
    );
}
