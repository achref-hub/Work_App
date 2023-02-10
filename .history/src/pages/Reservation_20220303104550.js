import DefaultFooter from '../components/Footers/DefaultFooter';

import Section from 'components/Reservation/Reservation';
import DefaultNavbar from '../components/Navbars/DefaultNavbar';

export default function Schedule() {
    return (
        <>
            <div className="absolute w-full z-20 ml-2">
                <DefaultNavbar />
            </div>
            <main>
               <Section/>
            </main>
            <DefaultFooter />
        </>
    );
}
