import React from 'react';
import Button from '@material-tailwind/react/Button';
import H3 from '@material-tailwind/react/Heading3';
import Paragraph from '@material-tailwind/react/Paragraph';
import Img from 'assets/img/home.jpg'




const Wfhpage = () => {
    const color = '#294e87'

    return (
        <div>
            <section className="relative block ">
                    <div className='flex flex-container'>
                        <img src={Img} className='img-page bg-gray-100' />
                        <div className="flex flex-wrap justify-center mt-24">
                            <div className="w-full lg:w-12/12 px-4">
                                <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
                                    <div className="flex-auto p-5 lg:p-10">
                                        <div className="w-full text-center">
                                            <H3 style={{ color: color }}>Flex Working</H3>
                                            <Paragraph color="blueGray">
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                            </Paragraph>
                                        </div>
                                        <div className="flex justify-center mt-20">
                                                <Button 
                                                style={{ backgroundColor : '#083985' }}
                                                ripple="light" 
                                                onClick={() => { window.location.href = '/onlinework' }}
                                                >
                                                    WFH Request
                                                </Button>
                                                <Button
                                                    color="indigo"
                                                    buttonType="outline"
                                                    size="regular"
                                                    rounded={false}
                                                    block={false}
                                                    iconOnly={false}
                                                    ripple="dark"
                                                    className='ml-15'
                                                    onClick={() => { window.location.href = '/requests' }}
                                                >
                                                    My Requests
                                                </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                
                
            </section>

            
        </div>
    );
}

export default Wfhpage;
