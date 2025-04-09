import axios from "axios";
import {toast } from 'react-toastify';
const baseUrl = "http://localhost:4000";
const getMarksByStudentId = async (studentId) => {
  try {
    const res = await axios.get(`${baseUrl}/marks/${studentId}`);
    return res;
  } catch (err) {
    return null;
  }
};
const addStudentMarks = async ({ studentId, subject, score }) => {
  try {
    const res = await axios.post(`${baseUrl}/marks/${studentId}`, {
      subject,
      score,
    });
    toast.success(res.data.message)
    return res?.data;
  } catch (err) {
    toast.error(err.response.data.message)
    return null;
  }
};
const deleteMarksById = async (id ) => {
  try {
    const res = await axios.delete(`${baseUrl}/marks/${id}`);
    toast.success(res.data.message)
    return res?.data
  } catch (err) {
    toast.error(err.response.data.message)
    return null;
  }
};
export const marksService = {
  getMarksByStudentId,
  addStudentMarks,
  deleteMarksById
};
