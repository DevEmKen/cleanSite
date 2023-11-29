import React, { useState } from "react";

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

const API_KEY = "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";

const ChatBox = () => {
  const [userHasEngaged, setUserHasEngaged] = useState(false);
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello1",
      sender: "ChatGPT",
      direction: "incoming",
    },
    {
      message: "helloBack",
      sender: "User",
      direction: "outgoing",
    },
  ]);
  const openai = new OpenAI({
    apiKey: API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const sendMessageToOpenAI = async (userMessage) => {
    try {
      setTyping(true);

      const response = await openai.beta.assistants.create({
        name: "Math Tutor",
        instructions:
          "You are a personal math tutor. Write and run code to answer math questions.",
        tools: [{ type: "code_interpreter" }],
        model: "gpt-4-1106-preview",
      });

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
    const assistantMessage = await sendMessageToOpenAI(userMessage);

    setMessages((prevMessages) => [
      ...prevMessages,
      { message: userMessage, sender: "User", direction: "outgoing" },
      { message: assistantMessage, sender: "ChatGPT", direction: "incoming" },
    ]);
  };

  return (
    <div className="chat-box">
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
            placeholder="Say hello to chatGPT"
            onSend={handleMessageSend}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default ChatBox;
