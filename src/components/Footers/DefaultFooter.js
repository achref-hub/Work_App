import H5 from '@material-tailwind/react/Heading5';
import LeadText from '@material-tailwind/react/LeadText';
import Icon from '@material-tailwind/react/Icon';

export default function DefaultFooter() {
    return (
        <>
            <footer className="bg-gray-100 pt-8">
                <div className="container max-w-7xl mx-auto px-4">
                    <div className="flex flex-wrap text-center lg:text-left pt-6">
                        <div className="w-full lg:w-6/12 px-4">
                            {/* <H5 style={{color: '#294e87'}}>WorkPoint</H5> */}
                            {/* <div style={{color: '#294e87', fontSize: '25px'}} className="text-lg font-medium py-1">
                            WorkPoint
                            </div> */}
                            <div className="-mt-4">
                                <LeadText color="blueGray">
                                A new conception of work!
                                </LeadText>
                            </div>
                            <div className="flex gap-2 mt-6 md:justify-start md:mb-0 mb-8 justify-center">
                               
                                <a
                                    href="https://workpoint.tn/"
                                    className="grid place-items-center bg-white text-pink-400 shadow-md font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Icon
                                        family="font-awesome"
                                        name="fab fa-dribbble"
                                    />
                                </a>
                                <a
                                    href="https://www.youtube.com/watch?v=hTbHX9363Jo&ab_channel=WorkPoint"
                                    className="grid place-items-center bg-white text-red-600 shadow-md font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Icon
                                        family="font-awesome"
                                        name="fab fa-youtube"
                                    />
                                </a>
                                
                            </div>
                        </div>
                        
                    </div>
                    <hr className="my-6 border-gray-300" />
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                        <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                            <div className="text-sm text-gray-700 font-medium py-1">
                                Copyright © {new Date().getFullYear()} WorkPoint by{' '}
                                <a
                                    href="https://x-point.tech/"
                                    className="text-gray-700 hover:text-gray-900 transition-all"
                                >
                                   X-Point
                                </a>
                                .
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
