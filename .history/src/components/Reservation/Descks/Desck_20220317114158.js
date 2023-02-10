import React, { useEffect, useState } from 'react';
import Card from './Card';
import H3 from '@material-tailwind/react/Heading3';
import Paragraph from '@material-tailwind/react/Paragraph';
import Box from '@mui/material/Box';

import './form.css'
import Calendar from './Calendar';

import Typography from '@material-ui/core/Typography';
import { fetchRequestsByUser } from 'actions/RequestAction';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import frLocale from 'date-fns/locale/fr';
import Button from '@material-tailwind/react/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Building from './Building';
import jwt from 'jwt-decode'

const color = '#083985'
const maskMap = {
    fr: '__/__/____',
    en: '__/__/____',
    ru: '__.__.____',
    de: '__.__.____',
  };



export default function Requests() {

    const storage = JSON.parse(localStorage.getItem("user"))
    const token = storage.token
    const user = jwt(token)




    return (
        <section className="pb-20 relative block">
            <div className="container max-w-12xl mx-auto px-4 lg:pt-24">
                <div className="flex flex-wrap justify-center mt-5">
                    <div className="w-full lg:w-12/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
                               <Calendar />
                            <div className="flex flex-wrap justify-center flex-grow-3 gap-4 mt-6 mb-6">
                           
                            
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
