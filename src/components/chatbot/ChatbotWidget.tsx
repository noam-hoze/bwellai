import React, { useEffect } from "react";

// Create a function that can be called from anywhere to open the chat
export const openChatWidget = () => {
  if (window.voiceflow && window.voiceflow.chat && window.voiceflow.chat.open) {
    window.voiceflow.chat.open();
  }
};

const ChatbotWidget = () => {
  useEffect(() => {
    // Create a script element
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";

    // Add the onload handler
    script.onload = () => {
      if (window.voiceflow) {
        window.voiceflow.chat.load({
          verify: { projectID: "681117cab820d525c9f68d62" }, // Keep existing project ID
          url: "https://general-runtime.voiceflow.com",
          versionID: "production",
          voice: {
            url: "https://runtime-api.voiceflow.com",
          },
        });
        // No automatic opening of the chat - will be opened on button click
      }
    };

    // Append the script to the document
    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      // Cleanup any voiceflow instances if needed
      if (
        window.voiceflow &&
        window.voiceflow.chat &&
        window.voiceflow.chat.destroy
      ) {
        window.voiceflow.chat.destroy();
      }
    };
  }, []);

  return null; // No UI component needed
};

export default ChatbotWidget;
