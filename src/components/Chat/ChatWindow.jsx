import React, { useEffect, useRef, useState } from "react";
import { Input, Avatar, Badge, Upload, Popover } from "antd";
import { useSelector } from "react-redux";
import { RiFolderVideoLine, RiImage2Line } from "react-icons/ri";
import { IoIosSend, IoMdImages } from "react-icons/io";
import VoiceRecorder from "@/components/Chat/VoiceRecorder";
import { FaSmile } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import PreviewUpload from "./PreviewUpload";
import Message from "./Message";
import { LoadingMessage } from "./Loading";
import {
  UPLOAD_SKINLELE_CHAT_PRESET,
  uploadFile,
} from "@/helpers/uploadCloudinary";

const ChatWindow = ({
  conversation,
  messages,
  typeMessage,
  sender,
  receiver,
  onSubmit,
  socket = null,
}) => {
  const [previewFiles, setPreviewFiles] = useState([]);
  const [showEmoji, setShowEmoji] = useState(false);
  const [openMedia, setOpenMedia] = useState(false);
  const { userOnlines } = useSelector((state) => state.socket);
  const [isLoading, setIsLoading] = useState(true);
  const messagesContainerRef = useRef(null);
  const [shouldScroll, setShouldScroll] = useState(true);
  const [inputMessage, setInputMessage] = useState({
    content: "",
    type: typeMessage,
    sender,
    receiver,
    attachments: [],
  });
  const [loadingUpload, setLoadingUpload] = useState(false);
  const isEmptyChat = messages.length === 0 && previewFiles.length === 0;
  const lastMessage = messages[messages.length - 1] || null;
  const isReceiverUnreanded =
    lastMessage?.receiver?._id === sender?._id &&
    conversation._id === receiver?._id &&
    !lastMessage?.isRead;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setInputMessage((prev) => ({
      ...prev,
      type: typeMessage,
      sender,
      receiver,
    }));
  }, [typeMessage, sender, receiver]);

  useEffect(() => {
    if (socket && isReceiverUnreanded && lastMessage) {
      socket.emit(
        "seenMessage",
        JSON.stringify({
          conversationId: lastMessage.conversation,
          sender: sender._id,
          receiver: receiver._id,
        })
      );
    }
  }, [socket, lastMessage]);

  useEffect(() => {
    if (shouldScroll && messagesContainerRef.current) {
      const scrollContainer = messagesContainerRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages, shouldScroll]);

  useEffect(() => {
    if (messages.length > 0 && !isLoading) {
      requestAnimationFrame(() => {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTop =
            messagesContainerRef.current.scrollHeight;
        }
      });
    }
  }, [messages, isLoading]);

  const isOnline = () => {
    return userOnlines?.some((item) => item === conversation._id);
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setShouldScroll(isNearBottom);
  };

  const onEmojiClick = (emojiObject) => {
    setInputMessage((prev) => ({
      ...prev,
      content: prev.content + emojiObject.emoji,
    }));
  };

  const handleUpload = async (info, type) => {
    const file = info.file;
    if (file.status === "done") {
      const newFile = {
        uid: file.uid,
        name: file.name,
        status: "done",
        url: URL.createObjectURL(file.originFileObj),
        type,
        file: file.originFileObj,
      };
      setPreviewFiles((prev) => [...prev, newFile]);

      setInputMessage({
        ...inputMessage,
        attachments: [
          ...(inputMessage.attachments || []),
          {
            url: newFile.url,
            publicId: newFile.uid,
            type: type,
          },
        ],
      });
      setShouldScroll(true);
    }
  };

  const handleRecordingComplete = (audioUrl, audioFile) => {
    const newAudio = {
      uid: Date.now().toString(),
      name: "Voice Message",
      status: "done",
      url: audioUrl,
      type: "audio",
      file: audioFile,
    };
    setPreviewFiles((prev) => [...prev, newAudio]);
    setShouldScroll(true);
  };

  const handleRemoveFile = (uid) => {
    setPreviewFiles((prev) => prev.filter((file) => file.uid !== uid));
  };

  const handleSendMessage = async () => {
    try {
      if (inputMessage.content.trim() || previewFiles.length > 0) {
        let uploadedData;
        if (previewFiles.length > 0) {
          setLoadingUpload(true);
          uploadedData = await Promise.all(
            previewFiles.map(async (item) => {
              if (item.file && item.type) {
                const result = await uploadFile({
                  file: item.file,
                  type: UPLOAD_SKINLELE_CHAT_PRESET,
                });
                if (result && result.secure_url && result.public_id) {
                  return {
                    url: result.secure_url,
                    publicId: result.public_id,
                    type: item.type,
                  };
                }
              }
              return null;
            })
          );
        }

        const newMessage = {
          ...inputMessage,
          attachments: uploadedData || [],
        };

        onSubmit(newMessage);
        setInputMessage((prev) => ({
          ...prev,
          content: "",
          attachments: [],
        }));
        setPreviewFiles([]);
        setShouldScroll(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingUpload(false);
    }
  };

  const contentUpload = (
    <div className="space-y-1">
      <Upload
        customRequest={({ onSuccess }) => onSuccess?.("OK")}
        onChange={(info) => handleUpload(info, "image")}
        accept="image/*"
        showUploadList={false}
      >
        <div className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors flex items-center gap-1 cursor-pointer">
          <RiImage2Line size={24} /> Tải ảnh lên
        </div>
      </Upload>
      <Upload
        accept="video/*"
        showUploadList={false}
        customRequest={({ onSuccess }) => onSuccess?.("OK")}
        onChange={(info) => handleUpload(info, "video")}
      >
        <div className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors flex items-center gap-1 cursor-pointer">
          <RiFolderVideoLine size={24} /> Tải video lên
        </div>
      </Upload>
    </div>
  );

  return (
    <div className="h-full flex flex-col">
      <div className="py-4">
        <div className="flex items-center gap-3 shadow-md p-4">
          <Badge dot status={isOnline() ? "success" : "default"}>
            <Avatar
              src={conversation.avatar.url}
              size={54}
              className="bg-gradient-to-r from-blue-500 to-blue-600"
            />
          </Badge>
          <div>
            <h3 className="font-medium text-gray-900">{conversation.name}</h3>
            <span
              className={`text-sm ${
                isOnline() ? "text-green-500" : "text-gray-500"
              }`}
            >
              {isOnline() ? "Đang hoạt động" : "Ngoại tuyến"}
            </span>
          </div>
        </div>
      </div>

      <div
        ref={messagesContainerRef}
        className={`flex-1 overflow-y-auto p-4 bg-white hide-scrollbar-custom`}
        onScroll={handleScroll}
      >
        {isLoading ? (
          <LoadingMessage />
        ) : isEmptyChat ? (
          <div className="flex flex-col items-center justify-center h-full">
            <img
              src="https://res.cloudinary.com/dt8cdxgji/image/upload/v1735490492/upload-static-skinlele/mnxtiwl6e2ukw7co11xi.gif"
              alt="Empty-Chat"
            />
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <Message
                key={msg._id}
                message={msg}
                sender={sender}
                isClinic={true}
              />
            ))}
            {previewFiles.length > 0 && (
              <PreviewUpload files={previewFiles} onRemove={handleRemoveFile} />
            )}
          </div>
        )}
      </div>

      <div className="p-6 bg-white border-t mt-auto">
        <div className="flex gap-2 items-center">
          <div className="relative">
            <div className="flex items-center gap-1">
              <VoiceRecorder onRecordingComplete={handleRecordingComplete} />
              <Popover
                open={openMedia}
                placement="topLeft"
                content={contentUpload}
                title="Phương tiện"
                onOpenChange={() => setOpenMedia(!openMedia)}
                trigger="click"
              >
                <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                  <IoMdImages size={24} />
                </button>
              </Popover>
              <button
                onClick={() => setShowEmoji((prev) => !prev)}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
              >
                <FaSmile size={20} />
              </button>
            </div>
            {showEmoji && (
              <div className="absolute bottom-12 left-0 z-50">
                <EmojiPicker
                  onEmojiClick={onEmojiClick}
                  width={300}
                  height={400}
                />
              </div>
            )}
          </div>
          <Input
            disabled={loadingUpload || isLoading}
            size="large"
            placeholder={loadingUpload ? "Đang gửi..." : "Nhập tin nhắn..."}
            value={inputMessage.content}
            onChange={(e) =>
              setInputMessage((prev) => ({
                ...prev,
                content: e.target.value,
              }))
            }
            className="rounded-full bg-gray-50 hover:bg-gray-100 focus:bg-white transition-all duration-300"
            onPressEnter={handleSendMessage}
          />
          <button
            onClick={handleSendMessage}
            disabled={
              (!inputMessage.content.trim() && previewFiles.length === 0) ||
              loadingUpload ||
              isLoading
            }
            className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors cursor-pointer disabled:opacity-50"
          >
            <IoIosSend size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
