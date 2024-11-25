const CartRemark = () => {
    return (
        <div className=" bg-white flex items-center justify-center">
            <div className="mt-20 w-[97%]">
                <label htmlFor="note" className="block text-xl font-bold mb-2">
                    備註
                </label>
                <textarea
                    id="remarkInput"
                    className="w-full h-24 p-4 bg-gray-100 rounded-lg text-gray-700 resize-none"
                    placeholder="請在此輸入..."
                />
            </div>
        </div>
    );
};

export default CartRemark;
