import * as React from 'react';
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
} from '@devexpress/dx-react-scheduler-material-ui';
import { SyncedCalendarProps } from '../../types/interfaces';
import axios from 'axios';

const config = {
  headers: { 'Content-Type': 'application/json' },
};
const getData = (setData: any, accessToken: any) => {
  const body = JSON.stringify({ token: accessToken });

  return axios
    .post('/api/calendar/getcalendar', body, config)
    .then((response) => {
      setTimeout(() => {
        setData(response.data.googleresponse.data.items);
      }, 600);
    });
};

const addEvent = (event: any, accessToken: any) => {
  const body = JSON.stringify({ token: accessToken, appointment: event });

  axios.post('/api/calendar/addEvent', body, config).then((response) => {
    setTimeout(() => {}, 600);
  });
};

const removeEvent = (eventid: any, accessToken: any) => {
  const body = JSON.stringify({ token: accessToken, id: eventid });

  axios.post('/api/calendar/removeEvent', body, config).then((response) => {
    setTimeout(() => {}, 600);
  });
};

const editEvent = (eventid: any, event: any, accessToken: any) => {
  const body = JSON.stringify({
    token: accessToken,
    id: eventid,
    appointment: event,
  });
  axios.post('/api/calendar/editEvent', body, config).then((response) => {
    setTimeout(() => {}, 600);
  });
};

const usaTime = (date: any) =>
  new Date(date).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });

/**
 * mapAPpointmentData takes a list of appointments from google and maps them
 * to the data structure used by the schedular.
 * @param appointment
 */
const mapAppointmentData = (appointment: any) => ({
  id: appointment.id,
  startDate: usaTime(appointment.start.dateTime),
  endDate: usaTime(appointment.end.dateTime),
  title: appointment.summary,
});

const initialState = {
  data: [],
  currentDate: '2021-01-23',
  currentViewName: 'Day',
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
      return { ...state, data: action.payload.map(mapAppointmentData) };
    case 'setCurrentViewName':
      return { ...state, currentViewName: action.payload };
    case 'setCurrentDate':
      return { ...state, currentDate: action.payload };
    default:
      return state;
  }
};

export default (props: SyncedCalendarProps) => {
  /**
   * dispatch is mapped to the reducer function. all calls to dispatch are a call
   * to reducer. Dispatch is used to modify the state of the function.
   * initialstate is mapped to the state variable.
   */

  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { data, currentViewName, currentDate } = state;

  const commitChanges = (changes: any) => {
    let { added, changed, deleted } = changes;
    if (added) {
      const startingAddedId =
        data.length > 0 ? data[data.length - 1].id + 1 : 0;
      const temp = [...data, { id: startingAddedId, ...added }];
      dispatch({ type: 'addData', payload: temp });
      addEvent(temp[temp.length - 1], props.user?.accessToken);
    } else if (changed) {
      const temp = data.map((appointment: any) =>
        changed[appointment.id]
          ? { ...appointment, ...changed[appointment.id] }
          : appointment
      );
      const targetEvent = temp.filter(
        (appointment: any) => appointment.id in changed
      );
      editEvent(targetEvent[0].id, targetEvent[0], props.user?.accessToken);
      dispatch({ type: 'updateData', payload: temp });
    } else if (deleted !== undefined) {
      const targetEvent = data.filter(
        (appointment: any) => appointment.id === deleted
      );

      removeEvent(targetEvent[0].id, props.user?.accessToken);
      const temp = data.filter(
        (appointment: any) => appointment.id !== deleted
      );
      dispatch({ type: 'removeData', payload: temp });
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
    getData(setData, props.user?.accessToken);
  }, [setData, currentViewName, currentDate]);

  return (
    <Paper>
      <Scheduler data={data} height={720}>
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
        <Appointments />
        <AppointmentTooltip showCloseButton showOpenButton showDeleteButton />
        <AppointmentForm />
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <ViewSwitcher />
      </Scheduler>
    </Paper>
  );
};
