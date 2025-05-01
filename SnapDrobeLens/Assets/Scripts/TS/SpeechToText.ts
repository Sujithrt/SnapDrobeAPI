import { VisionOpenAI } from "./VisionOpenAI";

@component
export class SpeechToText extends BaseScriptComponent {
  @input()
  text: Text;
  @input()
  visionScript: VisionOpenAI;
    
   static chat_history: Array<String> = [];
//    static readonly chat_padding: Number = 2;
//    pinchButton: PinchButton
  // Remote service module for fetching data
    static start_of_message: Boolean = false;
  private voiceMLModule: VoiceMLModule = require("LensStudio:VoiceMLModule");
    
//  static awaitForMoreInsertionsOrTimeout(timeoutCriteria: Number) {
//        return new Promise((resolve) => {
//            let inserted = 0;
//            const 
//        })
//    }

  onAwake() {
    let options = VoiceML.ListeningOptions.create();
    options.shouldReturnAsrTranscription = true;
    options.shouldReturnInterimAsrTranscription = true;
    this.voiceMLModule.onListeningEnabled.add(() => {
      this.voiceMLModule.startListening(options);
      this.voiceMLModule.onListeningUpdate.add(this.onListenUpdate);
    });
  }

  onListenUpdate = (eventData: VoiceML.ListeningUpdateEventArgs) => {
    if (eventData.isFinalTranscription) {
      this.text.text = eventData.transcription;
//      if (SpeechToText.chat_history.length >= 2 * SpeechToText.chat_padding + 1) {
//                SpeechToText.chat_history.shift();
//            }
//            SpeechToText.chat_history.push(this.text.text);
      if (this.visionScript) {
          const t = this.text.text.toLowerCase()
                            .replace(/[^a-z\s]/g, "")
                            .replace(/\s+/g, " ")
                            .trim();
          if (
            t.includes("snap to wardrobe") ||
            t.includes("add it to my wardrobe") ||
            t.includes("save to wardrobe") ||
            t.includes("add to wardrobe")
          ) {
            this.visionScript.handleTriggerEnd({ "url": "https://snapdrobeapi.onrender.com/add_image" });
          } else if (
            t.includes("hey snap")
          ) {
                 SpeechToText.start_of_message = true;
                    SpeechToText.chat_history = [this.text.text];
//            this.visionScript.handleTriggerEnd({ "url": "https://snapdrobe-api-8749bbd05457.herokuapp.com/ask", "input_prompt": this.text.text });
          } else if (t.includes("suggestions please")) {
                    SpeechToText.chat_history.push(this.text.text);
                    SpeechToText.start_of_message = false;
                    print("CHAT: " + SpeechToText.chat_history);
                    let final_string = "";
                    SpeechToText.chat_history.forEach(chat => {
                        final_string += chat + "\n";
                    })
                    this.visionScript.handleTriggerEnd({ "url": "https://snapdrobeapi.onrender.com/ask", "input_prompt": final_string });
                    SpeechToText.chat_history = [];
                }
                else if (SpeechToText.start_of_message)
                    SpeechToText.chat_history.push(this.text.text);
               
          // later: else if (t.includes("fashion advice")) { this.visionScript.api.getAdvice(); }
        }
    }
  };
}
