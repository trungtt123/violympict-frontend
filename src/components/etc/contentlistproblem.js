import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { api_url } from './constants';
function ContentListProblem(props) {
    var isLoggedIn = props.isLoggedIn;
    const arrStyleTable = [
        { "width": "5%", "textAlign": "center", "font-size": "14px" },
        { "width": "30%", "textAlign": "center", "font-size": "14px" },
        { "width": "30%", "textAlign": "center", "font-size": "14px" },
        { "width": "15%", "textAlign": "center", "font-size": "14px" },
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
            title: "Có mã",
        },
        {
            title: 'Không mã'
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
    useEffect(() => {
        fetch(api_url + '/exam/getfullexam', {
            method: 'GET',
        }).then(response => response.json()).then(data => {
            if (data.success === true) {
                var elm = data.result.map((exam, index) => {
                    var time = exam.examTime;
                    var textTime;
                    if (time === undefined) textTime = '-';
                    else textTime = time.startTime + ' - ' + time.endTime + " " + time.day + '/' + time.month + '/' + time.year;
                    return <tr className="cursor-pointer" onClick={() => handleClickExam(exam)}>
                        <th style={arrStyleTable[0]}>{index + 1}</th>
                        <td style={arrStyleTable[1]}>{exam.examName}</td>
                        <td style={arrStyleTable[2]}>{textTime}</td>

                        <td style={arrStyleTable[3]}>{exam.userInfomation.fullName}</td>
                        <td style={arrStyleTable[4]}>{(exam.examCode === "") ? "-" : "Có mã"}</td>
                        <td style={arrStyleTable[5]}>
                            <img className="icon-success-exam" src="assets/img/icon-success-exam.png" />
                        </td>
                    </tr>
                })
                setElmListExam(elm);
            }
        });


    }, []);
    return (
        <>
            <div className="row ml-1 mr-1">
             <table className="table table-sm table-hover table-bordered" style={{width: "70%"}}>
                <thead>
                    <tr>
                        <th style={arrStyleTable[0]}>STT</th>
                        <th style={arrStyleTable[1]}>Tên bài tập</th>
                        <th style={arrStyleTable[2]}>Dạng bài</th>
                        <th style={arrStyleTable[3]}>Số người giải được</th>
                    </tr>
                </thead>
                <tbody>
                    <tr> 
                        <th style={arrStyleTable[0]}>1</th>
                        <td style={arrStyleTable[1]}>Cái túi</td>
                        <td style={arrStyleTable[2]}>Quy hoạch động</td>
                        <td style={arrStyleTable[3]}>1000</td>
                    </tr>
                </tbody>
            </table>
            <table className="table table-sm table-hover table-bordered" style={{width: "20%", marginLeft: "10%"}}>
                <thead>
                    <tr>
                        <th>
                        <span style={{marginLeft: "10px", fontSize: "14px"}}>Bài tập mới</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr> 
                        <td><span style={{marginLeft: "10px", fontSize: "14px"}}>1. Cái túi</span></td>
                        
                    </tr>
                    <tr> 
                        <td> <span style={{marginLeft: "10px", fontSize: "14px"}}>2. Cái túi</span></td>
                        
                    </tr>
                </tbody>
            </table>
            </div>
        </>
    );
}
export default ContentListProblem;