import React, { useEffect, useRef } from "react";
import { Button, Modal } from "antd";
import { PhoneOutlined } from "@ant-design/icons";

const VideoCallModal = ({
  visible,
  callState,
  localStream,
  remoteStream,
  onAccept,
  onReject,
  onEnd,
  caller,
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

  const renderCallContent = () => {
    switch (callState) {
      case "receiving":
        return (
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-lg font-medium">
              Incoming call from {caller?.name}
            </h3>
            <div className="flex gap-4">
              <Button
                type="primary"
                icon={<PhoneOutlined />}
                className="bg-green-500"
                onClick={onAccept}
              >
                Accept
              </Button>
              <Button danger icon={<PhoneOutlined />} onClick={onReject}>
                Reject
              </Button>
            </div>
          </div>
        );

      case "calling":
        return (
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-lg font-medium">Calling {caller?.name}...</h3>
            <Button danger icon={<PhoneOutlined />} onClick={onEnd}>
              End Call
            </Button>
          </div>
        );

      case "connected":
        return (
          <div className="flex flex-col h-full">
            {/* Remote Video (Large) */}
            <div className="relative flex-1 bg-gray-900 rounded-lg overflow-hidden">
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Local Video (Small) */}
              <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-800 rounded-lg overflow-hidden">
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4 pt-4">
              <Button danger icon={<PhoneOutlined />} onClick={onEnd}>
                End Call
              </Button>
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
      width={800}
      className="video-call-modal"
      bodyStyle={{
        height: callState === "connected" ? "600px" : "auto",
        padding: callState === "connected" ? "0" : "24px",
      }}
    >
      {renderCallContent()}
    </Modal>
  );
};

export default VideoCallModal;
