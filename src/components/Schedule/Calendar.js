
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda
    , ViewsDirective, ViewDirective, ResourcesDirective, ResourceDirective, TimelineViews } from '@syncfusion/ej2-react-schedule'
import './style.css'
import { DropDownList } from '@syncfusion/ej2-dropdowns';

import { L10n, createElement } from '@syncfusion/ej2-base';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

L10n.load({
    'en-US': {
        'schedule': {
            'saveButton': 'Save',
            'cancelButton': 'Close',
            'deleteButton': 'Remove',
            'newEvent': 'New leave',
            'title' : 'Type'
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
        Color: '#0e44a1',
        PrimaryColor: "#fff050",
        SecondaryColor: "#3361a1",
        img: "https://cdn-icons-png.flaticon.com/512/2855/2855600.png"
    }];
    
    const onPopupOpen = (args) => {
        // if (args.type === 'Editor') {
        //     if (!args.element.querySelector('.custom-field-row')) {
        //         let row = createElement('div', { className: 'custom-field-row' });
        //         let formElement = args.element.querySelector('.e-schedule-form');
        //         formElement.firstChild.insertBefore(row, formElement.firstChild.firstChild);
        //         let container = createElement('div', { className: 'custom-field-container' });
        //         let inputEle = createElement('input', {
        //             className: 'e-field', attrs: { name: 'title' }
        //         });
        //         container.appendChild(inputEle);
        //         row.appendChild(container);
        //         let drowDownList = new DropDownList({
        //             dataSource: [
        //                 { text: 'Sick', value: 'Sick' },
        //                 { text: 'Casual', value: 'Casual' },
        //                 { text: 'Comensatory', value: 'Comensatory' },
        //             ],
        //             fields: { text: 'text', value: 'value' },
        //             value: args.data.EventType,
        //             floatLabelType: 'Always', placeholder: 'Leave Type'
        //         });
        //         drowDownList.appendTo(inputEle);
        //         inputEle.setAttribute('name', 'LeaveType');
        //     }
        // }
        if (args.type === 'Editor') {
            let statusElement = args.element.querySelector('#EventType');
            statusElement.setAttribute('name', 'EventType');
        }
    }

    const editorTemplate = (props) => {
        return (props !== undefined ? <table className="custom-event-editor" style={{ width: '100%', cellpadding: '5' }}><tbody>
      <tr><td className="e-textlabel">Type of leave</td><td colSpan={4}>
      <DropDownListComponent id="EventType" placeholder='Choose Type' data-name="EventType" className="e-field" style={{ width: '100%' }} dataSource={['Sick', 'Casual', 'Compensatory']} value={props.EventType || null}></DropDownListComponent>      </td></tr>
      <tr><td className="e-textlabel">Manager</td><td colSpan={4}>
        <DropDownListComponent id="EventType" placeholder='Choose your manager' data-name="EventType" className="e-field" style={{ width: '100%' }} dataSource={['Rawen', 'Amira', 'Firas']} value={props.EventType || null}></DropDownListComponent>
      </td></tr>
      <tr><td className="e-textlabel">From</td><td colSpan={4}>
        <DateTimePickerComponent format='dd/MM/yy hh:mm a' id="StartTime" data-name="StartTime" value={new Date(props.startTime || props.StartTime)} className="e-field"></DateTimePickerComponent>
      </td></tr>
      <tr><td className="e-textlabel">To</td><td colSpan={4}>
        <DateTimePickerComponent format='dd/MM/yy hh:mm a' id="EndTime" data-name="EndTime" value={new Date(props.endTime || props.EndTime)} className="e-field"></DateTimePickerComponent>
      </td></tr>
      <tr><td className="e-textlabel">Commentary</td><td colSpan={4}>
        <textarea id="Description" className="e-field e-input" name="Description" rows={3} cols={50} style={{ width: '100%', height: '60px !important', resize: 'vertical' }}></textarea>
      </td></tr></tbody></table> : <div></div>);
    }


    return (
        <section className="pb-20 relative block bg-gray-100">
            <div className="container max-w-7xl mx-auto px-4 lg:pt-24">
                <ScheduleComponent 
                    // timezone="Europe/Paris"
                    currentView="WorkWeek" 
                    views={['Day', 'Week', 'Month', 'TimelineDay', 'WorkWeek']}
                    // eventSettings={remoteData}
                    eventSettings={{ dataSource: data, template: eventTemplate }}
                    delayUpdate='true'
                    startHour='08:00' endHour='18:00'
                    timeScale={{ 
                        enable: true, interval: 240, slotCount: 2
                    }}
                    // colorField='Color'
                    popupOpen={onPopupOpen}
                    editorTemplate={editorTemplate}
                    
                                       
                >
                  
                             
                                    <Inject services={[Day, Week, WorkWeek, Month, TimelineViews , Agenda]} />
                </ScheduleComponent>
                
            </div>
        </section>
    );
}
