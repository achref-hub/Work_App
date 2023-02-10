import React from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker
} from '@material-ui/pickers'

export default function Calendar(){
    const [selectedDate ,setSelectedDate] = React.useState(
        new Date ("2020-09-11")
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
                label ='Date reservation'
                value ={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps ={{
                    'aria-label': 'change date'
                }}
                />
                 <ToggleButtonGroup
                                                                    color="primary"
                                                                   
                                                                    aria-label="text formatting"
                                                                    className='mt-1'
                                                                    
                                                                    >
                                                                    <ToggleButton 
                                                                        
                                                                        style={{ outline: "none" }}
                                                                        // disabled={ (nbrWeek === weekBalance || nbrMonth === monthBalance || nbrMonthTwo === monthBalance  ) &&  (checkedAM[index] === false || checkedPM[index] === false ) ? true : false }
                                                                    >
                                                                        AM
                                                                    </ToggleButton>
                                                                    <ToggleButton 
                                                                        
                                                                        style={{ outline: "none" }}
                                                                        // disabled={ (nbrWeek === weekBalance || nbrMonth === monthBalance || nbrMonthTwo === monthBalance  ) &&  (checkedAM[index] === false || checkedPM[index] === false ) ? true : false }
                                                                    >
                                                                        PM
                                                                    </ToggleButton>
                                                                    
                                                                    </ToggleButtonGroup>

            </Grid>

        </MuiPickersUtilsProvider>

    </div>
 
);
 }