import Navbar from 'components/Navbars/Navbar';
import DefaultFooter from 'components/Footers/DefaultFooter';
import Header from 'components/profile/Header';
import Content from 'components/profile/Content';

export default function Profile() {
    return (
        <>
            <div className="absolute w-full z-20">
                <Navbar />
            </div>
            <main>
                <Header />
                <Content />
            </main>
            <DefaultFooter />
        </>
    );
}
