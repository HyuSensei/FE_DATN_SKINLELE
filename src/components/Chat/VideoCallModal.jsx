import React, { useEffect, useRef } from "react";
import { Button, Modal } from "antd";
import {
  BiSolidPhoneCall,
  BiSolidVideo,
  BiSolidVideoOff,
} from "react-icons/bi";
import { MdCallEnd } from "react-icons/md";
import { FaMicrophoneSlash, FaMicrophone } from "react-icons/fa";

const VideoCallModal = ({
  visible,
  callState,
  localStream,
  remoteStream,
  onAccept,
  onReject,
  onEnd,
  caller,
  videoEnabled = true,
  onToggleVideo,
  audioEnabled = true,
  onToggleAudio,
}) => {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  useEffect(() => {
    if (!visible) {
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = null;
      }
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = null;
      }
    }
  }, [visible]);

  const handleCancel = () => {
    if (callState === "receiving") {
      onReject();
    } else {
      onEnd();
    }
  };

  const renderCallContent = () => {
    switch (callState) {
      case "receiving":
        return (
          <div className="flex flex-col items-center gap-6 p-8">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500 animate-pulse">
              <img
                src={
                  caller?.avatar?.url ||
                  `https://avatar.iran.liara.run/username?username=${caller?.name}`
                }
                alt={caller?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">{caller?.name}</h3>
              <p className="text-gray-500">Đang gọi đến...</p>
            </div>
            <div className="flex gap-6">
              <Button
                type="primary"
                size="large"
                shape="circle"
                className="bg-green-500 hover:bg-green-600"
                icon={<BiSolidPhoneCall className="text-xl" />}
                onClick={onAccept}
              />
              <Button
                danger
                size="large"
                shape="circle"
                icon={<MdCallEnd className="text-xl" />}
                onClick={handleCancel}
              />
            </div>
          </div>
        );

      case "calling":
        return (
          <div className="flex flex-col items-center gap-6 p-8">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500 animate-pulse">
              <img
                src={caller?.avatar?.url || "/default-avatar.png"}
                alt={caller?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">{caller?.name}</h3>
              <p className="text-gray-500">Đang gọi...</p>
            </div>
            <Button
              danger
              size="large"
              shape="circle"
              icon={<MdCallEnd className="text-xl" />}
              onClick={handleCancel}
            />
          </div>
        );

      case "connected":
        return (
          <div className="flex flex-col h-[600px] bg-gray-900 rounded-lg overflow-hidden">
            {/* Remote Video (Large) */}
            <div className="relative flex-1">
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Local Video (Small) */}
              <div className="absolute bottom-4 right-4 w-48 h-36 bg-black rounded-lg overflow-hidden shadow-lg border-2 border-white">
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover mirror"
                />
              </div>

              {/* Controls Overlay */}
              <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-black/70 to-transparent">
                <div className="flex justify-center gap-6">
                  <Button
                    type={audioEnabled ? "default" : "primary"}
                    size="large"
                    shape="circle"
                    className="bg-white/10 border-0 hover:bg-white/20"
                    icon={
                      audioEnabled ? (
                        <FaMicrophone className="text-xl text-white" />
                      ) : (
                        <FaMicrophoneSlash className="text-xl text-white" />
                      )
                    }
                    onClick={onToggleAudio}
                  />
                  <Button
                    danger
                    size="large"
                    shape="circle"
                    icon={<MdCallEnd className="text-2xl" />}
                    onClick={handleCancel}
                  />
                  <Button
                    type={videoEnabled ? "default" : "primary"}
                    size="large"
                    shape="circle"
                    className="bg-white/10 border-0 hover:bg-white/20"
                    icon={
                      videoEnabled ? (
                        <BiSolidVideo className="text-xl text-white" />
                      ) : (
                        <BiSolidVideoOff className="text-xl text-white" />
                      )
                    }
                    onClick={onToggleVideo}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Modal
      open={visible}
      footer={null}
      closable={false}
      destroyOnClose={true}
      maskClosable={false}
      onCancel={handleCancel}
    >
      {renderCallContent()}
    </Modal>
  );
};

export default VideoCallModal;
