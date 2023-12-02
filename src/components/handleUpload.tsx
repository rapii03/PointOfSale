// components/ImageUploader.tsx
import { useState } from "react";
import axios from "axios";
import Link from "next/link";

interface ImageUploaderProps {
  dirs: string[];
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ dirs }) => {
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();

  const handleUpload = async () => {
    setUploading(true);
    try {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append("myImage", selectedFile);
      const { data } = await axios.post("/api/image", formData);
      console.log(data);
    } catch (error: any) {
      console.log(error.response?.data);
    }
    setUploading(false);
  };

  return (
    <div className="w-1/2 ">
      <div className="">
        <div className="p-2 ps-0 flex items-center gap-3">
          <button
            onClick={handleUpload}
            disabled={uploading}
            style={{ opacity: uploading ? ".5" : "1" }}
            className="bg-[#FF6B35] text-white rounded-md p-2 px-4 text-md"
          >
            {uploading ? "Unggah" : "Unggah"}
          </button>
          <label>
            <input
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
            <div className=" w-40 file:aspect-auto rounded flex items-center justify-center  cursor-pointer text-md text-[#B7B7B7]">
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
