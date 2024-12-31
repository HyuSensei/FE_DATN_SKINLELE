import { capitalizeFirstLetter } from '@/helpers/formatDate'
import { ChatActions } from '@/redux/chat/chat.slice'
import { Avatar, Badge } from 'antd'
import dayjs from '@utils/dayjsTz'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaCircleDot } from 'react-icons/fa6'

const CustomerItem = ({ customer, conversation }) => {
    const { userOnlines } = useSelector((state) => state.socket)
    const { adminInfo } = useSelector((state) => state.auth)
    const { openChat } = useSelector((state) => state.chat)
    const dispatch = useDispatch()
    const isOnline = (userId) => {
        return userOnlines?.some((item) => item === userId);
    };
    const isOwner = customer._id === adminInfo._id
    const isReadOwner = conversation?.lastMessage?.sender === adminInfo?._id

    const handleSelectConversation = () => {
        dispatch(ChatActions.setCustomerConversationSelected({
            ...customer,
            conversationId: conversation?._id || ""
        }))
        dispatch(ChatActions.setOpenChatAll({
            ...openChat,
            isChatCustomer:true,
            isConversationCustomer:false
        }))
    };

    return (
        <div
            className={`flex justify-between cursor-pointer ${conversation && !isReadOwner ? "bg-gray-100" : ""
                } px-4 py-6`}
            onClick={handleSelectConversation}
        >
            <div className="flex items-center space-x-3 w-full">
                <div className="relative">
                    <Badge dot status={isOnline(customer._id) ? "success" : "warning"}>
                        <Avatar
                            src={customer.avatar.url}
                            size={48}
                            className="bg-gradient-to-r from-blue-500 to-blue-600"
                        />
                    </Badge>
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <span className="font-medium">{customer.name}</span>
                    </div>
                    {
                        !conversation && <div className="text-gray-400">Chưa có tin nhắn !</div>
                    }
                    {conversation && conversation.lastMessage && (
                        <div className="py-1 ">
                            <p
                                className={`text-sm line-clamp-1 truncate ${!isReadOwner ? "text-gray-600 font-medium" : "text-gray-500 "
                                    }`}
                            >
                                {isOwner ? "Bạn:" : ""}{" "}
                                {!conversation.lastMessage.content &&
                                    conversation.lastMessage.attachments.length > 0
                                    ? "Đã gửi 1 phương tiện"
                                    : conversation.lastMessage.content}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                {capitalizeFirstLetter(
                                    dayjs(conversation.lastMessage.createdAt).fromNow()
                                )}
                            </p>
                        </div>
                    )}
                </div>
            </div>
            {conversation && conversation.lastMessage && !isReadOwner && (
                <FaCircleDot className="animate-ping text-sky-400 pr-1 text-lg" />
            )}
        </div>
    )
}

export default CustomerItem
