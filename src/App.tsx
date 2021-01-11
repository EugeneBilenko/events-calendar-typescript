import React from 'react';

import GlobalStyle from './global-styles';
import EventsModal from './components/EventsModal';
import Calendar from './components/Calendar';

import 'bootstrap/dist/css/bootstrap.css';
function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <EventsModal />
      <Calendar />
    </div>
  );
}

export default App;
