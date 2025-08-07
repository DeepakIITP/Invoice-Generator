import axios from "axios";

export const uploadInvoiceThumbnail = async (imageData) => {
    const formData = new FormData();
    formData.append("file", imageData);
    formData.append("upload_preset", "invoice");
    formData.append("cloud_name", "de6rwdrkx");
    const response = await axios.post(
        `https://api.cloudinary.com/v1_1/de6rwdrkx/image/upload`,
        formData
    );
    return response.data.secure_url;
};