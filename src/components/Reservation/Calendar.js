import React,{useState} from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker
} from '@material-ui/pickers'

export default function Calendar(props){

    const [selectedDate ,setSelectedDate] = useState(
        new Date ()
    );

const handleDateChange = (date) => {
    setSelectedDate (date)
}
console.log(selectedDate,"aaaaaaaaa");

return(

    <div >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify='space-around'>
                <KeyboardDatePicker
                //disableToolbar
                variant ='dialog'
                format ='MM/dd/yyy'
                margin ='normal'
                id ='date-picker'
                label ='Date reservation'
                value ={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps ={{
                    'aria-label': 'change date'
                }}
                />
                

            </Grid>

        </MuiPickersUtilsProvider>

    </div>
 
);
 }