import React, { useState, useEffect, useRef } from "react";
import { Button, Input, Upload, Popover } from "antd";
import { IoClose } from "react-icons/io5";
import { FaSmile } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import Message from "./Message";
import { RiFolderVideoLine, RiImage2Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { LoadingMessage } from "./Loading";
import PreviewUpload from "./PreviewUpload";
import { HiGif } from "react-icons/hi2";
import { IoIosSend, IoMdImages } from "react-icons/io";
import VoiceRecorder from "./VoiceRecorder";
import {
  UPLOAD_SKINLELE_CHAT_PRESET,
  uploadFile,
} from "@/helpers/uploadCloudinary";

const ChatBox = ({
  conversation,
  onClose,
  messages = [],
  onSubmit,
  typeMessage,
  sender,
  receiver,
  isAuth = false,
  requiredLogin = "💬 Vui lòng đăng nhập để tiếp tục !",
  emptyMessageText = "💬 Bạn đang gặp phải vấn đề ?",
}) => {
  const [previewFiles, setPreviewFiles] = useState([]);
  const [showEmoji, setShowEmoji] = useState(false);
  const [openMedia, setOpenMedia] = useState(false);
  const messagesEndRef = useRef(null);
  const { userOnlines } = useSelector((state) => state.socket);
  const [isLoading, setIsLoading] = useState(true);
  const [inputMessage, setInputMessage] = useState({
    type: typeMessage,
    sender,
    receiver,
    content: "",
    attachments: [],
  });
  const [loadingUpload, setLoadingUpload] = useState(false);
  const isOnline = (userId) => {
    return userOnlines?.some((item) => item === userId);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const onEmojiClick = (emojiObject) => {
    setInputMessage((prev) => ({
      ...prev,
      content: prev.content + emojiObject.emoji,
    }));
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
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
    <div className="fixed bottom-8 right-8 z-50">
      <div className="animate-slideIn rounded-xl shadow-2xl w-[350px] sm:w-[400px] max-h-[600px] flex flex-col bg-white">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
              <img
                src={conversation.avatar.url}
                alt="Support Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-lg">{conversation.name}</h3>
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isOnline(conversation._id)
                      ? "bg-green-400 animate-pulse"
                      : "bg-yellow-200"
                  }`}
                ></span>
                <span className="text-sm text-blue-100">
                  {isOnline(conversation._id) ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          </div>
          <Button
            type="text"
            className="text-white hover:text-gray-200 hover:rotate-90 transition-all duration-300"
            onClick={onClose}
            icon={<IoClose className="text-2xl hover:text-gray-200" />}
          />
        </div>

        {/* Messages Area */}
        <div
          className={`flex-1 p-4 overflow-y-auto space-y-4 ${
            isAuth && messages.length > 0
              ? "bg-gray-50 min-h-[400px] max-h-[500px]"
              : "bg-[#eff1fe] min-h-[350px] max-h-[400px]"
          }`}
        >
          {isLoading ? (
            <LoadingMessage />
          ) : messages.length === 0 && previewFiles.length === 0 ? (
            <div className="space-y-2">
              <img
                src="https://res.cloudinary.com/dt8cdxgji/image/upload/v1735490423/upload-static-skinlele/ixxzdvyrg0serdipiynb.gif"
                alt="Empty-Chat"
              />
              <div className="text-center text-gray-600 italic">
                {!isAuth ? requiredLogin : emptyMessageText}
              </div>
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
            </>
          )}
          <div ref={messagesEndRef} />
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
                {/* <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                  <HiGif size={18} />
                </button> */}
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
    </div>
  );
};

export default ChatBox;
