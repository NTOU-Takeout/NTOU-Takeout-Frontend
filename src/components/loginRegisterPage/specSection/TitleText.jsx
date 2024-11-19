import React from "react";

const TitleText = ({ titleData }) => {
    const [titleText, description] = titleData;
    return (
        <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">{titleText}</h1>
            <p className="text-xs">{description}</p>
        </div>
  );
};

export default TitleText;
