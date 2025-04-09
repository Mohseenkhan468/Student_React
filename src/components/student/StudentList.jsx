import React, { useEffect, useState } from "react";
import { studentServices } from "../services/student";
import { useNavigate } from "react-router";
import StudentForm from "./StudentForm";
function StudentList() {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState(false);
  const limit = 5;
  useEffect(() => {
    getUsers();
  }, [page, status]);
  const navigate = useNavigate();
  const getUsers = async () => {
    const res = await studentServices.getAllStudents({ page, limit });
    if (res?.data?.data && Array.isArray(res?.data?.data)) {
      setStudents(res?.data?.data);
      setTotalPages(res?.data?.total_pages);
    }
  };
  const deleteUser = async (id) => {
    try {
      const res = await studentServices.deleteStudentById(id);
      if (res.success) {
        getUsers();
      }
    } catch (err) {
      console.log("error in deleting user");
    }
  };
  const handlePageClick = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setPage(pageNumber);
    }
  };
  return (
    <div>
      <h1 className="text-center">Students</h1>
      <div className="float-end m-3">
        <StudentForm status={status} setStatus={setStatus} />
      </div>
      <table className="table text-center">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Age</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(students) && students?.length ? (
            students?.map((student, i) => (
              <tr>
                <th scope="row">{i + 1}</th>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td className="d-flex justify-content-center gap-2">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => navigate(`/marks/${student.id}`)}
                  >
                    View
                  </button>
                  {/* <button type="button" className="btn btn-secondary">
                    Edit
                  </button> */}
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteUser(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageClick(page - 1)}
            >
              Previous
            </button>
          </li>

          {Array.from({ length: totalPages }, (_, i) => (
            <li
              key={i}
              className={`page-item ${page === i + 1 ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageClick(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}

          <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageClick(page + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default StudentList;
