import React from 'react';
import { Filters } from './features/filters/Filters';
import './App.css';
import { BookingGrid } from './features/bookingGrid/BookingGrid';

function App() {
  return (
    <div className="App">
      <Filters />
      <BookingGrid />
    </div>
  );
}

export default App;
