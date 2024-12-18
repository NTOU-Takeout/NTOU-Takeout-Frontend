import PropTypes from "prop-types";

const UserInfo = ({ user }) => {
    return (
        <div className="mb-6">
            <p className="font-bold text-lg">用戶 {user.userId}</p>
            <p className="text-sm">電子郵件: {user.email}</p>
            <p className="text-sm">電話號碼: {user.phone}</p>
            <p className="text-sm">下單時間: {user.time}</p>
            <p className="text-xl font-bold mt-2">總金額: ${user.total}</p>
        </div>
    );
};

UserInfo.propTypes = {
    user: PropTypes.shape({
        userId: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        total: PropTypes.number.isRequired,
    }).isRequired,
};

export default UserInfo;
