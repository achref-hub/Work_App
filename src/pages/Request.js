import DefaultFooter from '../components/Footers/DefaultFooter';

import RequestBody from '../components/Team/Request';
import DefaultNavbar from '../components/Navbars/DefaultNavbar';


export default function Request() {
    return (
        <>
            <div className="absolute w-full z-20">
                <DefaultNavbar />
            </div>
            <main>
                <RequestBody />
            </main>
            <DefaultFooter />
        </>
    );
}
