import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Login from './components/Login';
import MainPage from './components/MainPage'; 
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

function App() {
  return (
    <AuthProvider> {}
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/add-student" element={<StudentForm />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
