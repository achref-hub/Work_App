import React from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker
} from '@material-ui/pickers'

export default function Calendar(){
    const [selectedDate ,setSelectedDate] = React.useState(
        new Date ("2020-09-11T12:00:00")
    )

const handleDateChange = (date) => {
    setSelectedDate (date)
}

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
                label ='Date picker'
                value ={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps ={{
                    'aria-label': 'change date'
                }}
                />
                <KeyboardTimePicker 
                margin='normal'
                id='time-picker'
                label='Time Picker'
                value={selectedDate}
                onChange={hand}
                />

            </Grid>

        </MuiPickersUtilsProvider>

    </div>
 
);
 }