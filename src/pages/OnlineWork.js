import DefaultFooter from '../components/Footers/DefaultFooter';

import Section from '../components/OnlineWork/Section';
import DefaultNavbar from '../components/Navbars/DefaultNavbar';


export default function OnlineWork() {
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
