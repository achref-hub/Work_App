import React from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@ate-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboarddatePicker
} from '@material-ui/pickers'

export default function Calendar(){
    const [selectedDate ,setSelectedDate] = React.useState(
        new Date ("2020-09-11T12:00:00")
    )
}
const handleDateChange = (date) => {
    setSelectedDate (date)
}

return(
    <>
    <div className= "Calendar">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify='space-around'>
                <KeyboarddatePicker
                disableToolbar
                variant ='inline'
                format ='MM/dd/yyy'
                margin ='normal'
                id ='date-picker'
                label ='Date picker'
                value ={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps{{}}
                />

            </Grid>

        </MuiPickersUtilsProvider>

    </div>
    </>
)