import React, { useState } from "react";
import { marksService } from "../../services/marks";

function MarksForm({ studentId,status,setStatus }) {
  const [formData, setFormData] = useState({
    subject: "",
    score: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createUser({
      subject: formData.subject,
      score: formData.score,
    });
    console.log("handle", formData);
    setFormData({ subject: "", score: "" });
  };
  const createUser = async ({ subject, score }) => {
     const res=await marksService.addStudentMarks({
      studentId,
      subject,
      score: Number(score),
    });
    console.log('response',res)
    if(res.success){
      setStatus(!status)
    }
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Add Marks
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add Marks
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label for="subject" className="form-label text-start d-block">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    name="subject"
                    placeholder="Enter Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label for="score" className="form-label text-start d-block">
                    Score
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="score"
                    name="score"
                    placeholder="Enter Score"
                    value={formData.score}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarksForm;
