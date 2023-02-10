import { useState } from 'react';
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
// import logo from '../../assets/img/white.png';
// import Button from '@material-tailwind/react/Button';
import logo from '../../assets/img/logo_WP_web_blanc.png';

import './style.css'
import { logout } from '../../actions/UserAction'
import jwt from 'jwt-decode'


export default function LoginNavbar() {
    const [openNavbar, setOpenNavbar] = useState(false);
    const storage = JSON.parse(localStorage.getItem("user"))
    const token = storage.token

    const [ user, setUser ] = useState(jwt(token))

    const history = useHistory();


    const handleSignOut = async (event) => {
        event.preventDefault();
        await logout(history)
      };

    return (
        <Navbar color="transparent" navbar>
            <NavbarContainer>
                <NavbarWrapper>
                    <a
                        href="/home"
                        // target="_blank"
                        rel="noreferrer"
                    >
                        <NavbarBrand>
                            <img src={logo} width={150} />
                        </NavbarBrand>
                    </a>
                    <NavbarToggler
                        onClick={() => setOpenNavbar(!openNavbar)}
                        color="white"
                    />
                </NavbarWrapper>
                <NavbarCollapse open={openNavbar}>
                    <Nav>
                        <div className="flex flex-col z-50 lg:flex-row lg:items-center">
                          
                        {(user.role === "manager_validator")  ? <NavLink
                                href="/validator"
                                // target="_blank"
                                rel="noreferrer"
                                ripple="light"
                            >
                                <Icon name="people" size="xl"   />
                                &nbsp;My Validations 
                            </NavLink> : <>
                            <NavLink
                                href="/home"
                                // target="_blank"
                                rel="noreferrer"
                                ripple="light"
                            >
                                <Icon name="dashboard" size="xl" />
                                &nbsp;Home 
                            </NavLink>
                            <NavLink
                                href="/schedule"
                                // target="_blank"
                                rel="noreferrer"
                                ripple="light"
                            >
                                <Icon name="calendar_today" size="xl" />
                                &nbsp;My schedule 
                            </NavLink>
                            <NavLink
                                href="/leaves"
                                // target="_blank"
                                rel="noreferrer"
                                ripple="light"
                            >
                                <Icon name="fa fa-file" family="font-awesome"  />
                                &nbsp;My requests 
                            </NavLink>
                            </>}
                    {/* {
                        (user.role === "manager" || user.role === "manager_validator") && (
                            <>
                            <div className="text-white">
                                <Dropdown
                                    color="transparent"
                                    size="sm"
                                    buttonType="link"
                                    buttonText={
                                        <div className="py-2.5 font-medium flex items-center ">
                                            <Icon name="people" size="2xl" />
                                            <span className="ml-2 dropdown-menu">
                                                My team
                                            </span>
                                        </div>
                                    }
                                    ripple="light"
                                >
                                    <Link to="/team">
                                        <DropdownItem color="indigo">
                                            My Team's schedule
                                        </DropdownItem>
                                    </Link>
                                    <Link to="/teamRequests">
                                        <DropdownItem color="indigo">
                                            My Pending requests
                                        </DropdownItem>
                                    </Link>
                                    
                                        
                                </Dropdown>
                            </div>
                      
                            </>
                        )
                        }    */}
                            <div className="text-white">
                                <Dropdown
                                    color="transparent"
                                    size="sm"
                                    buttonType="link"
                                    buttonText={
                                        <div className="py-2.5 font-medium flex items-center ">
                                            <Icon
                                                name="fa fa-user"
                                                // size="xl"
                                                color="white"
                                                family="font-awesome"
                                            />
                                            <span className="ml-2 dropdown-menu">
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
                                    
                                        <DropdownItem color="indigo" onClick={handleSignOut}>
                                            Logout
                                        </DropdownItem>
                                </Dropdown>
                            </div>

                            {/* <div className="text-white">
                                <Dropdown
                                    color="transparent"
                                    size="sm"
                                    buttonType="link"
                                    buttonText={
                                        <div className="py-2.5 font-medium flex items-center">
                                            <Icon
                                                name="notifications"
                                                size="xl"
                                                color="white"
                                            />
                                            
                                        </div>
                                    }
                                    ripple="light"
                                >
                                    <Link to="/profile">
                                        <div className=' flex items-center notification-hover' >
                                           
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
                                    </div>
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
                                                                <p className='pl-5' >Amira rejected your casual leave</p>
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
