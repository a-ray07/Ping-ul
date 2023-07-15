import './App.css';
import Chatpage from './components/Chatpage';
import Signin from './components/Signin';
import Signup from './components/Signup';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/Authcontext';
import ProtectedChatpage from './auth/auth.guard';
import { CentralStateProvider } from './context/CentralContext';

function App() {
  return (
    <>
      <AuthProvider>
        <CentralStateProvider>
          <Routes>
            <Route path='/' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/chatpage' element={<ProtectedChatpage />} />
          </Routes>
        </CentralStateProvider>
      </AuthProvider>
    </>
  );
}

export default App;


//1018355_gri