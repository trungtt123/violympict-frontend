import React, { useState, useEffect, useRef } from 'react';
function ContentAboutUs(props) {
    var isLoggedIn = props.isLoggedIn;
    var userData = props.userData;
    return (
        <>
            <h2 className="ml-4">
                This's About - Us.
            </h2>
        </>
    );
}
export default ContentAboutUs;