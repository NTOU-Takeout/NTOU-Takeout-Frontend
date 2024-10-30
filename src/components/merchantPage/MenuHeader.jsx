import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faShareNodes,
    faStar,
    faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

const MenuHeader = ({ merchantData }) => {
    const { name, distance = 10, avarageSpend, rating, reviewIdList, picture, id } = merchantData;
    const merchantId = id;

    return (
        <header className="relative top-0 left-0 w-full menu-header">
            <div
                className="banner bg-cover bg-center h-64 relative before:content-[''] before:absolute before:w-full before:h-full before:backdrop-blur-sm"
                style={{ backgroundImage: `url(${picture})` }}
            ></div>
            <Link to={`/`}>
                <div className="pt-1 pb-1 pl-2 pr-2 return-btn absolute top-10 left-4 transform -translate-y-1/2 bg-white/60 rounded-full">
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="text-slate-800"
                    />
                </div>
            </Link>
            <div className="pt-1 pb-1 pl-2 pr-2 share-btn absolute top-10 right-4 transform -translate-y-1/2 bg-white/60 rounded-full">
                <FontAwesomeIcon
                    icon={faShareNodes}
                    className="text-slate-800"
                />
            </div>
            {/* Store information */}
            <div className="bg-white rounded-t-2xl p-4 relative -top-8 left-0 right-0 z-10 font-notoTC">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold">{name}</h2>
                        <p className="text-gray-400 text-sm">
                            距離您約
                            {distance}
                            公里
                        </p>
                        <p className="text-green-600 text-sm mt-1">
                            平均花費約{avarageSpend}元
                        </p>
                    </div>
                    <Link to={`/menu/${merchantId}/review`}>
                        {" "}
                        <div className="flex items-center mt-10">
                            <FontAwesomeIcon
                                icon={faStar}
                                className="text-yellow-400 ml-2 mt-1"
                            />
                            <span className="text-xl font-semibold">
                                &nbsp;{rating}
                            </span>
                            <span className="text-gray-400 ml-1 mt-0.5">
                                (
                                <span className="border-b border-gray-400">
                                    {reviewIdList.length}+
                                </span>
                                )
                            </span>
                        </div>
                    </Link>
                    <div className="absolute top-4 right-4 text-xl text-gray-500">
                        <FontAwesomeIcon icon={faInfoCircle} />
                    </div>
                </div>
            </div>
        </header>
    );
};

MenuHeader.propTypes = {
    merchantData: PropTypes.object.isRequired,
};

export default MenuHeader;