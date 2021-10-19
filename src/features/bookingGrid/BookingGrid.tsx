
import { useAppSelector } from '../../app/hooks';
import { selectFilteredCounsellors } from './bookingGridSlice';
import { Counsellor } from './Counsellor';

export function BookingGrid() {
  const availableCounsellors = useAppSelector(selectFilteredCounsellors);
  return (
    <div>
      {
        availableCounsellors.map((counsellor) => <Counsellor counsellor={counsellor}/>)
      }
    </div>
  );
}
