import { BrowserRouter, Routes, Route } from 'react-router';

import Layout from './components/Layout';
import Appointments from './pages/AppointmentsListing';
import Home from './pages/Home';
import ScheduleAppointment from './pages/ScheduleAppointment';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/agendar" element={<ScheduleAppointment />} />
          <Route path="/consultas" element={<Appointments />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
