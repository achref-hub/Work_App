import { Fragment, useState, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon,
     SelectorIcon 
    } from '@heroicons/react/solid'
import H3 from '@material-tailwind/react/Heading3';
import Paragraph from '@material-tailwind/react/Paragraph';
import Input from '@material-tailwind/react/Input';
import Textarea from '@material-tailwind/react/Textarea';
import Button from '@material-tailwind/react/Button';
import ClipLoader from "react-spinners/ClipLoader";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import './form.css'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import PickersDay from '@mui/lab/PickersDay';
import endOfWeek from 'date-fns/endOfWeek';
import isSameDay from 'date-fns/isSameDay';
import isWithinInterval from 'date-fns/isWithinInterval';
import startOfWeek from 'date-fns/startOfWeek';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const color = '#294e87'


const people = [
    {
      id: 1,
      name: 'Wade Cooper',
      avatar:
        'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 2,
      name: 'Arlene Mccoy',
      avatar:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 3,
      name: 'Devon Webb',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
    },
    {
      id: 4,
      name: 'Tom Cook',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 5,
      name: 'Tanya Fox',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 6,
      name: 'Hellen Schmidt',
      avatar:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 7,
      name: 'Caroline Schultz',
      avatar:
        'https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 8,
      name: 'Mason Heaney',
      avatar:
        'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 9,
      name: 'Claudie Smitham',
      avatar:
        'https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 10,
      name: 'Emil Schaefer',
      avatar:
        'https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ]


  
  
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) =>
      prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
  })(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
    ...(dayIsBetween && {
      borderRadius: 0,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      '&:hover, &:focus': {
        backgroundColor: theme.palette.primary.dark,
      },
    }),
    ...(isFirstDay && {
      borderTopLeftRadius: '50%',
      borderBottomLeftRadius: '50%',
    }),
    ...(isLastDay && {
      borderTopRightRadius: '50%',
      borderBottomRightRadius: '50%',
    }),
  }));

  export default function Form() {

    const [selected, setSelected] = useState(people[3])
    const [loading, setloading] = useState(false);
    // const [notif, setNotif] = useState ({ isOpen: false, message:'', type:'' })

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

    const [value, setValue] = useState(new Date());
    const [selectedDates, setSelectedDates] = useState([])
    const [checkedAM, setcheckedAM] = useState([]);
    const [checkedPM, setcheckedPM] = useState([]);
    const [selectedAM, setselectedAM] = useState([])
    const [selectedPM, setselectedPM] = useState([])
    const [nbrWeek, setNbrWeek] = useState(3)
    const [nbrMonth, setNbrMonth] = useState(10)

    var tab = []
    var startDate
    var endDate
    var startWeek = startOfWeek(new Date());
    var today = new Date()





    


    const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {

        if (!value) {
          return <PickersDay {...pickersDayProps} />;
        }
    
        const start = startOfWeek(value);
        const end = endOfWeek(value);
    
        const dayIsBetween = isWithinInterval(date, { start, end });
        const isFirstDay = isSameDay(date, start);
        const isLastDay = isSameDay(date, end);
        
        startDate =  new Date(start)
        endDate =  new Date(end)

        return (
          <CustomPickersDay
            {...pickersDayProps}
            disableMargin
            dayIsBetween={dayIsBetween}
            isFirstDay={isFirstDay}
            isLastDay={isLastDay}
          />
        );
      };


      useEffect(() => {
        var DAYS = ['Saturday', 'Sunday' ,'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        var d = startDate;
        tab = []
        
        while (d < endDate) {
            const date = d.toISOString().substring(0,10)
            const str = DAYS[d.getDay()] + ' ' + date.split('-').reverse().join('-')
            var obj = {
                'date': date,
                'value': str,
                // 'AM': false,
                // 'PM': false
            }
      
            tab.push(obj)

           
            d = new Date(d.getTime() + (24 * 60 * 60 * 1000));
        }
        
        setSelectedDates(tab.slice(2));
        setcheckedAM(new Array(tab.length-2).fill(false) )
        setcheckedPM(new Array(tab.length-2).fill(false) )
        
       
    }, [value]);


    const handleOnChangeAM = (position) => {
        const updatedCheckedState = checkedAM.map((item, index) =>
          index === position ? !item : item
        );
   
        setcheckedAM(updatedCheckedState);
        if (checkedPM[position] == false ){
            if (checkedAM[position] == false) {
                setNbrWeek(nbrWeek - 1)   
                setNbrMonth(nbrMonth - 1)
            } else {
                setNbrWeek(nbrWeek + 1)   
                setNbrMonth(nbrMonth + 1)
            }
        }
       setselectedAM([])
        const slot = updatedCheckedState.reduce(
          (selectedAM, currentState, index) => {
            if (currentState === true) {
              
              setselectedAM(selectedAM => [...selectedAM, selectedDates[index]]);
              
            } 
          },
          0
        );
        
      }; 

      const handleOnChangePM = (position) => {
        const updatedCheckedState = checkedPM.map((item, index) =>
          index === position ? !item : item
        );
    

        setcheckedPM(updatedCheckedState);
        if (checkedAM[position] == false ){
            if (checkedPM[position] == false) {
                setNbrWeek(nbrWeek - 1)   
                setNbrMonth(nbrMonth - 1)
            } else {
                setNbrWeek(nbrWeek + 1)   
                setNbrMonth(nbrMonth + 1)
            }
        }
        
       setselectedPM([])
        const slot = updatedCheckedState.reduce(
          (selectedPM, currentState, index) => {
            if (currentState === true) {
           
              setselectedPM(selectedPM => [...selectedPM, selectedDates[index]]);
              
            }
          },
          0
        );
        
      };

console.log('selectedAM', selectedAM)
console.log('selectedPM', selectedPM)
    return (
        <>
            <div className="flex flex-wrap justify-center mt-24">
                <div className="w-full lg:w-10/12 px-6">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
                        <div className="flex-auto p-5 lg:p-10">
                            <div className="w-full text-center">
                                <H3 style={{ color: color }}>Want to work remotly?</H3>
                                <Paragraph color="blueGray">
                                    Complete this form to send a request for online work.
                                </Paragraph>
                            </div>
                            <form onSubmit={(e) => e.preventDefault()}>
                               
                                <div className="flex gap-8 mt-16 mb-12">
                                
                                    <div className='w-150' >
                                        <Typography  className=" text-sm  text-gray-700 pt-1">Manager</Typography>
                                    </div>
                                        <Listbox value={selected} onChange={setSelected}>
                                            {/* <Listbox.Label className="block text-md text-gray-700 mt-4">Manager</Listbox.Label> */}
                                            <div className="mt-1 relative">
                                                <Listbox.Button className="relative w-200 bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                <span className="flex items-center">
                                                    <img src={selected.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                                                    <span className="ml-3 block truncate">{selected.name}</span>
                                                </span>
                                                <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                    <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                </span>
                                                </Listbox.Button>

                                                <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                                <Listbox.Options className="absolute z-10 mt-1 w-200 bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                    {people.map((person) => (
                                                    <Listbox.Option
                                                        key={person.id}
                                                        className={({ active }) =>
                                                        classNames(
                                                            active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                            'cursor-default select-none relative py-2 pl-3 pr-9'
                                                        )
                                                        }
                                                        value={person}
                                                    >
                                                        {({ selected, active }) => (
                                                        <>
                                                            <div className="flex items-center">
                                                            <img src={person.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                                                            <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                                                                {person.name}
                                                            </span>
                                                            </div>

                                                            {selected ? (
                                                            <span
                                                                className={classNames(
                                                                active ? 'text-white' : 'text-indigo-600',
                                                                'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                )}
                                                            >
                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                            </span>
                                                            ) : null}
                                                        </>
                                                        )}
                                                    </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                                </Transition>
                                            </div>
                                        </Listbox>

                                            
                                        
                                        
                                    
                               
                                {/* <div className='w-150' > */}
                                    <Typography  className="text-sm text-gray-700 pt-1 pl-22">Persons to notify</Typography>
                                {/* </div> */}
                                        <Autocomplete
                                                multiple
                                                id="tags-standard"
                                                options={people}
                                                getOptionLabel={(option) => option.name}
                                                defaultValue={[selected]}
                                                renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="standard"
                                                    // label="Multiple values"
                                                    placeholder="Persons to notify"
                                                    style={{
                                                        width: '28em'
                                                    }}
                                                    
                                                />
                                                )}
                                            />
                                
                                
                                        
                                </div>
                                   
                                <div className="flex gap-8 mt-16" >
                                    <div className='w-150' >
                                        <Typography  className=" text-sm  text-gray-700 pt-1">Week</Typography>
                                    </div>
                     
    
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <StaticDatePicker
                                            displayStaticWrapperAs="desktop"
                                            label="Week picker"
                                            value={value}
                                            onChange={(newValue) => {
                                            setValue(newValue);
                                            }}
                                            renderDay={renderWeekPickerDay}
                                            renderInput={(params) => <TextField {...params} />}
                                            inputFormat="'Week of' MMM d"
                                            minDate={startWeek}
                                        />
                                        </LocalizationProvider>
                              
                                
                                    <div className='w-150' >
                                        <Typography  className=" text-sm  text-gray-700 pt-1">Days</Typography>
                                    </div>

                                    <FormGroup>
                                        {
                                            selectedDates && selectedDates.map( (day, index) => {
                                                if (day.date <= today.toISOString().substring(0,10)) {
                                                    return(
                                                        <>
                                                         <div  className="flex gap-8">
                                                            <div className='w-250' >
                                                                {/* <FormControlLabel disabled control={<Checkbox  />} label={day.value} /> */}
                                                                <Typography  className=" text-sm  text-gray-700 pt-1">{day.value}</Typography>
                                                            </div>
                                                            <FormControlLabel disabled control={<Checkbox  />} label='AM' />
                                                            <FormControlLabel disabled control={<Checkbox  />} label='PM' />
                                                        </div>

                                                        </>
                                                    )
                                                } else {
                                                    return(
                                                        <div  className="flex gap-8">
                                                            <div className='w-250' >
                                                                {/* <FormControlLabel control={<Checkbox  />} label={day.value} /> */}
                                                                <Typography  className=" text-sm  text-gray-700 pt-1">{day.value}</Typography>
                                                             </div>
                                                            <FormControlLabel  control={<Checkbox checked={checkedAM[index]}
                                                                                        onChange={() => handleOnChangeAM(index)}
                                                                                 />} label='AM' />
                                                            <FormControlLabel  control={<Checkbox checked={checkedPM[index]}
                                                                                        onChange={() => handleOnChangePM(index)} />} label='PM' />
                                                        </div>
                                                    )
                                                }
                                                
                                            })
                                        }
                                       
                                    </FormGroup>
                                    
                                    
                                    {/* <Textarea color="indigo" placeholder="Reason" />
                                    <Textarea color="indigo" placeholder="Tasks" /> */}
                                </div>
                                <Typography  className=" text-sm  text-gray-700 ">Number of days available for this week : <b>{nbrWeek}</b></Typography>
                                <Typography  className=" text-sm  text-gray-700 pt-1">Number of days available for this month : <b>{nbrMonth}</b></Typography>


                                <div className="flex justify-center mt-10">
                                    <Button 
                                    style={{ backgroundColor : '#083985' }}
                                     ripple="light" 
                                     onClick={() => {handleSend()}}>
                                    <ClipLoader color="white" loading={loading}  size={20} />
                                        Send Request
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
     
             <NotificationContainer/>
        </>
    );
}
