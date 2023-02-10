import DefaultFooter from '../components/Footers/DefaultFooter';
import Details from '../components/Leave/filsDetails'
import DefaultNavbar from '../components/Navbars/DefaultNavbar';


export default function LeaveDetails() {
    return (
        <>
            <div className="absolute w-full z-20">
                <DefaultNavbar />
            </div>
            <main>
                <Details/>
            </main>
            <DefaultFooter />
        </>
    );
}
