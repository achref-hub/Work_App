
import Schedule from './Schedule';
import Schedule1 from './Schedule2';
import Icon from "@material-tailwind/react/Icon"
import FilterPage from './FilterPage'
import './style.css'
import { users } from './tasks';

export default function Section(props) {
    return (
        // <section className="pb-20 relative block bg-gray-100">
             <div  className="pt-100">

                
                <FilterPage />
                {/* <Schedule1 /> */}
                {/* <Schedule users={props.users} /> */}
            </div>
        // </section>
    );
}
