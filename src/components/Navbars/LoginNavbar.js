import { useState } from 'react';
// import { Link } from 'react-router-dom';
import Navbar from '@material-tailwind/react/Navbar';
import NavbarContainer from '@material-tailwind/react/NavbarContainer';
import NavbarWrapper from '@material-tailwind/react/NavbarWrapper';
import NavbarBrand from '@material-tailwind/react/NavbarBrand';
import NavbarToggler from '@material-tailwind/react/NavbarToggler';
import logo from '../../assets/img/white.png';
// import NavbarCollapse from '@material-tailwind/react/NavbarCollapse';
// import Nav from '@material-tailwind/react/Nav';
// import NavLink from '@material-tailwind/react/NavLink';
// import Dropdown from '@material-tailwind/react/Dropdown';
// import DropdownItem from '@material-tailwind/react/DropdownItem';
// import Icon from '@material-tailwind/react/Icon';
// import Button from '@material-tailwind/react/Button';

export default function LoginNavbar() {
    const [openNavbar, setOpenNavbar] = useState(false);

    return (
        <Navbar color="transparent" navbar>
            <NavbarContainer>
                <NavbarWrapper>
                    <a
                        href="https://material-tailwind.com?ref=mtk"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <NavbarBrand>
                            {/* WORK POINT */}
                            <img src={logo} width={150} />
                            </NavbarBrand>
                    </a>
                    <NavbarToggler
                        onClick={() => setOpenNavbar(!openNavbar)}
                        color="white"
                    />
                </NavbarWrapper>
                {/* <NavbarCollapse open={openNavbar}>
                    <Nav>
                        <div className="flex flex-col z-50 lg:flex-row lg:items-center">
                            
                            <a
                                href="https://x-point.tech/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Button
                                    color="transparent"
                                    className="bg-white text-black ml-4"
                                    ripple="dark"
                                >
                                    Contact Us
                                </Button>
                            </a>
                        </div>
                    </Nav>
                </NavbarCollapse> */}

                
            </NavbarContainer>
        </Navbar>
    );
}
