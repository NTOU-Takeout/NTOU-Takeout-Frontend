import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as hollowFaBookmark } from "@fortawesome/free-regular-svg-icons/faBookmark";
import { faBookmark as solidFaBookmark } from "@fortawesome/free-solid-svg-icons/faBookmark";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons/faStar";
import useBookmarkStore from "../stores/bookmarkStore";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const Merchant = (props) => {
    const { markedMerchants, toggleBookmark } = useBookmarkStore();
    const { id, name, averageSpend, rating, picture, reviews } = props;
    const isMarked = markedMerchants[id] || false;

    const handleBookmarkClick = () => {
        toggleBookmark(id);
    };

    const distanceList = [12, 32, 21, 27, 9, 47];
    function sumStringDigits(str) {
        return str
            .split("") // 將字符串分割成字符數組
            .map((char) => {
                // 檢查是否為數字，若是則轉為數字，否則轉為 ASCII 值
                return isNaN(char) ? char.charCodeAt(0) : Number(char);
            })
            .reduce((acc, curr) => acc + curr, 0); // 將數字和 ASCII 值相加
    }

    return (
        <Link key={id} to={`/menu/${id}`}>
            <div
                className="font-notoTC relative w-[90vw] h-[241px] m-2 bg-white border-2
                        border-gray-300 rounded-2xl overflow-hidden"
            >
                <div className="object-cover w-full h-full">
                    <FontAwesomeIcon
                        className="absolute right-[5%] top-[13px] z-20 p-3 fa-lg"
                        icon={isMarked ? solidFaBookmark : hollowFaBookmark}
                        style={{ color: isMarked ? "#8E8686" : "#8E8686" }}
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            handleBookmarkClick();
                        }}
                    />
                    <img
                        src={picture}
                        alt="Store Image"
                        className="relative w-full h-[65%] object-cover"
                    />
                </div>
                
                <div className="box-border absolute w-[90vw] h-[87px] left-0 top-[154px] border-t-2 border-gray-300">
                    <div className="absolute h-[22px] left-[12px] top-[9px] text-black font-bold text-lg leading-5">
                        {name}
                    </div>
                    <div className="absolute h-[12px] left-[12px] top-[32px] text-gray-500 font-semibold text-xs leading-[12px]">
                        距離您約{" "}
                        {distanceList[Math.floor(sumStringDigits(id) % 6)]} 公里
                    </div>
                    <div className="absolute h-[12px] left-[12px] top-[57px] text-green-700 font-bold text-xs leading-[12px]">
                        平均花費約 {averageSpend} 元
                    </div>
                    <div className="absolute w-[75px] h-[20px] right-[3px] bottom-[11px] flex items-center">
                        <div className="flex items-center">
                            <FontAwesomeIcon
                                icon={solidStar}
                                style={{ color: "#FFD43B" }}
                                className="h-[0.80em] w-[0.80em] mr-[1px]"
                            />
                            <span className="font-medium text-[13px] leading-[15px] text-gray-600 mb-[-1px]">
                                {rating} ({reviews.length})
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};
Merchant.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    // distance: PropTypes.string.isRequired,
    averageSpend: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    picture: PropTypes.string.isRequired,
    reviews: PropTypes.array.isRequired,
};
export default Merchant;
