import React, { useState, useEffect, useRef } from "react";
import { Button, Input, Upload, Popover } from "antd";
import { BsSend } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { FaSmile } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import Message from "./Message";
import { RiAttachment2, RiFolderVideoLine, RiImage2Line } from "react-icons/ri";
import { useSelector } from "react-redux";

const ChatBox = ({ conversation, onClose, messages, onSubmit }) => {
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [openMedia, setOpenMedia] = useState(false);
  const messagesEndRef = useRef(null);
  const { userOnlines } = useSelector((state) => state.socket);
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const isOnline = (userId) => {
    return userOnlines?.some((item) => item === userId);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onEmojiClick = (emojiObject) => {
    setMessage((prev) => prev + emojiObject.emoji);
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        type: "User_Admin",
        content: message,
        sender: {
          _id: userInfo._id,
          role: "User",
        },
        receiver: {
          _id: conversation._id,
          role: "Admin",
        },
        attachments: [],
      };

      onSubmit(newMessage);
      setMessage("");
    }
  };

  const contentUpload = (
    <div className="space-y-1">
      <Upload accept="image/*" showUploadList={false}>
        <div className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors flex items-center gap-1 cursor-pointer">
          <RiImage2Line size={20} /> Tải ảnh lên
        </div>
      </Upload>
      <Upload accept="video/*" showUploadList={false}>
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
          className={`flex-1 p-4 overflow-y-auto ${
            messages.length === 0
              ? "bg-[#eff1fe] min-h-[300px] max-h-[350px] "
              : "bg-gray-50 min-h-[400px] max-h-[500px]"
          } space-y-2`}
        >
          {messages.length === 0 && (
            <div className="space-y-2">
              <img
                src="https://res.cloudinary.com/dt8cdxgji/image/upload/v1735490423/upload-static-skinlele/ixxzdvyrg0serdipiynb.gif"
                alt="Empty-Chat"
              />
              <div className="text-center text-gray-600 italic">
                {isAuthenticated
                  ? "💬 Bạn đang gặp phải vấn đề ?"
                  : "💬 Vui lòng đăng nhập để tiếp tục !"}
              </div>
            </div>
          )}
          {messages.map((msg) => (
            <Message key={msg._id} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-100 bg-white rounded-b-xl">
          <div className="flex gap-2 items-center">
            <div className="relative">
              <div className="flex items-center gap-2">
                <Popover
                  open={openMedia}
                  placement="topLeft"
                  content={contentUpload}
                  title="Phương tiện"
                  onOpenChange={() => setOpenMedia(!openMedia)}
                >
                  <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                    <RiAttachment2 size={20} />
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
              placeholder="Nhập tin nhắn..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="rounded-full bg-gray-50 hover:bg-gray-100 focus:bg-white transition-all duration-300"
              onPressEnter={handleSendMessage}
              suffix={
                <Button
                  type="text"
                  className={`text-blue-500 hover:text-blue-600 hover:scale-110 transition-all duration-300
                    ${message.trim() ? "opacity-100" : "opacity-50"}`}
                  disabled={!message.trim()}
                  onClick={handleSendMessage}
                  icon={<BsSend className="text-xl" />}
                />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
