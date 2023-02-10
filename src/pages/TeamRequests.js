import DefaultFooter from '../components/Footers/DefaultFooter';

import Section from '../components/TeamRequests/Section';
import DefaultNavbar from '../components/Navbars/DefaultNavbar';


export default function Requests() {
    return (
        <>
            <div className="absolute w-full z-20">
                <DefaultNavbar />
            </div>
            <main>
                <Section />
            </main>
            <DefaultFooter />
        </>
    );
}
