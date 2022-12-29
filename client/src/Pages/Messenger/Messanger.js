import React, { useContext, useEffect, useRef, useState } from "react";
import "./Messenger.scss";

import TopBar from "../../Components/TopBar/TopBar";
import Conversation from "../../Components/Converstation/Conversation";
import Message from "../../Components/Message/Message";
import ChatOnline from "../../Components/ChatOnline/ChatOnline";

import axios from "axios";
import { useSelector } from "react-redux";
import { User_Conversations } from "../../Api/ConversationsCall";

import { Add_Message, User_Messages } from "../../Api/MessagesCall";
import { io } from "socket.io-client";

const Messenger = () => {
  const scrollRef = useRef();

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null); // Get_Conversation
  const [messages, setMessages] = useState([]);

  // console.log(messages);
  const user = useSelector((state) => state.AuthReducer.user);

  const socket = useRef();
  // console.log(socket);
  const [newMessage, setNewMessage] = useState("");
  // const [socket, setSocket] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineusers, setOnlineusers] = useState([]);
  const [noOfMessages, setNoOfMessages] = useState([]);

  useEffect(() => {
    socket.current = io("ws://localhost:3001");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      // console.log({ users });
      setOnlineusers(
        user?.followings?.filter((f) => users?.some((u) => u.userId === f))
      );
    });
  }, [user]);

  // console.log("onlineusers", onlineusers);

  // !----------------------------- GET_CONVERSATIONS
  useEffect(() => {
    const Get_Conversations = async () => {
      try {
        const { data } = await User_Conversations(user._id);
        setConversations(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    Get_Conversations();
  }, [user._id]);

  // !---------------------------- GET_MESSAGES
  // console.log(conversations);
  useEffect(() => {
    const Get_Messages = async () => {
      try {
        const { data } = await User_Messages(currentChat?._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    Get_Messages();
  }, [currentChat]);

  // !---------------------------------NO-Of MESSAGES

  // !-------------------------------------HANDLE_SUBMITT
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      senderId: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );
    console.log({ receiverId });

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    // !----------------------------------- SEND DATA TO DATABASE

    try {
      const { data } = await Add_Message(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  // !-------------------------------
  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // // console.log(conversations);
  const checkOnlineStatus = (conversations) => {
    const ConversationsMember = conversations?.members?.find(
      (member) => member !== user._id
    );
    // console.log({ ConversationsMember });
    const online = onlineusers.find(
      (user) => user?.userId === ConversationsMember
    );
    return online ? true : false;
  };

  return (
    <>
      <TopBar />
      <div className="Messenger">
        <div className="Chat_Menu">
          <div className="Chat_Menu_Wrapper">
            <input
              placeholder="Search_For_Friends"
              className="Chat_Menu_Input"
            />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)} key={c._id}>
                <Conversation
                  conversations={c}
                  currentUser={user}
                  online={checkOnlineStatus(conversations)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="Chat_Box">
          <div className="Chat_Box_Wrapper">
            {currentChat ? (
              <>
                <div className="Chat_Box_Top">
                  {messages.map((m) => (
                    <div ref={scrollRef} key={m._id}>
                      <Message
                        message={m}
                        Own={m.senderId === user._id}
                        currentUser={user}
                      />
                    </div>
                  ))}
                </div>
                <div className="Chat_Box_Bottom">
                  <textarea
                    className="Chat_Message_Input"
                    placeholder="Write_Something ..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="Chat_Submit_Button" onClick={handleSubmit}>
                    SEND
                  </button>
                </div>
              </>
            ) : (
              <span className="no_converstaion_text">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="Chat_Online">
          <div className="Chat_Online_Wrapper">
            <ChatOnline
              onlineusers={onlineusers}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
