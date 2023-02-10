
import Form from './Form';
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, EventSettingsModel
    , ViewsDirective, ViewDirective, ResourcesDirective, ResourceDirective, GroupModel, TimelineViews, EventTemplate } from '@syncfusion/ej2-react-schedule'
import './style.css'
import { L10n } from '@syncfusion/ej2-base';


L10n.load({
    'en-US': {
        'schedule': {
            'saveButton': 'Add',
            'cancelButton': 'Close',
            'deleteButton': 'Remove',
            'newEvent': 'Add Event',
        },
    }
});

export default function Section() {


    function eventTemplate (props){
        return(
        <div className="template-wrap" 
        // style={{background: props.SecondaryColor}} 
        >
            <div className="subject" 
            // style={{background: props.PrimaryColor}}
            >{props.Subject}</div>
            <div className="image" ><img src={props.img} /> </div>
            {/* <div className="footer" style={{background: props.PrimaryColor}} ></div> */}
        </div>
        )
    }

     const data = [{
        Id: 1,
        Subject: 'Sick leave',
        StartTime: new Date(2021, 10, 5, 8 , 0),
        EndTime: new Date(2021, 10, 5, 18, 0),
        Color: '#df52ff',
        PrimaryColor: "#fff050",
        SecondaryColor: "#3361a1",
        img: "https://cdn.iconscout.com/icon/free/png-256/sick-1659472-1409994.png"
    }, {
        Id: 2,
        Subject: 'Casual leave',
        StartTime: new Date(2021, 10, 4, 8, 0),
        EndTime: new Date(2021, 10, 4, 18, 0),
        Color: '#df5286',
        PrimaryColor: "#fff050",
        SecondaryColor: "#3361a1",
        img: "https://cdn-icons-png.flaticon.com/512/2855/2855600.png"
    }];



    return (
        <section className="pb-20 relative block bg-gray-100">
            <div className="container max-w-7xl mx-auto px-4 lg:pt-24">
                <ScheduleComponent 
                    // timezone="Europe/Paris"
                    currentView="WorkWeek" 
                    views={['Day', 'Week', 'Month', 'TimelineDay', 'WorkWeek']}
                    // eventSettings={remoteData}
                    eventSettings={{ dataSource: data, template: eventTemplate }}
                    // group={groupData}
                    // delayUpdate='true'
                    // rowAutoHeight={true}
                    startHour='08:00' endHour='19:00'
                    // timeScale={{ 
                    //     enable: true, interval: 600, slotCount: 2
                    // }}
                    colorField='Color'
                                       
                >
                  
                                    {/* <ResourcesDirective>
                                        <ResourceDirective field='ZoneId' title='Zone Name' name='Desks'
                                            textField='name' idField='_id' colorField='Color' dataSource={data}>

                                        </ResourceDirective>
                                        <ResourceDirective field='DeskId' name='Zones' title='Desk Name' textField='name' idField='_id' 
                                        colorField='Color' 
                                                        groupIDField='zone' allowMultiple={true}
                                                        dataSource={desksData}
                                        >
                                        </ResourceDirective>
                                    </ResourcesDirective> */}
                                     <ViewsDirective>
                                        <ViewDirective option='Day'/>
                                        <ViewDirective option='Week'/>
                                        <ViewDirective option='WorkWeek'/>
                                        <ViewDirective option='Month' 
                                        // eventTemplate={eventTemplate()} 
                                        />
                                        <ViewDirective option='Agenda'/>
                                    </ViewsDirective>
                                    <Inject services={[Day, Week, WorkWeek, Month, TimelineViews , Agenda]} />
                </ScheduleComponent>
                
            </div>
        </section>
    );
}
