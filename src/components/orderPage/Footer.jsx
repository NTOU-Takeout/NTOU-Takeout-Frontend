import PropTypes from "prop-types";
import EstimatedTime from "./EstimatedTime";

const Footer = ({ estimatedTime, onTimeChange }) => {
    return (
        <div className="fixed bottom-0 min-w-full">
            <EstimatedTime value={estimatedTime} onChange={onTimeChange} />
        </div>

    );
};

Footer.propTypes = {
    estimatedTime: PropTypes.number.isRequired,
    onTimeChange: PropTypes.func.isRequired,
};

export default Footer;
