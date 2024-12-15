import MerchantRegisterPage from "../components/merchantRegisterPage/RegisterPage";

const MerchantRegister = () => {
    console.debug("MerchantRegister");
    return (
        <div className="flex flex-col items-center justify-start mt-[4rem] min-h-[50vh] font-notoTC">
            <MerchantRegisterPage />
        </div>
    );
}

export default MerchantRegister;