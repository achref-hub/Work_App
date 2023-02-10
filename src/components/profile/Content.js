import React, {useEffect, useState} from 'react'
import Button from '@material-tailwind/react/Button';
import Image from '@material-tailwind/react/Image';
import H3 from '@material-tailwind/react/Heading3';
import Icon from '@material-tailwind/react/Icon';
import LeadText from '@material-tailwind/react/LeadText';
import ProfilePicture from 'assets/img/team-3-800x800.jpg';
import Avatar from 'assets/img/avatar.png';

import AnimatedNumbers from "react-animated-numbers";
import Chart from "react-google-charts";
import { fetchUser, fetchNbrReservations, fetchNbrWfhs, fetchUserBalances } from 'actions/UserAction';
import AnimatedNumber from "animated-number-react";
import jwt from 'jwt-decode'




export default function Content() {

    const storage = JSON.parse(localStorage.getItem("user"))
    const token = storage.token
    
    const decodedToken = jwt(token)
    const date = new Date()
    var startDate = new Date("2020-01-01")
    var endDate = new Date("2020-01-01")
    endDate.setMonth(date.getMonth()+1)
    endDate.setFullYear(date.getFullYear())
    startDate.setFullYear(date.getFullYear())
    startDate.setMonth(date.getMonth())

    const month = date.getMonth() + 1



    const [user, setUser] = useState({})
    const [nbWFH, setNbWFH] = useState(0)
    const [nbReservation, setNbReservation] = useState(0)
    const [balance, setBalance] = useState(0)
    const formatValue = value => `${Number(value).toFixed(1)}`;



    useEffect( async () => {
        const result = await fetchUser(token, decodedToken.id)
        setUser(result)
        const reservations = await fetchNbrReservations(token, decodedToken.id, startDate.toISOString().substring(0,10) , endDate.toISOString().substring(0,10))
        const wfhs = await fetchNbrWfhs(token, decodedToken.id, startDate.toISOString().substring(0,10) , endDate.toISOString().substring(0,10))
        const data = await fetchUserBalances(token, decodedToken.id)
        const monthBalance = data[0].WFHmonthBalance.filter(item => item.nb === month)
        setBalance(monthBalance[0].count)
        setNbReservation(reservations)
        setNbWFH(wfhs)
    }, []);


    return (
        <section className="relative py-16 bg-gray-100">
            <div className="container max-w-7xl px-4 mx-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-2xl -mt-64">
                    <div className="px-6">
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                <div className="relative">
                                    <div className="w-40 -mt-20">
                                        {
                                            user.photo ?
                                                <Image
                                                    // src={ProfilePicture}
                                                    src={'https://demo.workpoint.tn/uploads/' + user.photo}
                                                    alt="Profile picture"
                                                    raised
                                                    rounded
                                                />
                                            : 
                                                <Image
                                                    src={Avatar}
                                                    alt="Profile picture"
                                                    raised
                                                    rounded
                                                />
                                        }
                                        
                                    </div>
                                </div>
                            </div>
                            {/* <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:self-center flex justify-center mt-10 lg:justify-end lg:mt-0">
                           
                                        <span className="text-xl  block tracking-wide text-gray-900">
                                            22 Leave balance
                                        </span>
                                      
                               
                            </div> */}
                            {/* <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                    <div className="mr-4 p-3 text-center">
                                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-900">
                                            22
                                        </span>
                                        <span className="text-sm text-gray-700">
                                            Sick Leaves
                                        </span>
                                    </div>
                                    <div className="mr-4 p-3 text-center">
                                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-900">
                                            10
                                        </span>
                                        <span className="text-sm text-gray-700">
                                            Casual Leaves
                                        </span>
                                    </div>
                                    <div className="lg:mr-4 p-3 text-center">
                                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-900">
                                            89
                                        </span>
                                        <span className="text-sm text-gray-700">
                                            Telework
                                        </span>
                                    </div>
                                </div>
                            </div> */}
                        </div>

                        <div className="text-center my-8">
                            <H3 color="gray">{user && user.firstname} {user && user.lastname}</H3>
                            {/* <div className="mt-0 mb-2 text-gray-700 font-medium flex items-center justify-center gap-2">
                                <Icon name="place" size="xl" />
                                EY
                            </div> */}
                            <div className="mb-2 text-gray-700 mt-5 flex items-center justify-center gap-2">
                                <Icon name="work" size="xl" />
                               {user && user.grade && user.grade.grade_name}
                            </div>
                            <div className="mb-2 text-gray-700 flex items-center justify-center gap-2">
                                <Icon name="account_balance" size="xl" />
                                {user && user.serviceLine && user.serviceLine.serviceLine}
                            </div>
                            <LeadText color="blueGray">
                                        You have <b>{balance}</b> days left in your WFH balance for {date.toLocaleString('En', { month: 'long' })}.
                            </LeadText>
                        </div>

                       

                        <div className="mb-10 py-2 border-t border-gray-200 text-center">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full lg:w-9/12 px-4 flex flex-col items-center">
                                    <LeadText color="blueGray">
                                    You carried out the following operations during the month of {date.toLocaleString('En', { month: 'long' })} 
                                    </LeadText>
                                     {/*
                                    <a
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <Button
                                            color="lightBlue"
                                            buttonType="link"
                                            ripple="dark"
                                        >
                                            Show more
                                        </Button>
                                    </a> */}

                            <div className="w-full lg:w-12/12 px-4 lg:order-1">
                                <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                    {/* <div className="mr-4 p-3 text-center">
                                        
                                        <span style={{ marginLeft:'1.3em' }} className="text-xl font-bold block uppercase tracking-wide text-gray-900 ">
                                        <AnimatedNumbers
                                            animateToNumber={22}
                                            configs={[
                                            { mass: 1, tension: 220, friction: 100 },
                                            { mass: 1, tension: 180, friction: 130 },
                                            { mass: 1, tension: 280, friction: 90 },
                                            { mass: 1, tension: 180, friction: 135 },
                                            { mass: 1, tension: 260, friction: 100 },
                                            { mass: 1, tension: 210, friction: 180 },
                                            ]}
                                        ></AnimatedNumbers>
                                            
                                        </span>
                                        <span className="text-sm text-gray-700">
                                            Sick Leaves
                                        </span>
                                    </div>
                                    <div className="mr-4 p-3 text-center">
                                        <span style={{ marginLeft:'1.3em' }} className="text-xl font-bold block uppercase tracking-wide text-gray-900">
                                        <AnimatedNumbers
                                            animateToNumber={10}
                                            configs={[
                                            { mass: 1, tension: 220, friction: 100 },
                                            { mass: 1, tension: 180, friction: 130 },
                                            { mass: 1, tension: 280, friction: 90 },
                                            { mass: 1, tension: 180, friction: 135 },
                                            { mass: 1, tension: 260, friction: 100 },
                                            { mass: 1, tension: 210, friction: 180 },
                                            ]}
                                        ></AnimatedNumbers>
                                        </span>
                                        <span className="text-sm text-gray-700">
                                            Casual Leaves
                                        </span>
                                    </div> */}
                                    <div className="lg:mr-4 p-3 text-center">
                                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-900">
                                            {/* <AnimatedNumbers
                                                includeComma={true}
                                                animateToNumber={1.5}
                                                configs={[
                                                { mass: 1, tension: 220, friction: 100 },
                                                { mass: 1, tension: 180, friction: 130 },
                                                { mass: 1, tension: 280, friction: 90 },
                                                { mass: 1, tension: 180, friction: 135 },
                                                { mass: 1, tension: 260, friction: 100 },
                                                { mass: 1, tension: 210, friction: 180 },
                                                ]}
                                            ></AnimatedNumbers> */}
                                            <AnimatedNumber
                                                value={nbWFH}
                                                formatValue={formatValue}
                                                duration={1000}
                                                />
                                        </span>
                                        <span className="text-sm text-gray-700">
                                            WORK FROM HOME
                                        </span>
                                    </div>
                                    <div className="lg:mr-4 p-3 text-center">
                                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-900">
                                        {/* <AnimatedNumbers
                                            animateToNumber={nbReservation}
                                            configs={[
                                            { mass: 1, tension: 220, friction: 100 },
                                            { mass: 1, tension: 180, friction: 130 },
                                            { mass: 1, tension: 280, friction: 90 },
                                            { mass: 1, tension: 180, friction: 135 },
                                            { mass: 1, tension: 260, friction: 100 },
                                            { mass: 1, tension: 210, friction: 180 },
                                            ]}
                                        ></AnimatedNumbers> */}
                                           <AnimatedNumber
                                                value={nbReservation}
                                                formatValue={formatValue}
                                                duration={1000}
                                                />
                                        </span>
                                        <span className="text-sm text-gray-700">
                                            On Site
                                        </span>
                                    </div>
                                </div>
                            </div>

                            
                                </div>
                              

                                <div className="w-full lg:w-9/12 px-4 flex flex-col items-center">

                                {/* <Chart
                                        width={'700px'}
                                        height={'500px'}
                                        chartType="PieChart"
                                        loader={<div>Loading Chart</div>}
                                        data={[
                                            ['Task', 'Days per month'],
                                            ['On Site', 11],
                                            ['WFH', 2],
                                            ['Customer Site', 2],
                                            ['Mission', 3],
                                            ['Leave', 2],
                                        ]}
                                        options={{
                                            title: 'My Daily Activities',
                                            is3D: true,
                                            colors: ['#5262ff', '#2ec6ff', '#b741c4', '#FF4081', '#ab9a00'],
                                        }}
                                        rootProps={{ 'data-testid': '2' }}
                                        /> */}

                                    <Chart
                                        width={'700px'}
                                        height={'500px'}
                                        chartType="PieChart"
                                        loader={<div>Loading Chart</div>}
                                        data={[
                                            ['Task', 'Days per month'],
                                            ['On Site', nbReservation],
                                            ['WORK FROM HOME', nbWFH],
                                            
                                        ]}
                                        options={{
                                            // title: 'My Activities for this month',
                                            is3D: true,
                                            colors: ['#5262ff', '#2ec6ff'],
                                        }}
                                        rootProps={{ 'data-testid': '2' }}
                                        />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
