import { Fragment, useState ,useEffect} from 'react'
import H3 from '@material-tailwind/react/Heading3';
import Paragraph from '@material-tailwind/react/Paragraph';
import Input from '@material-tailwind/react/Input';
import WorkOffIcon from '@mui/icons-material/WorkOff';
import { fetchValidators, fetchUser, fetchALLUsers, fetchUserBalances, fetchBalances } from '../../actions/UserAction';
import jwt from 'jwt-decode';
import {FormLabel} from '@mui/material';
import axios from 'axios';
import AsyncSelect from "react-select/async";
import './form.css'
import Select from 'react-select'
import moment from 'moment';
import ms from 'ms';
  import Button from '@material-tailwind/react/Button';
import ClipLoader from "react-spinners/ClipLoader";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import './form.css'
import Employer from './Employer';
import { useForm } from "react-hook-form";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }


  const color = '#083985'
  


  export default function FormLeave() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => alert(JSON.stringify(data));

    const storage = JSON.parse(localStorage.getItem("user"))
    const token = storage.token

    const user = jwt(token)
    const [leave,SetLeave] =useState([]);
    const [leaves,setSelectedLeave] =useState('');
    const [managers, setManagers] = useState([]);
    const [selected, setSelected] = useState({})
    const [personNotif, setPersonNotif] = useState([]);
    const [ monthBalance, setMonthBalance ] = useState()
    const [Slot,SetSlot]= useState([]);
    const [type, setType] = useState('casual')
    const [loading, setLoading] = useState(false);
    const [date, setDate]=useState('');
    const [dateTo, setDateTo]=useState('');
    const [users, setUsers] = useState([]);

    ///// type Leaves
    const urll ="http://localhost:5000/api/Setting/getSettingsType"
    useEffect(()=>{
      axios
      .get(urll)
      .then(res=>{
        SetLeave(res.data.data)
      })
      .catch(err=>{
        console.log(err);
      })
  
    },[])
  
    const fetchLeave = (inputValue, callback) => {
      setTimeout(() => {
        const tempArray = [];
        leave && leave.map( (leaves) => {
            tempArray.push({
              label: leaves.name,
              value: leaves._id,
            });
            return 0
        })
        const result = tempArray.filter((x) =>
            x.label?.toLowerCase().includes(inputValue?.toLowerCase()) );
        callback(result);
      }, 1000);
  };
  const onLeaveChange = (leave) => {
          if (leave) {
            setSelectedLeave(leave)
          }}


    useEffect( async () => {

        const result = await fetchValidators(token)
        setManagers(result.filter(item => item._id !== user._id))
        const users = await fetchALLUsers(token)
        setUsers(users)
        user.manager && setSelected(result.find( item => item._id  === user.manager) )
        const data = await fetchBalances(token)

      }, []);
      const [minDate,SetminDate] =useState(null) ;
      const [maxDate, SetmaxDate]= useState(null);
      useEffect(()=>{
        const minsec = ms('1d')
        const min_date = new Date() ;
        const max_date = new Date(+ new Date(date) + minsec);
        if (leaves.label ===  "Maternity Leave" || leaves.label ==="Paternity Leave" || leaves.label=== "Paid Leave" || leaves.label=== "Leave without pay") {
          SetminDate(moment(min_date).format('YYYY-MM-DD'));
          SetmaxDate(moment(max_date).format('YYYY-MM-DD'));


        }else{
          SetminDate(null);
          SetmaxDate(moment(max_date).format('YYYY-MM-DD'));
        }
      })

      const url ="http://localhost:5000/api/Operation/addNewLeave";
      const url1 ="http://localhost:5000/api/Setting/getSettingsSlot";
    
      useEffect(()=>{
        axios
        .get(url1)
        .then(res=>{
          SetSlot(res.data.data);
        })
        .catch(err=>{
          console.log(err);
        })
    
      },[])
      const[result,ddValue]= useState(Slot.label);
      const ddHandler = e =>{
          ddValue(e.label);
      }
      function DaysBetween(FirstDate,SecondDate){
        return (SecondDate - FirstDate ) /(1000 * 3600 * 24 );
      }
      const nbOfdays = DaysBetween (new Date (date),new Date (dateTo));

    
    // const handleChange = (event, newType) => {
    //     setType(newType);
    //   };

    const handleSend =  (e) => {
      e.preventDefault();
     
      if ( personNotif.length > 0) {
        var usersNotif = Array.from(personNotif, ({_id}) => _id)
    } else {
      NotificationManager.error('Please Check your data','Error')
      return;
        // var usersNotif = []
    }


      if(date.trim().length === 0 || dateTo.trim().length === 0){
        NotificationManager.error('Please Check your date','Error')
        return;
      }
  
    

      setDate('')
      setDateTo('')
      setPersonNotif('')

    
      setLoading(true);
       axios
        .post(url, 
            {
                "OperationType":leaves.label,
                "date_debut":date,
                "date_fin":dateTo,
                "slot":result,
                "UserNotif": usersNotif,
                "type" : 'Leaves',
          }, {
            headers : {
              "x-access-token" : storage.token,
            }
          }
          )
          .then(res=>{
            console.log(res);
          })
         
      //     if (result.status === 200) {
      //       NotificationManager.success('Request sended successfully', 'Success')
      //       setTimeout(() => {
      //           window.location.href = '/leaves'
      //       }, 2000);
      //   } else {
      //       NotificationManager.error(result.message)
      //   }
      //   setloading(false)
      // }
      

        setTimeout(function(){
          setLoading(false);
            NotificationManager.success('Leave added successfully', 'Success')
            window.location.href = '/leaves';
          }, 1000);
        
        }
      
        


    return (
        <>
           <div className="flex flex-wrap justify-center mt-18">
                <div className="w-full lg:w-8/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
                        <div className="flex-auto p-5 lg:p-10">
                            <div className="w-full text-center">
                               <div className='header-form'>
                                    <H3 style={{ color: color }}>Leave</H3> 
                                    <WorkOffIcon style={{ color: color }} className='ml-4 mt-4' />
                               </div>
                               
                                <Paragraph color="blueGray">
                                    Complete this form to added a leave.
                                </Paragraph>
                            </div>
                            <form onSubmit={handleSend}>
                                <div className="flex gap-8 mt-16 mb-12">
                                         <FormLabel>Leave Type</FormLabel>
                                     <AsyncSelect   className="leave"
                                                       value={leaves}
                                                         loadOptions={fetchLeave}
                                                             placeholder="Leave Type"
                                                                  onChange={(e) => {
                                                                   onLeaveChange(e);
                                                                      }}
                                                              defaultOptions={true}
                                                       />
                                    </div>
                                    <div className="flex gap-8 mt-16 mb-12">
                                    <FormLabel  >Persons to notify</FormLabel>
                                       <Employer  users={users} setPersonNotif={setPersonNotif}  />
                                    </div>
                                <div className="flex gap-8 mt-16 mb-12">
                                
                                        <Input
                                            value={date}
                                            type="date"
                                            min ={minDate}
                                            max ={minDate}  
                                            placeholder="From"
                                            color="indigo"
                                            onChange={e=>setDate(e.target.value)}
                                        />
                                        <Input
                                            value={dateTo}
                                            type="date"
                                            min ={maxDate}
                                            placeholder="To"
                                            color="indigo"
                                            onChange={e=>setDateTo(e.target.value)}
                                        />                                        
                                    
                                </div>
                                <Paragraph style={{ color: color }}>{nbOfdays} Day's of {leaves.label} </Paragraph> 
                                <div>
                                                    <div className="mt-2">
                                                        <div>
                                                            <Select  onChange={ddHandler} options={Slot}  />
                                                              
                                                        </div>
                                                        <div>
                                                        {/* {...register("slotEx", { required: 'slot is required' })} */}
                                                        {/* {errors.slotEx && <span className='text-sm text-red-500'>{errors.slotEx.message }</span>} */}
                                                        </div>
                                                        
                                                    </div>
                                                    </div>

                                <div className="flex justify-center mt-20">
                                  {!loading &&(
                                     <Button type="submit"  color="indigo" ripple="light" onClick={handleSend}>
                                     Add Leave
                                 </Button>
                                  )}

                                  {loading &&(
                                     <Button type="submit"  color="indigo" ripple="light" disabled>
                                      <i className="fas fa-spinner fa-spin"></i>{" "}
                                     Added...
                                 </Button>
                                  )}
                                   
                                </div>
                            </form>
                            <div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
     
             <NotificationContainer/>
        </>
    );
}
