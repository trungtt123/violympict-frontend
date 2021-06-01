import NavBar from '../etc/navbar';
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Contact from '../etc/contact';
import '../../css/home.css';
import Content from './content';
import Footer from '../etc/footer';
import {api_url} from '../etc/constants';
import 'react-notifications/lib/notifications.css';

function App(props) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    var isLoggedIn = false;
    const [provinceName, setProvinceName] = useState();
    const [districtName, setDistrictName] = useState();
    const [schoolName, setSchoolName] = useState();
    const getProvince = (provinceID) => {
        fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province', {
            method: 'GET',
            headers: {
                'token': 'ff998f5d-a65e-11eb-8be2-c21e19fc6803',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                var provinces = data.data;
                provinces.forEach(province => {
                    if (province.ProvinceID == provinceID) {
                        setProvinceName(province.ProvinceName);
                        return;
                    }
                });

            });
    }
    const getDistrict = (districtID) => {
        fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district', {
            method: 'GET',
            headers: {
                'token': 'ff998f5d-a65e-11eb-8be2-c21e19fc6803',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                var districts = data.data;
                districts.forEach(district => {
                    if (district.DistrictID == districtID) {
                        setDistrictName(district.DistrictName);
                        return;
                    }
                });

            });
    }
    const getSchool = (schoolID) => {
        fetch(api_url + '/school/getschoolfromid/' + schoolID , {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                var school = data.school;
                setSchoolName(school.SchoolName);
            });
    }
    if (userData !== undefined && userData !== null) {
        isLoggedIn = true;
        getProvince(userData.infomation.provinceID);
        getDistrict(userData.infomation.districtID);
        getSchool(userData.infomation.schoolID);
    }
    const [positionSeeMoreForm, setPositionSeeMoreForm] = useState({ display: 'none' });
    const handleClickLogOut = () => {
        localStorage.removeItem('userData');
        window.location.reload();
    }
    const handleMoveSeeMore = () => {
        var rect = document.getElementById("seemoreinfomationuser").getBoundingClientRect();
        var position = {
            top: (rect.top + rect.bottom) / 2 + 20,
            left: (rect.left + rect.right) / 2 - 180,
            display: 'block'
        }
        setPositionSeeMoreForm(position);
    }
    const handleLeaveSeeMore = () => {
        setPositionSeeMoreForm({ display: 'none' });
    }
    if (isLoggedIn === true) {
        return (
            <>
                <Contact />
                
                <div className="row mt-5 cancel">
                    <div className="col-md-10 mt-5 mx-auto">
                        <div className="navbar navbar-expand-lg navbar"
                        >
                            <div className="navbar-nav mr-auto"></div>
                            <span className="nav-link cursor-pointer" style={{fontSize: "15px"}}
                                onMouseMove={() => handleMoveSeeMore()}
                                onMouseLeave={() => handleLeaveSeeMore()}>
                                Xin chào, {userData.infomation.fullName}
                            </span>
                            <i className="bi bi-caret-down-fill" id="seemoreinfomationuser"
                                onMouseMove={() => handleMoveSeeMore()}
                                onMouseLeave={() => handleLeaveSeeMore()}
                            />
                            <div className="border border-info position-fixed z-index-1 rounded bg-white"
                                id="seemoreform"
                                style={positionSeeMoreForm}
                                onMouseMove={() => handleMoveSeeMore()}
                                onMouseLeave={() => handleLeaveSeeMore()}
                            >
                                <a className="nav-link text-dark" style={{fontSize: "15px"}} href="/exam">
                                    Vào thi
                                </a>
                                <a className="nav-link text-dark" style={{fontSize: "15px"}} href="/changeinfomation">
                                    Thay đổi thông tin
                                </a>
                                <a className="nav-link text-dark" style={{fontSize: "15px"}} href="/changepassword">
                                    Thay đổi mật khẩu
                                </a>
                                <a className="nav-link text-dark" style={{fontSize: "15px"}} href="/my-list-exam">
                                    Tạo kì thi
                                </a>
                                <a className="nav-link text-dark" style={{fontSize: "15px"}} href="/" onClick={() => handleClickLogOut()}>
                                    Đăng Xuất
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <NavBar isLoggedIn={isLoggedIn} />
                <Content isLoggedIn={isLoggedIn} userData={userData} userAddress={{provinceName, districtName, schoolName}}/>
                <Footer />
            </>
        );
    }
    else {
        return (
            <>
                <Contact />
                <div className="row mt-5">
                    <div className="col-md-10 mt-5 mx-auto">
                        <div className="float-right">
                           
                            <div className="form-inline">
                                <a href="/register" style={{"text-decoration": "none"}}>
                                    <span className="text-info nav-link cursor-pointer">
                                        Đăng kí tài khoản?
                                    </span>
                                </a>
                                <a href="/login">
                                    <button type="button" className="btn btn-outline-info btn-sm">Đăng nhập</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <NavBar isLoggedIn={isLoggedIn} />
                <Content isLoggedIn={isLoggedIn} />
                <Footer />
            </>
        );
    }

}
export default App;