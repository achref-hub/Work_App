import React from 'react';
import './form.css'
import Calendar from './Calendar';
import Building from './Building';
import jwt from 'jwt-decode'





export default function Requests() {

    const storage = JSON.parse(localStorage.getItem("user"))
    const token = storage.token
    const user = jwt(token)
    
    // const [data, setData] = useState();
    // const [dataFiltred, setDataFiltred] = useState();
    // const [status, setStatus] = useState('all')
    // const [date, setDate] = useState(null)
    // const [managers, setManagers] = useState([])
    // const [manager, setManager] = useState('all')





    return (
        <section className="pb-20 relative block">
            <div className="container max-w-12xl mx-auto px-4 lg:pt-24">
                <div className="flex flex-wrap justify-center mt-5">
                    <div className="w-full lg:w-12/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
                               <Calendar />
                            <div className="flex flex-wrap justify-center flex-grow-3 gap-4 mt-6 mb-6">
                             <Building />
                            
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
