import DefaultFooter from '../components/Footers/DefaultFooter';
import DefaultNavbar from '../components/Navbars/DefaultNavbar';
import CardValidator from '../components/Leave/CardValidator'
export default function Validator() {
    return (
        <>
            <div className="absolute w-full z-20">
                <DefaultNavbar />
            </div>
            <main>
            <section className="pb-20 relative block">
            <div className="container max-w-7xl mx-auto px-4 lg:pt-24">
               <CardValidator/>
            </div>
             </section>
            </main>
            <DefaultFooter />
        </>
    );
}
