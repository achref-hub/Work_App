
import React, {useState} from 'react'
import Tabs from './Tabs';
import H3 from '@material-tailwind/react/Heading3';
import Paragraph from '@material-tailwind/react/Paragraph';

import './form.css'
import Sick from '@mui/icons-material/Sick';
import BeachAccess from '@mui/icons-material/BeachAccess';
import HomeWork from '@mui/icons-material/HomeWork';
import Cached from '@mui/icons-material/Cached';
import Typography from '@material-ui/core/Typography';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const color = '#083985'




export default function Section() {

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <section className="pb-20 relative block">
            <div className="container max-w-7xl mx-auto px-4 lg:pt-24">
                <div className="flex flex-wrap justify-center mt-5">
                    <div className="w-full lg:w-12/12 px-6">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
                            <div className="flex-auto p-5 lg:p-10">
                                <div className="w-full text-center">
                                    <H3 style={{ color: color }}>My Pending requests</H3>
                        
                                    <Paragraph color="gray">
                                        The latest team's requests.
                                    </Paragraph>
                                </div>
                   
                            </div>
                            <div className="flex flex-wrap justify-center flex-grow-3 gap-8 mt-16 mb-12">
                            {/* <Box sx={{ width: '100%', typography: 'body1' }}>
                                <TabContext value={value}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab label="Item One" value="1" />
                                        <Tab label="Item Two" value="2" />
                                        <Tab label="Item Three" value="3" />
                                    </TabList>
                                    </Box>
                                    <TabPanel value="1">Item One</TabPanel>
                                    <TabPanel value="2">Item Two</TabPanel>
                                    <TabPanel value="3">Item Three</TabPanel>
                                </TabContext>
                                </Box> */}
                                <Tabs />
                                
                            </div>
                            
                        </div>
                    </div>
                </div>
              
               
            </div>
        </section>
    );
}
