import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import {api_url} from './constants';
function ContentListExam(props) {
    var isLoggedIn = props.isLoggedIn;
    const arrStyleTable = [
        { "width": "5%", "textAlign": "center", "font-size" : "14px" },
        { "width": "30%", "textAlign": "center", "font-size" : "14px" },
        { "width": "10%", "textAlign": "center", "font-size" : "14px" },
        { "width": "15%", "textAlign": "center", "font-size" : "14px" },
        { "width": "10%", "textAlign": "center", "font-size" : "14px" },
        { "width": "10%", "textAlign": "center", "font-size" : "14px" },
    ];
    const optionExamIsSolved = [
        {
            title: "Tất cả",
        },
        {
            title: "Đã giải",
        },
        {
            title: "Chưa giải"
        }
    ];
    const optionPersonCreatedExam = [
        {
            title: "Người tạo",
        },
        {
            title: "Của bạn",
        }
    ];
    const optionExamCode = [
        {
            title: "Ghi chú",
        },
        {
            title: "Dành cho bạn",
        }
    ];
    const [countOptionExamIsSolved, setCountOptionExamIsSolved] = useState(0);
    const [countOptionPersonCreatedExam, setCountOptionPersonCreatedExam] = useState(0);
    const [countOptionExamCode, setCountOptionExamCode] = useState(0);
    const [elmListExam, setElmListExam] = useState();
    const handleClickOptionExamIsSolved = () => {
        setCountOptionExamIsSolved((countOptionExamIsSolved + 1) % optionExamIsSolved.length);
    }
    const handleClickOptionPersonCreatedExam = () => {
        setCountOptionPersonCreatedExam((countOptionPersonCreatedExam + 1) % optionPersonCreatedExam.length);
    }
    const handleClickOptionExamCode = () => {
        setCountOptionExamCode((countOptionExamCode + 1) % optionExamCode.length);
    }
    const history = useHistory();
    if (isLoggedIn === false || isLoggedIn === undefined) {
        history.push('/');
    }
    const handleClickExam = (exam) => {
        history.push({
            pathname: '/exam/' + exam._id,
            state: { exam }
          })
    }
    var userData = props.userData;
    useEffect(()=>{
        fetch(api_url + '/exam/getfullexam/' + userData.userID, {
            method: 'GET',
        }).then(response => response.json()).then(data => {
            console.log(data.result);
            if (data.success === true) {
                var elm = data.result.map((item, index) => {
                    const exam = item.exam;
                    var examTime = '∞';
                    if (exam.examTime !== undefined && exam.examTime !== null){
                        var hour = Number (exam.examTime.selectedHour);
                        if (hour < 10) hour = '0' + hour;
                        var minute =  Number(exam.examTime.selectedMinute);
                        if (minute < 10) minute = '0' + minute;
                        examTime = hour +':'+ minute
                    }
                    var examOpen = (Number (exam.examOpenTime.day) < 10 ?  '0' + exam.examOpenTime.day : exam.examOpenTime.day) 
                    + '/' + (Number (exam.examOpenTime.month) < 10 ?  '0' + exam.examOpenTime.month : exam.examOpenTime.month) 
                    + '/' + exam.examOpenTime.year
                    return <tr className="cursor-pointer" onClick={() => handleClickExam(exam)}>
                    <th style={arrStyleTable[0]}>{index + 1}</th>
                    <td style={arrStyleTable[1]}>{exam.examName}</td>
                    <td style={arrStyleTable[2]}>{examTime}</td>
                    <td style={arrStyleTable[3]}>{examOpen}</td>
                    <td style={arrStyleTable[3]}>{item.isCreatedBy.fullName}</td>
                    <td style={arrStyleTable[4]}>{(item.forYou === true) ? 'Dành cho bạn' : ''}</td>
                    <td style={arrStyleTable[5]}>OK</td>
                </tr>
                })
                setElmListExam(elm);
            }
        });

        
    },[]);
    return (
        <>
            <table className="table table-sm table-hover table-bordered">
                <thead>
                    <tr>
                        <th style={arrStyleTable[0]}>STT</th>
                        <th style={arrStyleTable[1]}>Tên cuộc thi</th>
                        <th style={arrStyleTable[2]}>Thời gian</th>
                        <th style={arrStyleTable[2]}>Thời gian mở</th>
                        <th style={arrStyleTable[3]} className="cursor-pointer" onClick={() => handleClickOptionPersonCreatedExam()}>
                            {optionPersonCreatedExam[countOptionPersonCreatedExam].title}
                            <i class="bi bi-caret-down-fill cursor-pointer"></i>
                        </th>
                        <th style={arrStyleTable[4]} className="cursor-pointer" onClick={() => handleClickOptionExamCode()}>
                            {optionExamCode[countOptionExamCode].title}
                            <i class="bi bi-caret-down-fill cursor-pointer"></i>
                        </th>
                        <th style={arrStyleTable[5]} className="cursor-pointer" onClick={() => handleClickOptionExamIsSolved()}>
                            {optionExamIsSolved[countOptionExamIsSolved].title}
                            <i class="bi bi-caret-down-fill" ></i>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {elmListExam}
                </tbody>
            </table>
        </>
    );
}
export default ContentListExam;