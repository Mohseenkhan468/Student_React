import React from "react";
import ModelForm from "../utils/ModelForm";

function StudentForm({status,setStatus}) {
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Add Student
      </button>
      <ModelForm status={status} setStatus={setStatus}/>
    </div>
  );
}

export default StudentForm;
