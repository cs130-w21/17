import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  MonthView,
  DayView,
} from '@devexpress/dx-react-scheduler-material-ui';

import { appointments } from './month-appointments';
import { DemoProps, DemoState } from '../../types/interfaces';

export default class Demo extends React.PureComponent<DemoProps, DemoState> {
  constructor(props: any) {
    super(props);

    this.state = {
      data: appointments,
      currentViewName: 'Week',
    };
    this.currentViewNameChange('Month');
  }

  currentViewNameChange = (currentViewName: any) => {
    this.setState({ currentViewName });
  };
  render() {
    const { data, currentViewName } = this.state;

    return (
      <Paper>
        <Scheduler data={data} height={660}>
          <ViewState
            defaultCurrentDate="2018-07-25"
            currentViewName={currentViewName}
            onCurrentViewNameChange={this.currentViewNameChange}
          />

          <WeekView startDayHour={10} endDayHour={19} />
          <MonthView />
          <DayView />

          <Toolbar />
          <ViewSwitcher />
          <Appointments />
        </Scheduler>
      </Paper>
    );
  }
}

export { Demo };
