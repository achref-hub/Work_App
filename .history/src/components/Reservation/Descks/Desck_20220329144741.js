import React from 'react';
import '../form.css'
import Calendar from '../Calendar';
import Accessfloor from './Acessfloor';
import DesksFloor1 from "./Floor1/DesksFloor1";


export default function Desck({floorId}) {


    return (
        <section className="pb-20 relative block">
            <div className="container max-w-12xl mx-auto px-4 lg:pt-24">
                <div className="flex flex-wrap justify-center mt-5">
                    <div className="w-full lg:w-12/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
                               <Calendar />
                               <DesksFloor1 />
                            <div className="flex flex-wrap justify-center flex-grow-3 gap-4 mt-6 mb-6">
                                <Accessfloor floorId={floorId}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
