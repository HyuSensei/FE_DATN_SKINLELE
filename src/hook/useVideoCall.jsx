import { useCallback, useEffect, useRef, useState } from "react";

const useVideoCall = (socket, userId) => {
  const [callState, setCallState] = useState("idle"); // idle, calling, receiving, connected
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [callData, setCallData] = useState(null);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);

  const peerConnection = useRef(null);
  const localStreamRef = useRef(null);

  // Cấu hình STUN/TURN servers
  const servers = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
  };

  // Khởi tạo media stream
  const initLocalStream = async (video = true) => {
    try {
      // Dừng stream cũ nếu có
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: video
          ? {
              width: { ideal: 1280 },
              height: { ideal: 720 },
            }
          : false,
      });

      localStreamRef.current = stream;
      setLocalStream(stream);
      setVideoEnabled(video);
      setAudioEnabled(true);
      return stream;
    } catch (error) {
      console.error("Error accessing media devices:", error);
      throw error;
    }
  };

  // Khởi tạo peer connection
  const createPeerConnection = useCallback(async () => {
    try {
      const pc = new RTCPeerConnection(servers);

      // Add local stream tracks
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => {
          pc.addTrack(track, localStreamRef.current);
        });
      }

      // Handle incoming tracks
      pc.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
      };

      // Handle ICE candidates
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socket?.emit("iceCandidate", {
            to: callData?.to || callData?.from,
            from: userId,
            candidate: event.candidate,
          });
        }
      };

      // Handle connection state changes
      pc.onconnectionstatechange = () => {
        if (
          pc.connectionState === "disconnected" ||
          pc.connectionState === "failed"
        ) {
          cleanup();
        }
      };

      peerConnection.current = pc;
      return pc;
    } catch (error) {
      console.error("Error creating peer connection:", error);
      throw error;
    }
  }, [localStreamRef.current, socket, userId, callData]);

  // Dọn dẹp resources
  const cleanup = useCallback(() => {
    // Dừng và xóa local stream
    if (localStreamRef.current) {
      const tracks = localStreamRef.current.getTracks();
      tracks.forEach((track) => {
        track.stop();
        localStreamRef.current.removeTrack(track);
      });
      localStreamRef.current = null;
    }
    setLocalStream(null);

    // Dừng remote stream
    if (remoteStream) {
      const tracks = remoteStream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      setRemoteStream(null);
    }

    // Đóng peer connection
    if (peerConnection.current) {
      // Xóa tất cả tracks
      const senders = peerConnection.current.getSenders();
      senders.forEach((sender) => {
        if (sender.track) {
          sender.track.stop();
        }
      });

      peerConnection.current.close();
      peerConnection.current = null;
    }

    setCallData(null);
    setCallState("idle");
    setVideoEnabled(true);
    setAudioEnabled(true);
  }, [remoteStream]);

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  // Bật/tắt video
  const toggleVideo = useCallback(() => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setVideoEnabled(videoTrack.enabled);
      }
    }
  }, []);

  // Bật/tắt audio
  const toggleAudio = useCallback(() => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setAudioEnabled(audioTrack.enabled);
      }
    }
  }, []);

  // Bắt đầu cuộc gọi
  const startCall = async (receiverId, conversationId, withVideo = true) => {
    try {
      await initLocalStream(withVideo);
      const pc = await createPeerConnection();
      setCallState("calling");
      setCallData({ to: receiverId, conversationId });

      // Create and send offer
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      socket?.emit("initiateCall", {
        to: receiverId,
        from: userId,
        offer,
        conversationId,
        withVideo,
      });
    } catch (error) {
      console.error("Error starting call:", error);
      cleanup();
    }
  };

  // Nhận cuộc gọi
  const acceptCall = async () => {
    try {
      await initLocalStream(true);
      const pc = await createPeerConnection();

      await pc.setRemoteDescription(callData.offer);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      socket?.emit("acceptCall", {
        to: callData.from,
        from: userId,
        answer,
      });

      setCallState("connected");
    } catch (error) {
      console.error("Error accepting call:", error);
      cleanup();
    }
  };

  // Từ chối cuộc gọi
  const rejectCall = () => {
    socket?.emit("rejectCall", {
      to: callData.from,
      from: userId,
    });
    cleanup();
  };

  // Kết thúc cuộc gọi
  const endCall = () => {
    socket?.emit("endCall", {
      to: callData?.to || callData?.from,
      from: userId,
    });
    cleanup();
  };

  useEffect(() => {
    socket?.on("incomingCall", (data) => {
      setCallData(data);
      setCallState("receiving");
    });

    socket?.on("callAccepted", async (data) => {
      const pc = peerConnection.current;
      if (pc) {
        await pc.setRemoteDescription(data.answer);
        setCallState("connected");
      }
    });

    socket?.on("callRejected", cleanup);
    socket?.on("callEnded", cleanup);

    socket?.on("iceCandidate", async (data) => {
      const pc = peerConnection.current;
      if (pc) {
        try {
          await pc.addIceCandidate(data.candidate);
        } catch (err) {
          console.error("Error adding ICE candidate:", err);
        }
      }
    });

    return () => {
      cleanup();
      socket?.off("incomingCall");
      socket?.off("callAccepted");
      socket?.off("callRejected");
      socket?.off("callEnded");
      socket?.off("iceCandidate");
    };
  }, [socket, cleanup]);

  return {
    callState,
    localStream,
    remoteStream,
    callData,
    videoEnabled,
    audioEnabled,
    startCall,
    acceptCall,
    rejectCall,
    endCall,
    toggleVideo,
    toggleAudio,
  };
};

export default useVideoCall;
