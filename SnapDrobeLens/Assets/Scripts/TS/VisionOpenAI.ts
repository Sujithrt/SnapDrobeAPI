import { Interactable } from "SpectaclesInteractionKit/Components/Interaction/Interactable/Interactable";
import { InteractorEvent } from "SpectaclesInteractionKit/Core/Interactor/InteractorEvent";
import { SIK } from "SpectaclesInteractionKit/SIK";
import { TextToSpeechOpenAI } from "./TextToSpeechOpenAI";

@component
export class VisionOpenAI extends BaseScriptComponent {
  @input textInput: Text;
  @input image: Image;
//  @input interactable: Interactable;
  @input ttsComponent: TextToSpeechOpenAI;
  @input outfitImage: Image;
  @input outfitLoader: Image;
    
//    static loading: Boolean = false;

  apiKey: string = "your open ai api key";

  // Remote service module for fetching data
  private remoteServiceModule: RemoteServiceModule = require("LensStudio:RemoteServiceModule");

  private isProcessing: boolean = false;

  onAwake(){
    this.createEvent("OnStartEvent").bind(() => {
//      this.onStart();
    });
  }
    
//  setLoading(isLoading: boolean) {
//      VisionOpenAI.loading = isLoading;
//    
//      if (this.outfitLoader) {
//        this.outfitLoader.enabled = isLoading;
//      }
//    
//      if (this.outfitImage) {
//        this.outfitImage.enabled = !isLoading;
//      }
//    }

//  onStart() {
//    let interactionManager = SIK.InteractionManager;
//
//    // Define the desired callback logic for the relevant Interactable event.
//    let onTriggerEndCallback = (event: InteractorEvent) => {
//      this.handleTriggerEnd(event);
//    };
//
//    this.interactable.onInteractorTriggerEnd(onTriggerEndCallback);
//  }

  async handleTriggerEnd(eventData = null) {
    if (eventData.url.includes("/add_image")) {
//            this.setLoading(true);
        if (this.isProcessing) {
          print("A request is already in progress. Please wait.");
          return;
        }
    
        if (!this.textInput.text || !this.image || !this.apiKey) {
          print("Text, Image, or API key input is missing");
          return;
        }
    
        try {
          this.isProcessing = true;
    
          // Access the texture from the image component
          const texture = this.image.mainPass.baseTex;
          if (!texture) {
            print("Texture not found in the image component.");
            return;
          }
    
          const base64Image = await this.encodeTextureToBase64(texture);
    
          const requestPayload = {
            "image_b64": base64Image 
          }
    
          const request = new Request(
            eventData.url,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(requestPayload),
            }
          );
          // More about the fetch API: https://developers.snap.com/spectacles/about-spectacles-features/apis/fetch
          let response = await this.remoteServiceModule.fetch(request);
          if (response.status === 200) {
//                    this.setLoading(false);
            let responseData = await response.json();
    //        this.textOutput.text = responseData.choices[0].message.content;
            print(responseData["return_response"]);
    
            // Call TTS to generate and play speech from the response
            if (this.ttsComponent) {
              this.ttsComponent.generateAndPlaySpeech(
                responseData["return_response"]
              );
            }
          } else {
//            this.setLoading(false);
            print("Failure: response not successful");
          }
        } catch (error) {
//                this.setLoading(false);
          print("Error: " + error);
        } finally {
          this.isProcessing = false;
        }
    } else {
//            this.setLoading(true);
       const requestPayload = {
          "input_prompt": eventData.input_prompt
       }
       try {
      const request = new Request(
            eventData.url,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(requestPayload),
            }
          );
          // More about the fetch API: https://developers.snap.com/spectacles/about-spectacles-features/apis/fetch
          let response = await this.remoteServiceModule.fetch(request);
          print(response.status)
        if (response.status === 200) { 
//                    this.setLoading(false);
                    
             const { image_b64, return_prompt } = await response.json();
                    print("Received image_b64 length:" + image_b64.length);
                    print("First 30 characters:" + image_b64.substring(0, 30));

      // 1) decode the image:
//      const dataUri = `data:image/jpeg;base64,${image_b64}`;
      Base64.decodeTextureAsync(
        image_b64,
        (tex) => {
          // 2) assign to the UI Image:
          this.outfitImage.mainPass.baseTex = tex;
        },
        () => {
//        this.setLoading(false);
        print("Image decode failed");
      }
      );

      // 3) speak the advice:
      if (this.ttsComponent) {
          this.ttsComponent.generateAndPlaySpeech(
            return_prompt
          );
        }
                }

    } catch (e) {
//                this.setLoading(false);
      print("ask error:" + e);
    }
    }
  }

  // More about encodeTextureToBase64: https://platform.openai.com/docs/guides/vision or https://developers.snap.com/api/lens-studio/Classes/OtherClasses#Base64
  encodeTextureToBase64(texture) {
    return new Promise((resolve, reject) => {
      Base64.encodeTextureAsync(
        texture,
        resolve,
        reject,
        CompressionQuality.LowQuality,
        EncodingType.Jpg
      );
    });
  }
}
