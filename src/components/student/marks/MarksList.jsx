import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { marksService } from "../../services/marks";
import MarksForm from "./MarksForm";

function MarksList() {
  const [marks, setMarks] = useState([]);
  const { studentId } = useParams();
  const [status, setStatus] = useState(false);
  useEffect(() => {
    getMarks();
  }, [studentId,status]);
  const getMarks = async () => {
    try {
      const res = await marksService.getMarksByStudentId(studentId);
      if (res?.data?.data && Array.isArray(res?.data?.data)) {
        setMarks(res?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching marks:", error);
    }
  };

  const deleteMarks = async (id) => {
    console.log("id", id);
    const res = await marksService.deleteMarksById(id);
    if (res.success) {
      getMarks();
    }
  };
  return (
    <div className="text-center">
      <h1>Marks</h1>
      <div className="float-end m-3">
        <MarksForm studentId={studentId} status={status} setStatus={setStatus} />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Subject</th>
            <th scope="col">Score</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {marks.map((item, i) => (
            <tr>
              <th scope="row">{i + 1}</th>
              <td>{item.subject}</td>
              <td>{item.score}</td>
              {/* <td className="d-flex justify-content-center gap-2">
                <button type="button" className="btn btn-secondary">
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteMarks(item.id)}
                >
                  Delete
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MarksList;
