import React, { useState } from "react";
import getAllExams from "../../redux/action/GetAllExamAction";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../reusable/Loader";
import ModalComp from "../../reusable/ModalComp";
import TableReusable from "../../reusable/TableReusable";

const StudentDashboard = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allExamData, loading } = useSelector(({ getStuExam }) => getStuExam);

  useEffect(() => {
    dispatch(getAllExams());
  }, []);

  const handleModalClick = (id) => {
    setModalShow(true);
    let i = allExamData.findIndex((x) => x._id == id);
    setModalData(allExamData[i]);
  };

  const handleGiveExam = (id) => {
    let subjectIndex = allExamData?.map((v, i) =>
      allExamData?.findIndex((x) => x._id == id)
    );
    navigate(`/GetExamPaper/${id}`, {
      state: {
        subjectName: allExamData?.[subjectIndex?.[0]]?.subjectName,
      },
    });
  };
  const column = [
    { heading: "No." },
    { heading: "SubjectName", value: "subjectName" },
    { heading: "Email", value: "email" },
    { heading: "Result", value: "Result" },
    { heading: "Notes", value: "notes" },
    { heading: "Detail", onClick: handleModalClick },
    { heading: "Give Exam", onClick: handleGiveExam },
  ];

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <h1>All Exams</h1>
          <div>
            <TableReusable header={column} data={allExamData} />
          </div>
          {modalShow ? (
            <ModalComp
              show={modalShow}
              onHide={() => setModalShow(false)}
              data={modalData}
            />
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
