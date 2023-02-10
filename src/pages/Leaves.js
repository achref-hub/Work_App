import DefaultFooter from '../components/Footers/DefaultFooter';
import BodyLeaves from '../components/Leave/BodyLeave';
import DefaultNavbar from '../components/Navbars/DefaultNavbar';


export default function Request() {
    return (
        <>
            <div className="absolute w-full z-20">
                <DefaultNavbar />
            </div>
            <main>
                <BodyLeaves/>
            </main>
            <DefaultFooter />
        </>
    );
}