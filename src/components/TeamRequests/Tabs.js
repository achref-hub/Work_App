
import React, { useState } from 'react';
import Tab from "@material-tailwind/react/Tab";
import TabList from "@material-tailwind/react/TabList";
import TabItem from "@material-tailwind/react/TabItem";
import TabContent from "@material-tailwind/react/TabContent";
import TabPane from "@material-tailwind/react/TabPane";
import Icon from "@material-tailwind/react/Icon";
import BeachAccess from '@mui/icons-material/BeachAccess';
import HomeWork from '@mui/icons-material/HomeWork';
import FlightIcon from '@mui/icons-material/Flight';
import WFH from './WFH';

  export default function Tabs(props) {


    const [openTab, setOpenTab] = useState(1);


    return (
        <>
            
            <Tab>
            {/* <TabList color="indigo">
                <TabItem
                    style={{ marginLeft: 390 }}
                    onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(1);
                    }}
                    ripple="light"
                    active={openTab === 1 ? true : false}
                    href="tabItem"
                >
                    <HomeWork fontSize="medium"  />
                    WFH
                </TabItem>
                <TabItem
                    onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(2);
                    }}
                    ripple="light"
                    active={openTab === 2 ? true : false}
                    href="tabItem"
                >
                    <BeachAccess fontSize="medium" />
                    Leave
                </TabItem>
                <TabItem
                    onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(3);
                    }}
                    ripple="light"
                    active={openTab === 3 ? true : false}
                    href="tabItem"
                >
                    <FlightIcon fontSize="medium" />
                    Mission
                </TabItem>
            </TabList> */}

            <TabContent>
                <TabPane active={openTab === 1 ? true : false}>
                    <WFH />
                    {/* <p>
                       WFH table
                    </p> */}
                </TabPane>
                <TabPane active={openTab === 2 ? true : false}>
                    <p>
                        Leave table
                    </p>
                </TabPane>
                <TabPane active={openTab === 3 ? true : false}>
                    <p>
                        Missions table
                    </p>
                </TabPane>
            </TabContent>
        </Tab>
                            
                       
        </>
    );
}
