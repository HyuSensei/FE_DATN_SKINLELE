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
import { UPLOAD_SKINLELE_CHAT_PRESET, uploadFile } from "@/helpers/uploadCloudinary";

const ChatWindow = ({
  conversation,
  messages,
  typeMessage,
  sender,
  receiver,
  onSubmit,
}) => {
  const [previewFiles, setPreviewFiles] = useState([]);
  const [showEmoji, setShowEmoji] = useState(false);
  const [openMedia, setOpenMedia] = useState(false);
  const messagesEndRef = useRef(null);
  const { userOnlines } = useSelector((state) => state.socket);
  const [isLoading, setIsLoading] = useState(true);
  const [inputMessage, setInputMessage] = useState({
    content: "",
    type: typeMessage,
    sender,
    receiver,
    attachments: [],
  });
  const [loadingUpload, setLoadingUpload] = useState(false);
  const isOnline = () => {
    return userOnlines?.some((item) => item === conversation._id);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, isLoading]);

  const onEmojiClick = (emojiObject) => {
    setInputMessage((prev) => ({
      ...prev,
      content: prev.content + emojiObject.emoji,
    }));
  };

  const handleUpload = (info, type) => {
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
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleRemoveFile = (uid) => {
    setPreviewFiles((prev) => prev.filter((file) => file.uid !== uid));
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
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingUpload(false);
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
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
          <RiImage2Line size={20} /> Tải ảnh lên
        </div>
      </Upload>
      <Upload
        accept="video/*"
        showUploadList={false}
        customRequest={({ onSuccess }) => onSuccess?.("OK")}
        onChange={(info) => handleUpload(info, "video")}
      >
        <div className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors flex items-center gap-1 cursor-pointer">
          <RiFolderVideoLine size={20} /> Tải video lên
        </div>
      </Upload>
    </div>
  );

  return (
    <div className={`h-full flex flex-col ${messages.length === 0 && previewFiles.length === 0 ? "bg-[#fdfdfd]" : "bg-gray-50"} border-l-2`}>
      <div className="p-4 bg-white shadow-lg">
        <div className="flex items-center gap-3">
          <Badge dot status={isOnline() ? "success" : "default"}>
            <Avatar src={conversation.avatar.url} size={40} />
          </Badge>
          <div>
            <h3 className="font-medium text-gray-900">{conversation.name}</h3>
            <span className="text-sm text-gray-500">
              {isOnline() ? "Đang hoạt động" : "Không hoạt động"}
            </span>
          </div>
        </div>
      </div>
      <div
        className="flex-1 overflow-y-auto p-4"
      >
        {isLoading ? (
          <LoadingMessage />
        ) : messages.length === 0 && previewFiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <img
              src={"https://res.cloudinary.com/dt8cdxgji/image/upload/v1735490492/upload-static-skinlele/mnxtiwl6e2ukw7co11xi.gif"}
              alt="Empty-Chat"
            />
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <Message key={msg._id} message={msg} sender={sender} />
            ))}
            {previewFiles.length > 0 && (
              <div className="flex justify-end">
                <div className="w-full">
                  <PreviewUpload
                    files={previewFiles}
                    onRemove={handleRemoveFile}
                  />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-100 bg-white rounded-b-xl">
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
              >
                <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                  <IoMdImages size={20} />
                </button>
              </Popover>
              <button
                onClick={() => setShowEmoji((prev) => !prev)}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
              >
                <FaSmile size={18} />
              </button>
            </div>
            {showEmoji && (
              <div className="absolute bottom-12 left-0 z-50 animate-fadeIn">
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
            size="middle"
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
              !inputMessage.content.trim() || loadingUpload || isLoading
            }
            className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors cursor-pointer"
          >
            <IoIosSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
