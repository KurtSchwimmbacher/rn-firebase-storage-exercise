// TODO: Upload Image to Buckets

import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "../firebase"

export const uploadImageToBucket = async (imageUri: string, imageName: string) => {
    // create our storage reference
    // where we upload the image
    const storageRef = ref(storage, `images/${imageName}`)

    // convert to blob (binary large object)
    const blob = await new Promise<Blob>((resolve,reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.onload = () =>{
            resolve(xhr.response);
        }
        xhr.onerror = () =>{
            reject(new Error ('failed to convert image to blob'));
        }
        xhr.responseType = 'blob';
        xhr.open("GET", imageUri, true); //opening the image URI location
        xhr.send(null);
    });

    // trying to upload our blob to our storage reference
    const uploadResult = await uploadBytes(storageRef, blob);

    return await getDownloadURL(storageRef); // return the download URL of the uploaded image
}