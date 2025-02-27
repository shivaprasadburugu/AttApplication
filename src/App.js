import logo from './logo.svg';
import './App.css';
import Login from './Components/LoginForm/Login';
import {HashRouter as Router,Routes,Route,Navigate} from 'react-router-dom'
import DashBoard from './Components/DashBoard/DashBoard';
import AvailabilityCheck from './Components/Availability/Availability';
import AddEvent from './Components/DashBoard/AddEvent';
import ProtectedRoute from './Components/ProtectedRoute';
import { AuthProvider } from './Components/AuthProvider';

//import { useNavigate } from 'react-router-dom';

function App() {
  
  return (
    <AuthProvider>
    <Router>
   
      <Routes>
     
        <Route path = "/"  element = {<Login/>} />
        <Route path="/dashboard" element={<ProtectedRoute><DashBoard /></ProtectedRoute>}/>
          <Route path="/availabilityCheck" element={<ProtectedRoute> <AvailabilityCheck/></ProtectedRoute>}/>
          <Route path="/addEvent" element={<ProtectedRoute><AddEvent/></ProtectedRoute>}/>
        {/* <Route  path = "/dashboard" element = {<DashBoard/>} />
        <Route  path = "/dashboard" element = {<Navigate to="/dashboard" replace />} />
        <Route path = "/availabilityCheck" element = {<Navigate to="/availabilityCheck" replace />}/>
        <Route path = "/addEvent" element ={<Navigate to="/availabilityCheck" replace />}/> */}
      </Routes>
  
    </Router>
    </AuthProvider>
  );
}

export default App;
