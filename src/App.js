import './App.css';
import Chatpage from './components/Chatpage';
import Signin from './components/Signin';
import Signup from './components/Signup';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/Authcontext';
import ProtectedChatpage from './auth/auth.guard';

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/chatpage' element={<ProtectedChatpage />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
