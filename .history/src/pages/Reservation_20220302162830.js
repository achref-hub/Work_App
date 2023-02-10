import DefaultFooter from '../components/Footers/DefaultFooter';


import DefaultNavbar from '../components/Navbars/DefaultNavbar';
// import Calendar from '../components/Schedule/Schedule';

export default function Schedule() {
    return (
        <>
            <div className="absolute w-full z-20 ml-2">
                <DefaultNavbar />
            </div>
            <main>
                <Section />
                {/* <Calendar /> */}
            </main>
            <DefaultFooter />
        </>
    );
}
