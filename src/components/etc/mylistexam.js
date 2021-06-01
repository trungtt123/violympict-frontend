import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { api_url } from './constants';
function ContentRank(props) {
    const isLoggedIn = props.isLoggedIn;
    const userData = props.userData;
    const history = useHistory();
    const [elmListExam, setElmListExam] = useState();
    if (isLoggedIn === false || isLoggedIn === undefined) {
        history.push('/');
    }
    if (userData.infomation.permissionID === 0) {
        alert('Tài khoạn của bạn không được cấp quyền này!!!');
        history.push('/');
    }
    const handlePublishExam = (exam) => {
        fetch(api_url + '/exam/handlepublishexam/' + exam._id, {
            method: 'GET',
        }).then(response => response.json()).then(data => {
            if (data.success === true){
                window.location.reload();
            }
        });
    }
    const handleDeleteExam = (exam) => {
        fetch(api_url + '/exam/deleteexam/' + exam._id, {
            method: 'GET',
        }).then(response => response.json()).then(data => {
            if (data.success === true && data.result === true){
                window.location.reload();
            }
        });
    }
    useEffect(() => {
        fetch(api_url + '/exam/getallexam/' + userData.userID, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                if (data.success === true) {
                    var listExam = data.result;
                    var tmp = listExam.map((exam, index) => {
                        console.log(exam);
                        var hrefEdit = "/edit-exam/" + exam._id; 
                        var hrefAddProblem = "/exam/" + exam._id + "/add-problem"; 
                        var style={color: "white", backgroundColor: "#2596be"};
                        var namePublish = "Đóng kì thi";
                        if (exam.isPublished === false) {
                            style = undefined;
                            namePublish = "Mở kì thi";
                        }
            
                        return <div key={index}>
                            <div className="list-group-item mb-2 cursor-pointer rounded" style={style} >{exam.examName}</div>
                            <div className="btnControl mb-2 text-light">
                                <button className="btn btn-info mr-1" onClick={() => {history.push(hrefEdit)}}>Chỉnh sửa</button>
                                <button className="btn btn-success mr-1" onClick={() => {history.push(hrefAddProblem)}}>Thêm bài tập</button>
                                <button className="btn btn-warning text-light mr-1" onClick={() => handlePublishExam(exam)}>{namePublish}</button>
                                <button className="btn btn-danger" onClick={() => handleDeleteExam(exam)}>Xóa kì thi</button>
                            </div>
                        </div>
                    });
                    if (listExam.length === 0) {
                        tmp = <div className="list-group-item mb-2 cursor-pointer rounded">Bạn chưa tạo kì thi nào!</div>
                    }
                    setElmListExam(tmp);
                }
            });
    }, []);
    return (
        <div className="my-list-exam mt-4">
            <div className="d-flex justify-content-center">
                <h4>Danh sách kì thi của bạn</h4>
            </div>
            <div style={{ margin: "auto", width: "700px", padding: "20px" }}>
                {elmListExam}
                <button className="btn btn-info" 
                onClick={()=>{history.push("/create-exam")}}>Tạo mới kì thi</button>
            </div>
            
        </div>
    );
}
export default ContentRank;