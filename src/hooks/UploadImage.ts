import { useEdgeStore } from '../lib/edgestore';

const Upload = async (file : File) => {
  const { edgestore } = useEdgeStore();
  const res = await edgestore.publicFiles.upload({
    file,
    onProgressChange: (progress) => {
      // you can use this to show a progress bar
      console.log(progress);
    },
  });
  return res.path;
}

export default function UploadFile(file: File){
    if (file) {
        const path  = Upload(file);
        return path;
    }
    return "failed"
}

