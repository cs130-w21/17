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

/**
 * getData makes a backend call to get the latest set of events from the users calendar
 * @param setData
 * @param refreshToken
 */
const getData = (setData: any, refreshToken: any) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  const body = JSON.stringify({ token: refreshToken });

  return axios
    .post('/api/calendar/getcalendar', body, config)
    .then((response) => {
      setTimeout(() => {
        setData(response.data.googleresponse.data.items);
      }, 600);
    });
};

/**
 * makes a call to the backend to add an event to the users primary calendar
 * @param setData
 * @param refreshToken
 */
const addEvent = (event: any, refreshToken: any) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  const body = JSON.stringify({ token: refreshToken, appointment: event });

  axios.post('/api/calendar/addEvent', body, config).then((response) => {
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
  summary: appointment.title,
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
      addEvent(temp[temp.length - 1], props.user?.refreshToken);
    } else if (changed) {
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
    getData(setData, props.user?.refreshToken);
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
        <MonthView />

        <DayView startDayHour={7.5} endDayHour={17.5} />
        <WeekView startDayHour={7.5} endDayHour={17.5} />
        <ConfirmationDialog />
        <Appointments />
        <AppointmentTooltip showCloseButton showOpenButton />
        <AppointmentForm />
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <ViewSwitcher />
        <AppointmentTooltip showOpenButton showCloseButton />
      </Scheduler>
    </Paper>
  );
};
