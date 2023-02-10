import DefaultFooter from '../components/Footers/DefaultFooter';
import Desck from 'components/Reservation/Descks/Desck';
import DefaultNavbar from '../components/Navbars/DefaultNavbar';

export default function Reservation() {
    import { useParams } from 'react-router';
    return (
        <>
            <div className="absolute w-full z-20 ml-2">
                <DefaultNavbar />
            </div>
            <main>
                <Desck />
            </main>
            <DefaultFooter />
        </>
    );
}
