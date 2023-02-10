// import LoginFooter from 'components/Footers/LoginFooter';
import Header from 'components/Home/Header';
import WorkingSection from 'components/Home/WorkingSection';

import Navbar from 'components/Navbars/Navbar';

export default function Home() {
    return (
        <>
            <div className="absolute w-full z-20 mt-1">
                {/* <DefaultNavbar /> */}
                <Navbar />
            </div>
            <main>
                <Header />
                <WorkingSection />
                {/* <TeamSection />
                <ContactSection /> */}
            </main>
            {/* <LoginFooter /> */}
        </>
    );
}
