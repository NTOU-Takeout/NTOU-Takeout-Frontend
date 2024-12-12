import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";

const BlueNotify = ({ onRefresh }) => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="fixed flex z-40 mx-auto top-[70px] justify-center items-center border-sky-600 border-[2px] bg-sky-200 text-sky-600 px-4 py-3 rounded-lg shadow-md">
                <span className="font-bold">你有一筆新訂單，點擊刷新！</span>
                <button
                    className="text-gray-400 hover:text-gray-500"
                    onClick={onRefresh}
                >
                    <FontAwesomeIcon icon={faSyncAlt} size="lg" />
                </button>
            </div>
        </div>
    );
};
BlueNotify.propTypes = {
    onRefresh: PropTypes.func,
};

export default BlueNotify;
