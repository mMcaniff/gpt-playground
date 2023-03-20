import { useState } from "react";
import { Task } from "./models/Task";

import transcribeText from "../../utils/text/transcribeText";
import generateTextualResponsive from "../../utils/open-ai/generateTextualResponse";

const useTasks = () => {
  const structure =
    '{["task":String, "id": number, "completed": boolean, "importance": high|medium|low]}';
  const [transcription, setTranscription] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [mediaRecorder, setMediaRecorder] =
    useState<MediaRecorder | null>(null);
  const [chunks, setChunks] = useState<Blob[]>([]);

  // ========== Recording >
  // ==================================================================================================>
  // ==================================================================================================>

  const handleStartRecording = async (): Promise<void> => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);
    setChunks([]);

    recorder.addEventListener("dataavailable", async (event) => {
      chunks.push(event.data);
      transcribeText(chunks, handleProccessText);
    });

    recorder.start();
  };

  const handleStopRecording = (): void => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  // ========== Methods >
  // ==================================================================================================>
  // ==================================================================================================>

  const handleProccessText = async (proccessedText: string): Promise<void> => {
    setTranscription(proccessedText);

    const taskList = await generateTextualResponsive(
      "please create or update the task list with this given input: " +
        proccessedText +
        " and this previous task list: " +
        JSON.stringify(tasks) +
        ". Return the list in this structure: " +
        structure
    );
    const taskListData = JSON.parse(taskList);
    setTasks(taskListData);
  };

  return {transcription, tasks, handleStartRecording, handleStopRecording };

};

export default useTasks;
