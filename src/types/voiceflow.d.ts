
interface VoiceFlowChat {
  load: (config: {
    verify: {
      projectID: string;
    };
    url: string;
    versionID: string;
    voice?: {
      url: string;
    };
    render?: {
      mode: string;
      target: HTMLElement;
    };
  }) => Promise<void>;
  destroy?: () => void;
  open?: () => void;
}

interface VoiceFlow {
  chat: VoiceFlowChat;
}

interface Window {
  voiceflow?: VoiceFlow;
}
