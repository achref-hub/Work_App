import DefaultFooter from '../components/Footers/DefaultFooter';
import FormLeave from '../components/Leave/FormLeave';
import DefaultNavbar from '../components/Navbars/DefaultNavbar';


export default function Leave() {
    return (
        <>
            <div className="absolute w-full z-20">
                <DefaultNavbar />
            </div>
            <main>
            <section className="pb-20 relative block">
            <div className="container max-w-7xl mx-auto px-4 lg:pt-24">
                <FormLeave />
            </div>
             </section>
            </main>
            <DefaultFooter />
        </>
    );
}
