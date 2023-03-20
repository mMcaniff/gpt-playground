import React from "react";
import { Task } from "./models/Task";
import useTasks from "./useTasks";

import "./TasksPage.css";

const Tasks: React.FC = () => {
  const {transcription, tasks, handleStartRecording, handleStopRecording } = useTasks();
  
  // ========== Rendering >
  // ==================================================================================================>
  // ==================================================================================================>

  function render(): React.ReactElement {
    return (
      <div style={{ marginTop: 100 }}>
        {renderStartStopRecordingButtons()}
        {renderTranscription()}
        {renderTasks()}
      </div>
    );
  }

  function renderStartStopRecordingButtons(): React.ReactElement {
    return (
      <>
        <button onClick={handleStartRecording}>Start Recording</button>
        <button onClick={handleStopRecording}>Stop Recording</button>
      </>
    );
  }

  function renderTranscription(): React.ReactElement {
    return <p>{transcription}</p>;
  }

  function renderTasks(): React.ReactElement {
    return (
      <div>
        <ul>
          {tasks.map((task: Task, index: number) => (
            <li key={index} style={{ listStyleType: "none" }}>
              {index + 1}. {task.task} - {task.importance}{" "}
              {task.completed ? (
                <span style={{ color: "green" }}>&#10003;</span>
              ) : (
                <span style={{ color: "red" }}>&#10007;</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return render();
}

export default Tasks;
