import useAxiosPublic from '../../../../hooks/useAxiosPublic';

const useImageUploader = () => {
    const axiosPublic = useAxiosPublic();
    const image_hosting_key = import.meta.env.VITE_APIKEY_IMAGE;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    const imageUpload = async (imageInputFile) => {
        const imageFile = new FormData();
        imageFile.append(`image`, imageInputFile);
        console.log({ imageInputFile, imageFile });

        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                "Content-Type": "application/octet-stream"
            }
        });
        console.log(res.data.data);
        return res.data;

    };

    return { imageUpload };
};

export default useImageUploader;