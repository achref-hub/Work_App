import DefaultFooter from '../components/Footers/DefaultFooter';
import Desck from 'components/Reservation/Descks/Desck';
import DefaultNavbar from '../components/Navbars/DefaultNavbar';
import { useParams } from 'react-router';
export default function Reservation() {
    const { id } = useParams();
    console.log('====================================');
    console.log();
    console.log('====================================');
    return (
        <>
            <div className="absolute w-full z-20 ml-2">
                <DefaultNavbar />
            </div>
            <main>
                <Desck floorId={id} />
            </main>
            <DefaultFooter />
        </>
    );
}