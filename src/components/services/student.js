import axios from "axios";
import {toast } from 'react-toastify';
const baseUrl = "http://localhost:4000";

const getAllStudents = async ({page,limit}) => {
  try {
    console.log('page',page,'limit',limit)
    const res = await axios.get(`${baseUrl}/students/list?page=${page}&limit=${limit}`);
    return res;
  } catch (err) {
    return null;
  }
};
const deleteStudentById = async (id) => {
  try {
    const res = await axios.delete(`${baseUrl}/students/${id}`);
    toast.success(res.data.message)
    return res.data;
  } catch (err) {
    toast.error(err.response.data.message)
    return null;
  }
};

const createStudent = async ({ name, email, age }) => {
  try {
    console.log('CreateStudent',name,email,age)
    const res = await axios.post(`${baseUrl}/students/create`, {
      name,
      email,
      age: Number(age),
    });
    toast.success(res.data.message)
    return res.data;
  } catch (err) {
    console.log('error',err)
    toast.error(err.response.data.message)
    return null;
  }
};
export const studentServices = {
  getAllStudents,
  deleteStudentById,
  createStudent
};
