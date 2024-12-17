const uploadImageToImgur = async (file) => {
    const clientId = `${import.meta.env.IMGUR_CLIENT_ID}`;
    const formData = new FormData();
    formData.append("image", file);

    for (let pair of formData.entries()) {
        console.log(pair[0]+ ': ' + pair[1]);
    }

    try {
        const response = await fetch("https://api.imgur.com/3/image", {
            method: "POST",
            headers: {
                Authorization: `Client-ID ${clientId}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success) {
            console.log("上傳成功", data.data.link);
            return data.data.link;
        } else {
            throw new Error("圖片上傳失敗，請檢查 API 回應");
        }
    } catch (error) {
        console.error("圖片上傳錯誤:", error.message);
        return null;
    }
};

export default uploadImageToImgur;
