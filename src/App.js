import { useEffect } from "react";
import "./App.css";
import StudentList from "./components/student/StudentList";
import { BrowserRouter, Route, Routes } from "react-router";
import MarksList from "./components/student/marks/MarksList";
import StudentForm from "./components/student/StudentForm";
import { ToastContainer } from "react-toastify";

function App() {
  useEffect(() => {
    console.log(process.env);
  }, []);
  return (
    <BrowserRouter>
    <ToastContainer/>
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/marks/:studentId" element={<MarksList />} />
        <Route path="/student/create" element={<StudentForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
