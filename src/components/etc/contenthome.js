import React, { useState, useEffect, useRef } from 'react';
import {api_url} from './constants';
function ContentHome(props) {
    var isLoggedIn = props.isLoggedIn;
    var userData = props.userData;
    var userAddress = props.userAddress;
    if (isLoggedIn === undefined || isLoggedIn === false) {
        return (

            <div className="content">
                <h2 className="ml-4">Ảnh</h2>
                <h1 className="ml-4 mt-5">
                    Cuộc thi Violympic Tin học
                            </h1>
                <h3 className="ml-4">
                    Dành cho học sinh THCS, THPT
                            </h3>
                <h2 className="ml-4">
                    Đăng nhập để thi ngay nào !!!
                            </h2>
                <h3 className="ml-4 mt-5">
                    Content
                            </h3>
                <h3 className="ml-4 mt-5">
                    Content
                            </h3>
                <h3 className="ml-4 mt-5">
                    Content
                            </h3>
                <h3 className="ml-4 mt-5">
                    Content
                            </h3>
                <h3 className="ml-4 mt-5">
                    Content
                            </h3>
            </div>

        );
    }
    else {
        return <>
            <div className="content">
                <h2 className="ml-4">Ảnh</h2>
                <h6 className="ml-4 mt-5">
                    {userData.infomation.fullName}
                </h6>
                <h6 className="ml-4">
                    {userAddress.schoolName}, {userAddress.districtName}, {userAddress.provinceName}
                </h6>

            </div>
            <div className="mb-5 mt-4">
                <a href="/exam-round">
                    <button className="btn btn-outline-info btn-sm my-2 my-sm-0 ml-4">Vào thi</button>
                </a>
                <a href="/practice">
                    <button className="btn btn-outline-info btn-sm my-2 my-sm-0 ml-2">Luyện tập</button>
                </a>
            </div>
        </>
    }
}
export default ContentHome;