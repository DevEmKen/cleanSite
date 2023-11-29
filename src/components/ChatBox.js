import React, { useState, useRef } from "react";

// Import OpenAI API
import OpenAI from "openai";
// The front-end chat box is the only component that isn't custom-made.
// It uses chatscope's chat UI as the frontend for the chatGPT
// Assistant API. The back-end, i.e. most of the code in this
// document is custom-made.
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

const API_KEY = process.env.REACT_APP_API_URL;

const ChatBox = () => {
  const chatBoxRef = useRef(null);
  const [userHasEngaged, setUserHasEngaged] = useState(false);
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message:
        "Hello, I'm chatGPT! Ask me anything about this website, it's source code, or functionality! Please be patient - I'm a hard thinker.",
      sender: "ChatGPT",
      direction: "incoming",
    },
  ]);
  const openai = new OpenAI({
    apiKey: API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const sendMessageToOpenAI = async (userMessage) => {
    try {
      setTyping(true);

      const response = await openai.beta.assistants.retrieve(
        "asst_Rinos6bXk2uBsHVUpdHzXaIk"
      );

      const thread = await openai.beta.threads.create();
      const userMessageResponse = await openai.beta.threads.messages.create(
        thread.id,
        {
          role: "user",
          content: userMessage,
        }
      );

      const run = await openai.beta.threads.runs.create(thread.id, {
        assistant_id: response.id,
      });

      let runStatus = await openai.beta.threads.runs.retrieve(
        thread.id,
        run.id
      );

      while (runStatus.status !== "completed") {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      }

      const assistantMessages = await openai.beta.threads.messages.list(
        thread.id
      );
      const lastAssistantMessage = assistantMessages.data
        .filter((message) => message.role === "assistant")
        .pop();

      setTyping(false);
      return (
        lastAssistantMessage?.content[0]?.text.value ||
        "Sorry, I couldn't understand your question."
      );
    } catch (error) {
      console.error("Error communicating with OpenAI:", error);
      setTyping(false);
      return "Sorry, an error occurred.";
    }
  };

  const handleMessageSend = async (userMessage) => {
    // Add the user's message to the message list immediately
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: userMessage, sender: "User", direction: "outgoing" },
    ]);
    // Send user's message to OpenAI API
    const assistantMessage = await sendMessageToOpenAI(userMessage);

    // Update message list with chatGPT's reply
    setMessages((prevMessages) => [
      ...prevMessages.slice(0, -1), // Prevent adding user's message to list again
      { message: userMessage, sender: "User", direction: "outgoing" },
      { message: assistantMessage, sender: "ChatGPT", direction: "incoming" },
    ]);
  };

  return (
    <div className="chat-box" ref={chatBoxRef}>
      <MainContainer>
        <ChatContainer>
          <MessageList
            typingIndicator={
              typing ? <TypingIndicator content="ChatGPT is typing" /> : null
            }
          >
            {messages.map((message, i) => (
              <Message key={i} model={message} />
            ))}
          </MessageList>
          <MessageInput
            placeholder="How does the music player work?"
            onSend={handleMessageSend}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default ChatBox;
