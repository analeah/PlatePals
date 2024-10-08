import express from "express";
import {
  setUpDirectories,
  downloadRawVideo,
  uploadProcessedVideo,
  deleteRawVideo,
  deleteProcessedVideo,
  convertVideo,
} from "./storage";
import { isVideoNew, setVideo } from "./firestore";


// Create the local directories for videos
setUpDirectories();

const app = express();
app.use(express.json())

// Process a video file from Cloud Storage into 360p
app.post('/process-video', async (req, res) => {
  // Get the bucket and filename from the Cloud Pub/Sub message
  let data;
  try {
    const message = Buffer.from(req.body.message.data, 'base64').toString('utf8');
    data = JSON.parse(message);
    if (!data.name) {
      throw new Error('Invalid message payload received.');
    }
  } catch (error) {
    console.error(error);
    return res.status(400).send('Bad Request: missing filename.')
  }

  const inputFileName = data.name; // Format of <UID>-<DATE>.<EXTENSION>
  const outputFileName = `processed-${inputFileName}`;
  const videoId = inputFileName.split('.')[0];

  if (!isVideoNew(videoId)) {
    return res.status(400).send('Bad Resquest: video already processing or processed');
  } else {
    await setVideo(videoId, {
      id: videoId,
      uid: videoId.split('-')[0],
      status: 'processing'
    });
  }

  // Download the raw video from Cloud Storage
  await downloadRawVideo(inputFileName);

  // Convert the video to 360p
  try {
    await convertVideo(inputFileName, outputFileName)
  } catch (err) {
    Promise.all([
      deleteRawVideo(inputFileName),
      deleteProcessedVideo(outputFileName)
    ]);
    console.error(err);
    return res.status(500).send(`Processing failed`);
  }

  // Upload the processed video to Cloud Storage
  await uploadProcessedVideo(outputFileName);

  setVideo(videoId, {
    status: 'processed',
    filename: outputFileName
  }
  );

  await Promise.all([
    deleteRawVideo(inputFileName),
    deleteProcessedVideo(outputFileName)
  ]);

  return res.status(200).send('Processing finished successfully')
});

const port = process.env.PORT || 8080 || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});