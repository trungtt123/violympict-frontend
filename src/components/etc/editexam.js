import React, { useState, useEffect, useRef } from 'react';
import '../../css/create-exam.css';
import { useHistory } from 'react-router-dom';
import Calendar from './calendar';
import { api_url } from './constants';
function EditExam(props) {
    var isLoggedIn = props.isLoggedIn;
    var userData = props.userData;
    const history = useHistory();
    const [curExam, setCurExam] = useState();
    const [examName, setExamName] = useState();
    const [examCode, setExamCode] = useState();
    const [examTime, setExamTime] = useState();
    const [disableCalendar, setDisableCalendar] = useState(false);
    const handleSubmitEditExam = () => {
        var data = {
            examName,
            examCode,
            examTime
        }
        fetch(api_url + '/exam/editexam/' + curExam._id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data)
        }).then(response => response.json()).then(data => {
            if (data.success === true){
                history.push('/my-list-exam');
            }
        });
    }
    const handleChangeExamName = (e) => {
        setExamName(e.target.value);
    }
    const handleChangeExamCode = (e) => {
        setExamCode(e.target.value);
    }
    
    const callBackSaveTimeExam = (time) => {
        setExamTime(time);
    }
    useEffect(() => {
        var examID = window.location.pathname.split('/')[2];
        fetch(api_url + '/exam/getexam/' + examID, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                if (data.success === true) {
                    console.log(data.result);
                    setCurExam(data.result);
                }
            });
    }, []);
    if (curExam !== undefined)
        return (
            <>
                <div className="create-exam">
                    <h1 className="text-info ml-4">
                        Ch???nh s???a k?? thi
                </h1>
                    <div className="row ml-4">
                        <div className="col-25">
                            <label htmlFor="fname">T??n k?? thi</label>
                        </div>
                        <div className="col-25">
                            <input type="text" placeholder="T??n k?? thi" defaultValue={curExam.examName} onChange={(e) => handleChangeExamName(e)} />
                        </div>
                    </div>
                    <div className="row ml-4">
                        <div className="col-25">
                            <label htmlFor="country">M?? code</label>
                        </div>
                        <div className="col-25">
                            <input type="text" placeholder="M?? code" defaultValue={curExam.examCode} onChange={(e) => handleChangeExamCode(e)} />
                        </div>
                    </div>
                    <div className="row ml-4">
                        <div className="col-25">
                            <label htmlFor="country">Th???i gian</label>
                        </div>
                        <div className="col-25">
                            <Calendar disableCalendar={disableCalendar} callBackSaveTimeExam={callBackSaveTimeExam} curExamCalendar={curExam.examTime} />


                        </div>
                    </div>
                    {/* <div className="row ml-4">
                    <div className="col-25">
                        <label htmlFor="subject">B??i ???? t???o</label>
                    </div>
                </div>
                 {elmListProblemIsCreated} 
                <div className="row ml-4">
                    <div className="col-25">
                        <label htmlFor="subject">T???o b??i t???p</label>
                    </div>
                    <button className="btn btn-primary" onClick={() => handleClickButtonAddProblem(undefined)}>T???o b??i t???p m???i</button>
                    <button className="btn btn-danger ml-2" onClick={() => handleClickButtonCancelProblem()}>H???y</button>
                </div> */}
                    <div className="row ml-4 mb-4">
                        <input type="submit" value="G???i" onClick={() => handleSubmitEditExam()} />
                    </div>
                </div>
            </>
        );
    else return <> </>
}
export default EditExam;