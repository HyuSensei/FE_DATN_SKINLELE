import { useCallback, useEffect, useRef, useState } from "react";

const useVideoCall = (socket, userId) => {
  const [callState, setCallState] = useState("idle"); // idle, calling, receiving, connected
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [callData, setCallData] = useState(null);
  const peerConnection = useRef(null);

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
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video,
      });
      setLocalStream(stream);
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
      if (localStream) {
        localStream.getTracks().forEach((track) => {
          pc.addTrack(track, localStream);
        });
      }

      // Handle incoming tracks
      pc.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
      };

      // Handle ICE candidates
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("iceCandidate", {
            to: callData?.to || callData?.from,
            from: userId,
            candidate: event.candidate,
          });
        }
      };

      peerConnection.current = pc;
      return pc;
    } catch (error) {
      console.error("Error creating peer connection:", error);
      throw error;
    }
  }, [localStream, socket, userId, callData]);

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

      socket.emit("initiateCall", {
        to: receiverId,
        from: userId,
        offer,
        conversationId,
      });
    } catch (error) {
      console.error("Error starting call:", error);
      cleanup();
    }
  };

  // Nhận cuộc gọi
  const acceptCall = async () => {
    try {
      await initLocalStream();
      const pc = await createPeerConnection();

      // Set remote description (offer)
      await pc.setRemoteDescription(callData.offer);

      // Create and send answer
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      socket.emit("acceptCall", {
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
    socket.emit("rejectCall", {
      to: callData.from,
      from: userId,
    });
    cleanup();
  };

  // Kết thúc cuộc gọi
  const endCall = () => {
    socket.emit("endCall", {
      to: callData?.to || callData?.from,
      from: userId,
    });
    cleanup();
  };

  // Dọn dẹp resources
  const cleanup = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
    }
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }
    setRemoteStream(null);
    setCallData(null);
    setCallState("idle");
  };

  const requestMediaPermissions = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      return true;
    } catch (error) {
      console.error("Media permissions denied:", error);
      return false;
    }
  };

  useEffect(() => {
    // Handle incoming call
    socket.on("incomingCall", (data) => {
      setCallData(data);
      setCallState("receiving");
    });

    // Handle call accepted
    socket.on("callAccepted", async (data) => {
      const pc = peerConnection.current;
      if (pc) {
        await pc.setRemoteDescription(data.answer);
        setCallState("connected");
      }
    });

    // Handle call rejected
    socket.on("callRejected", () => {
      cleanup();
    });

    // Handle call ended
    socket.on("callEnded", () => {
      cleanup();
    });

    // Handle ICE candidates
    socket.on("iceCandidate", async (data) => {
      const pc = peerConnection.current;
      if (pc) {
        await pc.addIceCandidate(data.candidate);
      }
    });

    return () => {
      cleanup();
      socket.off("incomingCall");
      socket.off("callAccepted");
      socket.off("callRejected");
      socket.off("callEnded");
      socket.off("iceCandidate");
    };
  }, [socket]);

  return {
    callState,
    localStream,
    remoteStream,
    callData,
    startCall,
    acceptCall,
    rejectCall,
    endCall,
    requestMediaPermissions,
  };
};

export default useVideoCall;
