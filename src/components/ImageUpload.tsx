// components/ImageUploader.tsx
import { useState } from "react";

const ImageUploader = () => {
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();

  const handleUpload = () => {
    console.log(selectedFile);
    console.log("ok");
  };

  return (
    <div>
      <div>
        <div className="ml-0">
          <label className="flex  items-center cursor-pointer p-2 ps-0">
            <p
              //   onClick={handleUpload}
              // disabled={uploading}
              // style={{ opacity: uploading ? ".5" : "1" }}

              className="bg-[#FF6B35] text-white rounded-md p-2 px-4 text-md  text-center"
            >
              Unggah
            </p>
            <input
              id="gambar"
              type="file"
              hidden
              onChange={({ target }) => {
                if (target.files) {
                  const file = target.files[0];
                  setSelectedImage(URL.createObjectURL(file));
                  setSelectedFile(file);
                }
              }}
            />
            <div className=" w-40 ml-1 file:aspect-video rounded flex items-center justify-center  cursor-pointer text-md text-[#B7B7B7] ">
              {selectedImage ? (
                <img src={selectedImage} alt="" />
              ) : (
                <span>Unggah Gambar</span>
              )}
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
