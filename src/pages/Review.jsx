import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom'; 
import { useQuery } from '@tanstack/react-query';
import ReviewCardList from '../components/reviewPage/ReviewCardList';
import RatingBar from '../components/reviewPage/RatingBar';
import getReviewClient from '../api/review/getReviewClient';
import getStoreClient from '../api/store/getStoreClient';
import useMerchantStore from '../stores/merchantStore';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


const star1Percentage=90;
const star2Percentage=40;
const star3Percentage=10;
const star4Percentage=20;
const star5Percentage=5;
const star1Count=76;
const star2Count=10;
const star3Count=2;
const star4Count=4;
const star5Count=4;

const Review = () => {
  const {merchantId} = useParams();
  const getMerchantById = useMerchantStore((state) => state.getMerchantById);
  const [merchant, setMerchant] = useState(null);
  const [reviewIdList, setReviewIdList] = useState([]);
  const navigate = useNavigate();
  const handleClose = () => {
    navigate(-1);  // 返回到正確的路徑
  };

  useEffect(() => {
    const merchantData = getMerchantById(merchantId);
    if (merchantData) {
      setMerchant(merchantData);
      setReviewIdList(merchantData.reviewIdList);
    } else { // Fetch merchant data if not in store
      const fetchMerchantData = async () => {
        try {
          const data = await getStoreClient.getMerchantsByIdList([merchantId]);
          setMerchant(data[0]);
          setReviewIdList(data[0]?.reviewIdList || null);
        } catch (error) {
          console.error("Failed to fetch merchant data:", error);
        }
      };
      fetchMerchantData();
    }
  }, [merchantId, getMerchantById]);

    
    return (
        !merchant || !reviewIdList ? 
        <div className="font-notoTC flex justify-center items-center mt-4 fa-2x">
            <FontAwesomeIcon icon={faSpinner} spinPulse />
            </div> :
            <div className="font-notoTC fixed top-0 left-0 w-full h-full  bg-white flex flex-col justify-start items-start">
                <div className='ml-12 mt-8'>
                    <div className="absolute top-4 right-4">
                        <button className="text-gray-500 hover:text-gray-700" onClick={handleClose}>
                        <FontAwesomeIcon icon={faTimes} className="w-8 h-8" />
                        </button>
                    </div>

                    <h2 className="text-3xl font-bold text-black text-left">{merchant.name}的評論</h2>

                    <div className="flex items-center mt-4 text-left">
                        <span className="text-5xl font-bold">{merchant.rating}</span>
                        <FontAwesomeIcon icon={faStar} className="text-yellow-300 ml-2 w-10 h-10" />
                    </div>
                    <div className="mt-4 text-left w-full max-w-md">
                        <RatingBar stars={5} percentage={star1Percentage} count={star1Count} />
                        <RatingBar stars={4} percentage={star2Percentage} count={star2Count} />
                        <RatingBar stars={3} percentage={star3Percentage} count={star3Count} />
                        <RatingBar stars={2} percentage={star4Percentage} count={star4Count} />
                        <RatingBar stars={1} percentage={star5Percentage} count={star5Count} />
                    </div>
                </div>
            <ReviewCardList reviewIdList={reviewIdList} merchantId={merchantId} ></ReviewCardList>
        </div>
    );
};

export default Review;
