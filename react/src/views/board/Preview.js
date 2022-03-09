
import React from 'react';

const Preview = ({ image }) => {



    const [preview, setPreview] = React.useState(null);
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
        setPreview(reader.result)

    }
    return (


        <div>
            <img src={preview} alt="preview" width="100px" height="100px" />
        </div>
    );
};

export default Preview;