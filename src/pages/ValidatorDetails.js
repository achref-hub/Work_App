import DefaultFooter from '../components/Footers/DefaultFooter';
import DetailsValidator from '../components/Leave/DetailsValidator'
import DefaultNavbar from '../components/Navbars/DefaultNavbar';


export default function ValidatorDetails() {
    return (
        <>
            <div className="absolute w-full z-20">
                <DefaultNavbar />
            </div>
            <main>
                <DetailsValidator/>
            </main>
            <DefaultFooter />
        </>
    );
}
