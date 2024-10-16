import React, { useState, useEffect, useCallback, useRef } from 'react';
import Merchant from './Merchant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const topComponent = [
  { id: 0, name: "海洋大學店", distance: 1.6, costDownLimit: 98, costUpLimit: 123, starRate: 4.8, starNumber: 71 },
  { id: 1, name: "海", distance: 2.5, costDownLimit: 12, costUpLimit: 124, starRate: 3.2, starNumber: 12 },
  { id: 2, name: "海洋大學店", distance: 1.6, costDownLimit: 98, costUpLimit: 123, starRate: 4.8, starNumber: 71 },
  { id: 3, name: "海", distance: 2.5, costDownLimit: 12, costUpLimit: 124, starRate: 3.2, starNumber: 12 },
  { id: 4, name: "海洋大學店", distance: 1.6, costDownLimit: 98, costUpLimit: 123, starRate: 4.8, starNumber: 71 },
  { id: 5, name: "海", distance: 2.5, costDownLimit: 12, costUpLimit: 124, starRate: 3.2, starNumber: 12 },
];
const midComponent = [
    { id: 0, name: "海洋大學店", distance: 1.6, costDownLimit: 98, costUpLimit: 123, starRate: 4.8, starNumber: 71 },
    { id: 1, name: "海", distance: 2.5, costDownLimit: 12, costUpLimit: 124, starRate: 3.2, starNumber: 12 },
    { id: 2, name: "海洋大學店", distance: 1.6, costDownLimit: 98, costUpLimit: 123, starRate: 4.8, starNumber: 71 },
    { id: 3, name: "海", distance: 2.5, costDownLimit: 12, costUpLimit: 124, starRate: 3.2, starNumber: 12 },
    { id: 4, name: "海洋大學店", distance: 1.6, costDownLimit: 98, costUpLimit: 123, starRate: 4.8, starNumber: 71 },
    { id: 5, name: "海", distance: 2.5, costDownLimit: 12, costUpLimit: 124, starRate: 3.2, starNumber: 12 },
  ];
const bottomComponent = [
    { id: 0, name: "海洋大學店", distance: 1.6, costDownLimit: 98, costUpLimit: 123, starRate: 4.8, starNumber: 71 },
    { id: 1, name: "海", distance: 2.5, costDownLimit: 12, costUpLimit: 124, starRate: 3.2, starNumber: 12 },
    { id: 2, name: "海洋大學店", distance: 1.6, costDownLimit: 98, costUpLimit: 123, starRate: 4.8, starNumber: 71 },
    { id: 3, name: "海", distance: 2.5, costDownLimit: 12, costUpLimit: 124, starRate: 3.2, starNumber: 12 },
    { id: 4, name: "海洋大學店", distance: 1.6, costDownLimit: 98, costUpLimit: 123, starRate: 4.8, starNumber: 71 },
    { id: 5, name: "海", distance: 2.5, costDownLimit: 12, costUpLimit: 124, starRate: 3.2, starNumber: 12 },
  ];

function MerchantList() {

  return (
    <div></div>
  );
}

export default MerchantList;