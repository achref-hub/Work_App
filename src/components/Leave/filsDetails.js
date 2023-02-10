
import { useState } from 'react'

import { NotificationManager} from 'react-notifications';
import './form.css'

import Details from './Details';


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
                <Details />
            </div>
        </section>
    );
}
