import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectCounsellorsWithCurrentAvailabilities } from './bookingGridSlice';
import styles from './BookingGrid.module.css';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { Accordion, AccordionSummary, AccordionDetails, TextField, Typography, ButtonGroup, Button } from '@mui/material';
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
          {counsellor.availabilities.map((availability) => <Button >{DateTime.fromISO(availability.datetime).toFormat('hh:mm')}</Button>)}
        </ButtonGroup>
      </AccordionDetails>
    </Accordion>
  );
}
