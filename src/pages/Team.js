import DefaultFooter from '../components/Footers/DefaultFooter';

import Section from '../components/Team/Section';
import DefaultNavbar from '../components/Navbars/DefaultNavbar';

export default function Team(props) {
    return (
        <>
            <div className="absolute w-full z-20">
                <DefaultNavbar />
            </div>
            <main>
                <Section users={props.users} />
            </main>
            <DefaultFooter />
        </>
    );
}
