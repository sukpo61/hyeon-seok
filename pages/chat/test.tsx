import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

export interface IMessage {
  from: string;
  text: string;
  body?: any;
}

export interface IStompClient {
  connect: (
    headers: {},
    connectCallback: (frame: any) => void,
    errorCallback?: (error: string) => void
  ) => void;
  disconnect: (disconnectCallback?: () => void, headers?: {}) => void;
  send: (destination: string, headers?: {}, body?: string) => void;
  subscribe: (
    destination: string,
    callback: (message: IMessage) => void,
    headers?: {}
  ) => void;
}

const ChatRoom: React.FC = () => {
  const [stompClient, setStompClient] = useState<IStompClient | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client: any = Stomp.over(socket);

    client.connect({}, (frame: any) => {
      client.subscribe("/topic/messages", (message: IMessage) => {
        setMessages((prev) => [...prev, JSON.parse(message.body)]);
      });
    });

    setStompClient(client);
    return () => {
      if (client) {
        client.disconnect();
      }
    };
  }, []);

  const sendMessage = () => {
    if (stompClient && newMessage) {
      const message: IMessage = { from: "User", text: newMessage };
      stompClient.send("/app/chat", {}, JSON.stringify(message));
      setNewMessage("");
    }
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div>
        {messages.map((message, i) => (
          <div key={i}>
            {message.from}: {message.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
