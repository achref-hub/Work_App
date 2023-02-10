import DefaultFooter from '../components/Footers/DefaultFooter';

import Request from '../components/Requests/Request';
import DefaultNavbar from '../components/Navbars/DefaultNavbar';


export default function DetailsRequest() {
    return (
        <>
            <div className="absolute w-full z-20">
                <DefaultNavbar />
            </div>
            <main>
                <Request />
            </main>
            <DefaultFooter />
        </>
    );
}
