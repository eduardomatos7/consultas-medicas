import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/Home';
import ScheduleAppointment from './pages/ScheduleAppointment';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/agendar" element={<ScheduleAppointment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
