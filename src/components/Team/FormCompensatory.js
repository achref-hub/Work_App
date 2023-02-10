import { Fragment, useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Input from '@material-tailwind/react/Input';
import Textarea from '@material-tailwind/react/Textarea';
import Button from '@material-tailwind/react/Button';
import H3 from '@material-tailwind/react/Heading3';
import Paragraph from '@material-tailwind/react/Paragraph';
import Box from '@mui/material/Box';
import Cached from '@mui/icons-material/Cached';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const color = '#083985'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }


export default function FormCompensatory (props) {

    const [loading, setloading] = useState(false);

    console.log("props", props.data)

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

    <>
      <Box
    sx={{ width: '700px' }}
    role="presentation"

  >
        <div className="flex flex-wrap justify-center mt-18">
              <div className="w-full lg:w-8/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
                      <div className="flex-auto p-5 lg:p-10">
                          <div className="w-full text-center">
                             <div className='header-form'>
                                  <H3 style={{ color: color }}>Compensatory Leave</H3> 
                                  <Cached style={{ color: color }} className='ml-4 mt-4' />
                             </div>
                             
                              <Paragraph color="blueGray">
                                  Complete this form to send a request for compensatory leave.
                              </Paragraph>
                          </div>
                          <form  onSubmit={(e) => e.preventDefault()}>
                              
                                                  <div className="flex gap-8 mt-16 mb-12">
                                                  
                                                          <Input
                                                              type="date"
                                                              placeholder="From"
                                                              color="indigo"
                                                          />
                                                          <Input
                                                              type="date"
                                                              placeholder="To"
                                                              color="indigo"
                                                          />
                                                          
                                                      
                                                  </div>
                                                  <div>
                                                  <div className="mt-2">
                                                      <div>
                                                          <label className="inline-flex items-center ml-2">
                                                              <input
                                                              type="radio"
                                                              class="form-radio"
                                                              name="radio"
                                                              value="1"
                                                              checked
                                                              />
                                                              <span className="ml-2">AM</span>
                                                          </label>
                                                  
                                                      
                                                          <label className="inline-flex items-center ml-2">
                                                              <input type="radio" class="form-radio" name="radio" value="2" />
                                                              <span className="ml-2">PM</span>
                                                          </label>
                                                  
                                                          <label className="inline-flex items-center ml-2">
                                                              <input type="radio" class="form-radio" name="radio" value="3" />
                                                              <span className="ml-2">All day</span>
                                                          </label>
                                                      </div>
                                                  </div>
                                                  </div>
                                                  <div  className="flex gap-8 mt-16 mb-12">
                                                      <Textarea color="indigo" placeholder="Commentary" />
                                                  </div>
                                                  
                                                  <div className="flex justify-center mt-20">
                                                    <Button style={{ backgroundColor : '#f2f2f2' }} onClick={() => {handleSend()}}>
                                                        <ClipLoader color="green" loading={loading}  size={20} />
                                                        <CheckIcon size='xl' style={{ color: 'green' }}  />
                                                        {/* <i className="fas fa-check"></i> */}
                                                    </Button>
                                                    <Button style={{ backgroundColor : '#f2f2f2' }} className="pl-20"  >
                                                        <ClipLoader color="red" loading={loading}  size={20} />
                                                        <CloseIcon style={{ color: 'red' }}  />
                                                        {/* <i className="fas fa-times text-red"></i> */}
                                                    </Button>
                                                    </div>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
          <NotificationContainer/>

        </Box>
  
    </>
    )
}