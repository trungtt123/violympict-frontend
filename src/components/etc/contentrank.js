import React, { useState, useEffect, useRef } from 'react';
function ContentRank(props) {
    var isLoggedIn = props.isLoggedIn;
    var userData = props.userData;
    const arrStyleTable = [
        { "width": "10%", "textAlign": "center", "font-size": "14px" },
        { "width": "40%", "textAlign": "center", "font-size": "14px" },
        { "width": "25%", "textAlign": "center", "font-size": "14px" },
        { "width": "25%", "textAlign": "center", "font-size": "14px" }
    ];
    const [elmProvince, setElmProvince] = useState();

    useEffect(() => {
        fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province', {
            method: 'GET',
            headers: {
                'token': 'ff998f5d-a65e-11eb-8be2-c21e19fc6803',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                var elm = data.data.map((province, index)=>{
                    return <tr key={index}>

                    <td style={arrStyleTable[0]}>{index+1}</td>
                    <td style={arrStyleTable[1]} className="cursor-pointer">{province.ProvinceName}</td>
                    <td style={arrStyleTable[2]}>100</td>
                    <td style={arrStyleTable[3]}>100</td>
                </tr>
                })
                setElmProvince(elm);
            });
    }, [])
    return (
        <>
            <div className="row ml-1">
                <div style={{ fontSize: "14px", marginTop: "100px", width: "50%" }}>


                    <table className="table table-sm table-bordered">
                        <thead>
                            <tr>

                                <th style={arrStyleTable[0]}>STT</th>
                                <th style={arrStyleTable[1]}>Tỉnh/Thành phố</th>
                                <th style={arrStyleTable[2]}>THCS</th>
                                <th style={arrStyleTable[3]}>THPT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {elmProvince}
                        </tbody>
                    </table>


                </div>
            </div>
        </>
    );
}
export default ContentRank;