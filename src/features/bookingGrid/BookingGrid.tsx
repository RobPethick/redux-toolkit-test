
import { useAppSelector } from '../../app/hooks';
import { selectCounsellorsWithCurrentAvailabilities } from './bookingGridSlice';
import { Counsellor } from './Counsellor';

export function BookingGrid() {
  const availableCounsellors = useAppSelector(selectCounsellorsWithCurrentAvailabilities);
  return (
    <div>
      {
        availableCounsellors.map((counsellor) => <Counsellor counsellor={counsellor}/>)
      }
    </div>
  );
}
