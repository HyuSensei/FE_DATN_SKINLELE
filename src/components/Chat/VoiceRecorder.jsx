import React, { useState, useRef, useEffect } from "react";
import { FaMicrophone, FaStop } from "react-icons/fa6";

const VoiceRecorder = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorder = useRef(null);
  const recordedChunks = useRef([]);
  const timerInterval = useRef(null);
  const audioStream = useRef(null);

  useEffect(() => {
    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
      if (
        mediaRecorder.current &&
        mediaRecorder.current.state === "recording"
      ) {
        mediaRecorder.current.stop();
      }
    };
  }, []);

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
      setIsRecording(false);
      clearInterval(timerInterval.current);
    }
  };

  const handleStopRecording = () => {
    const audioBlob = new Blob(recordedChunks.current, { type: "audio/webm" });
    const audioFile = new File([audioBlob], "voice-message.webm", {
      type: "audio/webm",
    });
    const audioUrl = URL.createObjectURL(audioBlob);
    onRecordingComplete(audioUrl, audioFile);

    // Dừng tất cả các track
    if (audioStream.current) {
      audioStream.current.getTracks().forEach((track) => track.stop());
      audioStream.current = null; // Xóa ref
    }

    setRecordingTime(0);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStream.current = stream; // Lưu stream vào ref
      mediaRecorder.current = new MediaRecorder(stream);
      recordedChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.current.push(event.data);
        }
      };

      mediaRecorder.current.onstop = handleStopRecording;

      mediaRecorder.current.start();
      setIsRecording(true);

      timerInterval.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center gap-2">
      {isRecording ? (
        <button
          onClick={stopRecording}
          className="p-2 hover:bg-gray-100 rounded-full text-red-500 transition-colors"
        >
          <FaStop size={20} />
        </button>
      ) : (
        <button
          onClick={startRecording}
          className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
        >
          <FaMicrophone size={20} />
        </button>
      )}
      {isRecording && (
        <div className="animate-pulse text-red-500 text-sm">
          {formatTime(recordingTime)}
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
