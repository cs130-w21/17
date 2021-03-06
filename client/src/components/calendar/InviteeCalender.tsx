import * as React from 'react';
import { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Paper from '@material-ui/core/Paper';
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  DayView,
  MonthView,
  Appointments,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  AppointmentForm,
  AppointmentTooltip,
  TodayButton,
  ConfirmationDialog,
  AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';
import { InviteeCalendarProps, IUser } from '../../types/interfaces';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import { customAppointment } from '../../types/interfaces';
import { mapEventToAppointment, mapAppointmentToEvent } from './CalenderUtils';
const messages = {
  moreInformationLabel: '',
};

const newAppointment = {
  id: '',
  startDate: '',
  endDate: '',
  title: '',
  location: '',
  description: '',
  attendees: [],
  readOnly: false,
};

const empty = () => {
  return <div></div>;
};
const customAppointmentComp = ({ children, style, ...restProps }: any) => (
  <Appointments.Appointment
    {...(restProps.data.visible || restProps.data.isInviteeEvent
      ? restProps
      : {
          ...restProps,
          ...{
            onDoubleClick: empty,
            onClick: empty,
            readOnly: true,
          },
        })}
    style={{
      ...style,
      backgroundColor: restProps.data.isInviteeEvent
        ? '#8A2BE2'
        : restProps.data.visible
        ? '#1E90FF'
        : '#FFC107',
      borderRadius: '8px',
    }}
  >
    {restProps.data.visible || restProps.data.isInviteeEvent
      ? children
      : 'Unavailable'}
  </Appointments.Appointment>
);

const TextEditor = (props: any) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.type === 'multilineTextEditor') {
    return null;
  }
  return <AppointmentForm.TextEditor {...props} />;
};

const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }: any) => {
  const [guest, setGuest] = useState('');
  appointmentData = { ...newAppointment, ...appointmentData };
  const handleClick = () => {
    if (!appointmentData.readOnly) {
      onAddAttendee({ email: guest });
      setGuest('');
    }
  };
  const onLocationChange = (nextValue: any) => {
    onFieldChange({ location: nextValue });
  };
  const onDescriptionChange = (nextValue: any) => {
    onFieldChange({ description: nextValue });
  };

  const onAddAttendee = (nextValue: any) => {
    const temp = appointmentData.attendees
      ? [...appointmentData.attendees, nextValue]
      : [nextValue];
    onFieldChange({
      attendees: temp,
    });
  };
  const readOnly = () => {
    return appointmentData.readOnly;
  };
  return (
    <AppointmentForm.BasicLayout
      appointmentData={appointmentData}
      fullSize={true}
      onFieldChange={onFieldChange}
      {...restProps}
      readOnly={readOnly()}
    >
      <AppointmentForm.TextEditor
        value={appointmentData.location}
        onValueChange={onLocationChange}
        placeholder="Add a location"
        readOnly={readOnly()}
        type={'ordinaryTextEditor'}
      />

      <AppointmentForm.TextEditor
        value={appointmentData.description}
        onValueChange={onDescriptionChange}
        placeholder="Add a description"
        readOnly={readOnly()}
        type={'multilineTextEditor'}
      />

      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <Button onClick={handleClick} variant="outline-secondary">
            +
          </Button>
        </InputGroup.Prepend>
        <FormControl
          readOnly={readOnly()}
          aria-describedby="basic-addon1"
          placeholder="Add Guest"
          aria-label="Add Guest"
          value={guest}
          onChange={(e: any) => {
            setGuest(e.target.value);
          }}
        />
      </InputGroup>
      <AppointmentForm.Label
        text={'Invited Guest'}
        type={'titleLabel'}
      ></AppointmentForm.Label>
      <ListGroup>
        {appointmentData.attendees ? (
          appointmentData.attendees.map((d: any) => (
            <div>
              <ListGroup.Item key={d.email}>{d.email}</ListGroup.Item>
            </div>
          ))
        ) : (
          <div></div>
        )}
      </ListGroup>
    </AppointmentForm.BasicLayout>
  );
};

const timeout = 3000;
const config = {
  headers: { 'Content-Type': 'application/json' },
};
const getData = (
  setData: any,
  isAuthenticated: boolean,
  inviteeProfile: IUser | null,
  accessToken?: string
) => {
  const body = JSON.stringify({ token: accessToken });

  return axios
    .post('/api/calendar/getcalendar', body, config)
    .then((response) => {
      const inviterEvents = response.data.googleresponse.data.items.map(
        (n: any) => {
          return { ...n, ...{ isInviteeEvent: false } };
        }
      );
      setTimeout(() => {
        if (isAuthenticated) {
          const body = JSON.stringify({ token: inviteeProfile?.accessToken });
          axios
            .post('/api/calendar/getcalendar', body, config)
            .then((response2) => {
              setTimeout(() => {
                const inviteeEvents = response2.data.googleresponse.data.items.map(
                  (n: any) => {
                    return { ...n, ...{ isInviteeEvent: true } };
                  }
                );

                setData([...inviterEvents, ...inviteeEvents]);
              }, timeout);
            });
        } else {
          setData(inviterEvents);
        }
      }, timeout);
    });
};

const addEvent = (appointment: customAppointment,
                  accessToken?: string,
                  sendConfirmation?: any) => {
  const body = JSON.stringify({
    token: accessToken,
    event: mapAppointmentToEvent(appointment),
  });
  axios.post('/api/calendar/addEvent', body, config).then((response) => {
    sendConfirmation(appointment.startDate, appointment.endDate, appointment.location);
    setTimeout(() => {}, timeout);
  });
};

const removeEvent = (eventid: string, accessToken?: string) => {
  const body = JSON.stringify({ token: accessToken, id: eventid });

  axios.post('/api/calendar/removeEvent', body, config).then((response) => {
    setTimeout(() => {}, timeout);
  });
};

const editEvent = (
  eventid: string,
  appointment: customAppointment,
  accessToken?: string
) => {
  const body = JSON.stringify({
    token: accessToken,
    id: eventid,
    event: mapAppointmentToEvent(appointment),
  });
  axios.post('/api/calendar/editEvent', body, config).then((response) => {
    setTimeout(() => {}, timeout);
  });
};

/**
 * mapAPpointmentData takes a list of appointments from google and maps them
 * to the data structure used by the schedular.
 * @param appointment
 */

const initialState = {
  data: [],
  currentDate: Date().toLocaleString(),
  currentViewName: 'Week',
};

/**
 * Takes a state input and maps it to an action. The action paramter
 * determines what effect to take on the state variable. Each case is mapped
 * to a function that changes the state variable.
 */

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'updateData':
      return { ...state, data: action.payload };
    case 'removeData':
      return { ...state, data: action.payload };
    case 'addData':
      return { ...state, data: action.payload };
    case 'setData':
      const temp = action.payload.map(mapEventToAppointment);
      const temp2 = temp.map(
        (appointment: customAppointment): customAppointment => ({
          ...appointment,
          ...{
            visible: !appointment.attendees
              ? false
              : appointment.attendees.some(
                  (attendee: any) => attendee.email === action.inviteeEmail
                ),
          },
        })
      );
      return { ...state, data: temp2 };
    case 'setCurrentViewName':
      return { ...state, currentViewName: action.payload };
    case 'setCurrentDate':
      return { ...state, currentDate: action.payload };
    default:
      return state;
  }
};

/**
 * The Invitee Component serves as the secondary calendar component. Displays
 * a calendar UI, which allows invitees to modify the inviter's calendar, but hides
 * information about the inviter's other events.
 * @param props - Contains information about the inviter, such as their profile and accessToken.
 */
export default (props: InviteeCalendarProps) => {
  /**
   * dispatch is mapped to the reducer function. all calls to dispatch are a call
   * to reducer. Dispatch is used to modify the state of the function.
   * initialstate is mapped to the state variable.
   */

  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { data, currentViewName, currentDate } = state;

  const AddAttendee = (appointmentData: customAppointment, nextValue: any) => {
    const temp = appointmentData.attendees
      ? [...appointmentData.attendees, nextValue]
      : [nextValue];
    return temp;
  };

  const commitChanges = (changes: any) => {
    let { added, changed, deleted } = changes;

    if (added) {
      const new_attendees = AddAttendee(added, { email: props.inviteeEmail });

      const startingAddedId =
        data.length > 0 ? data[data.length - 1].id + 1 : 0;
      const temp = [
        ...data,
        {
          id: startingAddedId,
          ...{ ...added, ...{ attendees: new_attendees } },
        },
      ];
      dispatch({ type: 'addData', payload: temp });
      addEvent(temp[temp.length - 1], props.user?.accessToken, props.sendConfirmation);

      const invitation = props.getId();
      const body = JSON.stringify({ id: invitation });
      axios.post('/api/invitations/delete', body, config).then((response) => {
        setTimeout(() => {}, timeout);
      });
      props.setSuccess();
    } else if (changed) {
      const temp = data.map((appointment: any) =>
        changed[appointment.id]
          ? { ...appointment, ...changed[appointment.id] }
          : appointment
      );
      const targetEvent = temp.filter(
        (appointment: any) => appointment.id in changed
      );
      editEvent(
        targetEvent[0].id,
        targetEvent[0],
        props.inviteeProfile?.accessToken
      );
      dispatch({ type: 'updateData', payload: temp });
    } else if (deleted !== undefined) {
    }
  };

  const setCurrentViewName = React.useCallback(
    (nextViewName) =>
      dispatch({
        type: 'setCurrentViewName',
        payload: nextViewName,
      }),
    [dispatch]
  );
  const setData = React.useCallback(
    (nextData) =>
      dispatch({
        type: 'setData',
        payload: nextData,
        inviteeEmail: props.inviteeEmail,
      }),
    [dispatch]
  );
  const setCurrentDate = React.useCallback(
    (nextDate) =>
      dispatch({
        type: 'setCurrentDate',
        payload: nextDate,
      }),
    [dispatch]
  );

  //useEffect() is a hook that calls a function everytime render is called
  //we call the getdata function to update the calendar information after rendering
  React.useEffect(() => {
    getData(
      setData,
      props.isAuthenticated,
      props.inviteeProfile,
      props.user?.accessToken
    );
  }, [setData, currentViewName, currentDate]);

  return (
    <Paper>
      <Scheduler data={data} height={1080}>
        <ViewState
          currentDate={currentDate}
          currentViewName={currentViewName}
          onCurrentViewNameChange={setCurrentViewName}
          onCurrentDateChange={setCurrentDate}
        />
        <EditingState onCommitChanges={commitChanges} />
        <IntegratedEditing />
        <MonthView />
        <DayView startDayHour={7.5} endDayHour={17.5} />
        <WeekView startDayHour={7.5} endDayHour={17.5} />

        <ConfirmationDialog />
        <Appointments appointmentComponent={customAppointmentComp} />

        <AppointmentTooltip showCloseButton showOpenButton />
        <AppointmentForm
          basicLayoutComponent={BasicLayout}
          textEditorComponent={TextEditor}
          messages={messages}
        />

        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <ViewSwitcher />
      </Scheduler>
    </Paper>
  );
};
