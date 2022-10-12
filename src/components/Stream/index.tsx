import { useAtomValue } from "jotai";
import { useEffect, useRef } from "react";
import { inputAudio, inputVideo, isAudioEnable, isVideoEnable } from "../Store";
import { Video } from "./index.style";

export const Stream = () => {
  const audioDevice = useAtomValue(inputAudio);
  const videoDevice = useAtomValue(inputVideo);
  const isAudio = useAtomValue(isAudioEnable);
  const isVideo = useAtomValue(isVideoEnable);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const userMediaPromise = navigator.mediaDevices
      .getUserMedia({
        audio: isAudio ? { deviceId: audioDevice } : false,
        video: isVideo ? { deviceId: videoDevice } : false,
      })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        return stream;
      });

    return () => {
      userMediaPromise.then((stream) => {
        stream.getTracks().forEach((track) => track.stop());
      });
    };
  }, [audioDevice, isAudio, isVideo, videoDevice]);

  return <Video autoPlay muted ref={videoRef}></Video>;
};

export default Stream;
