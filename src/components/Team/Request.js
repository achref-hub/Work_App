
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon,
     SelectorIcon 
    } from '@heroicons/react/solid'
import H3 from '@material-tailwind/react/Heading3';
import Paragraph from '@material-tailwind/react/Paragraph';
import Input from '@material-tailwind/react/Input';
// import Label from '@material-tailwind/react/Label';
import Typography from '@mui/material/Typography';


import Textarea from '@material-tailwind/react/Textarea';
import Button from '@material-tailwind/react/Button';
import ClipLoader from "react-spinners/ClipLoader";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import './form.css'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// import sick from '../../assets/img/sick.png'
// import casual from '../../assets/img/sunbed.png'
// import compensatory from '../../assets/img/replacement.png'
import Sick from '@mui/icons-material/Sick';
import BeachAccess from '@mui/icons-material/BeachAccess';
import Cached from '@mui/icons-material/Cached';
import Form from './Form';


const color = '#083985'
export default function Request() {


    const [type, setType] = useState('sick')
    const [loading, setloading] = useState(false);

    const handleChange = (event, newType) => {
        setType(newType);
      };
    const handleSend = () => {
        setloading(true)
        setTimeout(function(){
            setloading(false)
            NotificationManager.success('Request sended successfully', 'Success')
            // NotificationManager.error('Something went wrong', 'Error', 5000, () => {
            //     alert('callback');
            //   });
            // setNotif({isOpen:true, message:'Request sended successfully', type: 'success'})
          }, 1000);

        
    }


    return (
        <section className="pb-20 relative block">
            <div className="container max-w-7xl mx-auto px-4 lg:pt-24">
                <Form />
            </div>
        </section>
    );
}
