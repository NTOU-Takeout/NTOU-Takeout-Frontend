import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCoins } from '@fortawesome/free-solid-svg-icons';



const MenuInfo = ({ onClose,storeName="好想水餃",
    starRate="4.9",
    solidStar=4,
    locationURL="\"https://maps.google.com\"",
    locationName="基隆市中正區北寧路2號 (Google map)",
    telNumber="0987-114-514",
    costDownLimit="100",
    costUpLimit="200"
 }) => {
    return (
        <div className="fixed z-50 left-1/2 w-[80%] transform -translate-x-1/2 -translate-y-1/2 max-w-sm p-4 bg-white shadow-md rounded-xl mx-auto ">

            {/* Close button */}
            <div className="absolute top-2 right-2  rounded-lg flex justify-center items-center">
                <button className="text-gray-500 hover:text-gray-700 p-2">
                    <FontAwesomeIcon 
                        icon={faTimes} 
                        onClick={onClose}
                        className="w-7 h-7"
                    />
                </button>
            </div>
            <h2 className="text-2xl font-bold text-black">{storeName}</h2>

            <div className="flex items-center mt-1">
                <div className=" font-medium text-[13px] leading-[15px] text-gray-600 mb-[-1px]">{starRate}</div>
                <div className=" text-yellow-500">
                    {[...Array(solidStar)].map((_, i) => (
                        <FontAwesomeIcon key={i} icon={faStar} className="inline-block h-4 w-4" />
                    ))}
                    {[...Array(5-solidStar)].map((_, i) => (
                        <FontAwesomeIcon key={i} icon={faStar} className="inline-block h-4 w-4 text-gray-300" />    
                    ))}
                    
                </div>
            </div>
            <div className="mt-4">
                <a href={locationURL} className="flex items-center text-blue-600 hover:underline">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4 mr-2" />
                    {locationName}
                </a>
            </div>
            <div className="mt-2 flex items-center">
                <FontAwesomeIcon icon={faPhone} className="w-4 h-4 mr-2" />
                {telNumber}
            </div>

            <div className="mt-2">
                <div className="flex items-center">
                    <FontAwesomeIcon icon={faClock} className="w-4 h-4 mr-2" />
                    <span>星期二：10:00 ~ 23:00</span>
                </div>
                <div className="ml-6">星期三：12:00 ~ 23:00</div>
                <div className="ml-6">星期四：13:00 ~ 23:00</div>
                <div className="ml-6">星期五：08:00 ~ 24:00</div>
                <div className="ml-6">星期六：10:00 ~ 23:00</div>
                <div className="ml-6">星期日：10:00 ~ 23:00</div>
            </div>
            <div className="mt-4 flex items-center">
                <FontAwesomeIcon icon={faCoins} className="w-4 h-4 mr-2" />
                <span>每人 {costDownLimit} ~ {costUpLimit} 元</span>
            </div>
        </div>
    );
};//to design

MenuInfo.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default MenuInfo;