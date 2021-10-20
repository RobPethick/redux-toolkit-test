
import { Tab, Tabs } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectSelectedAppointmentTypes, setAppointmentTypeFilter } from '../filters/filterSlice';
import { selectFilteredCounsellors } from './bookingGridSlice';
import { Counsellor } from './Counsellor';
const TabMap = {
  one_off: 0,
  consultation: 1
}
export function BookingGrid() {
  const availableCounsellors = useAppSelector(selectFilteredCounsellors);
  const appointmentType = useAppSelector(selectSelectedAppointmentTypes);
  const dispatch = useAppDispatch();
  const selectedAppointmentType = 'one_off';
  return (
    <div>
      <Tabs value={TabMap[appointmentType]} aria-label="nav tabs example">
        <Tab
          label="One off"
          onClick={() => dispatch(setAppointmentTypeFilter('one_off'))}
        />
        <Tab
          label="Consultation"
          onClick={() => dispatch(setAppointmentTypeFilter('consultation'))}
        />
      </Tabs>
      {
        availableCounsellors.map((counsellor) => <Counsellor counsellor={counsellor} />)
      }
    </div>
  );
}
