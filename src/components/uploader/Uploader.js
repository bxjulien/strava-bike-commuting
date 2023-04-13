import { fetchTodayGpx } from "@/gpx.helper";
import { uploadActivity } from "@/strava.api";
import { useState } from "react";
import { env } from "../../../config";

const Uploader = () => {
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadedActivityId, setUploadedActivityId] = useState(null);

  const handleUpload = async () => {
    try {
      const file = await fetchTodayGpx(`/${env.ACTIVITY_FILENAME}.gpx`);

      setUploadStatus('Uploading...');

      const uploadedActivity = await uploadActivity(file);

      setUploadedActivityId(uploadedActivity.id);
      setUploadStatus('Successfully uploaded!');
    } catch (error) {
      setUploadStatus('Error uploading activity.');
    }
  };

  return (
    <div>
      <button onClick={handleUpload}>Upload Velotaf</button>
      <p>{uploadStatus}</p>
    </div>
  )
}

export default Uploader;