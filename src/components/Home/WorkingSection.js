
import React, {useState} from 'react';
import StatusCard from 'components/Home/StatusCard';
import './style.css'
import WorkOffIcon from '@mui/icons-material/WorkOff';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Wfhpage from './WFHPage';
import DefaultNavbar from '../Navbars/DefaultNavbar';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });




export default function WorkingSection() {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };


    return (
        <>
                <section className="pb-20 bg-gray-100 mt-30">
                    {/* <div className="container max-w-7xl mx-auto px-4">
                        
                        <div className="flex flex-wrap relative z-50">
                        
                            <StatusCard 
                                color="red" 
                                icon="maps_home_work" 
                                // family="font-awesome" 
                                title="WFH"
                                href="/onlinework"
                            >
                                Submit a request for WFH 
                            </StatusCard>
                            <StatusCard
                                color="lightBlue"
                                icon="launch"
                                title="Leave"
                                href="/leave"
                            >
                                
                                Submit a request for leave
                            </StatusCard>
                            <StatusCard
                                color="teal"
                                icon="fa fa-file"
                                title="Requests"
                                family="font-awesome"
                                href="/requests"
                            >
                                Check your requests status
                            </StatusCard>
                        </div>

                        
                    </div> */}
                    <div className="container max-w-7xl mx-auto  ">
                    
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full lg:w-4/12 ">
                            <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
                                <div className="flex-auto  ">
                                    <div className="w-full text-center pointer" onClick={handleClickOpen}>
                                    
                                        <StatusCard 
                                            color="red" 
                                            icon="maps_home_work" 
                                            title="Flex Working"
                                            // href="/onlinework"
                                        >
                                            Submit a request for work from home 
                                        </StatusCard>
                                    </div>
                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        
            
            </section>


        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            {/* <AppBar sx={{ position: 'relative', background:'#ffffff' }}> */}
                <Toolbar>
                {/* <DefaultNavbar /> */}
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                        sx={{ position: 'absolute', top: 10, right: 10 }}
                    >
                        <CloseIcon style={{ color: '#294e87' }} />
                    </IconButton>
            
            
                </Toolbar>
                <Wfhpage />
            {/* </AppBar> */}
       
      </Dialog>
        </>
    
    );
}
