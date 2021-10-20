import React, { useState } from 'react';
import { selectFilteredCounsellors } from './bookingGridSlice';
import { Accordion, AccordionSummary, AccordionDetails, Typography, ButtonGroup, Button, Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { DateTime } from 'luxon';

export interface CounsellorProps {
  counsellor: ReturnType<typeof selectFilteredCounsellors>[0]
}
export function Counsellor({ counsellor }: CounsellorProps) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
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
          {counsellor.availabilities.map((availability) => <Button onClick={() => setSelectedSlot(availability.datetime)}>{DateTime.fromISO(availability.datetime).toFormat('HH:mm')}</Button>)}
        </ButtonGroup>
      </AccordionDetails>
      <Dialog open={selectedSlot !== null} onClose={() => setSelectedSlot(null)}>
        <DialogTitle>Booking successful!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Congratulations you have successfully booked an appointment with: ${counsellor.firstName} ${counsellor.lastName} on ${(new Date(selectedSlot!)).toLocaleDateString()} at ${(new Date(selectedSlot!)).toLocaleTimeString()}`}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Accordion>
  );
}
