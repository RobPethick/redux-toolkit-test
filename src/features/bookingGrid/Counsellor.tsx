
import { selectCounsellorsWithCurrentAvailabilities } from './bookingGridSlice';
import { Accordion, AccordionSummary, AccordionDetails, Typography, ButtonGroup, Button } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { DateTime } from 'luxon';

export interface CounsellorProps {
  counsellor: ReturnType<typeof selectCounsellorsWithCurrentAvailabilities>[0]
}
export function Counsellor({ counsellor }: CounsellorProps) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
      >
        <Typography>{`${counsellor.firstName} ${counsellor.lastName}`}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Appointment mediums: {counsellor.appointment_mediums.join(', ')}
        </Typography>
        <Typography>
          Appointment types: {counsellor.appointment_types.join(', ')}
        </Typography>
        <Typography>
          Specialisms: {counsellor.specialisms.join(', ')}
        </Typography>
        <ButtonGroup>
          {counsellor.availabilities.map((availability) => <Button >{DateTime.fromISO(availability.datetime).toFormat('HH:mm')}</Button>)}
        </ButtonGroup>
      </AccordionDetails>
    </Accordion>
  );
}
