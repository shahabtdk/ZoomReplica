import { useEffect, useState } from "react";
import { useAtom } from "jotai";

import { inputAudio, inputVideo, isAudioEnable, isVideoEnable } from "../Store";

import { Dropdown, Menu, MenuProps } from "antd";
import {
  AudioOutlined,
  UpOutlined,
  AudioMutedOutlined,
  VideoCameraOutlined,
  StopOutlined,
} from "@ant-design/icons";

import { IconTextWrapper, IconWrapper, Label, Wrapper } from "./index.style";

const Footer = () => {
  const [audioDevice, setAudioDevice] = useAtom(inputAudio);
  const [videoDevice, setVideoDevice] = useAtom(inputVideo);

  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [audio, setAudio] = useAtom(isAudioEnable);
  const [video, setVideo] = useAtom(isVideoEnable);

  useEffect(() => {
    if (!navigator.mediaDevices?.enumerateDevices) {
      console.log("enumerateDevices() not supported.");
    } else {
      // List cameras and microphones.
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          // @ts-ignore
          window.__DEVICES__ = devices;
          setDevices(devices);
        })
        .catch((err) => {
          console.error(`${err.name}: ${err.message}`);
        });
    }
  }, []);

  const onClickAudio: MenuProps["onClick"] = ({ key }) => {
    setAudioDevice(key);
  };

  const audiomenu = (
    <Menu
      onClick={onClickAudio}
      selectedKeys={[audioDevice || ""]}
      items={devices
        .filter((d) => d.kind === "audioinput")
        .map((device: MediaDeviceInfo) => ({
          key: device.deviceId,
          label: device.label,
          value: device.deviceId,
        }))}
    />
  );

  const onClickVideo: MenuProps["onClick"] = ({ key }) => {
    setVideoDevice(key);
  };

  const videomenu = (
    <Menu
      onClick={onClickVideo}
      selectedKeys={[videoDevice || ""]}
      items={devices
        .filter((d) => d.kind === "videoinput")
        .map((device: MediaDeviceInfo) => ({
          key: device.deviceId,
          label: device.label,
          value: device.deviceId,
        }))}
    />
  );
  return (
    <Wrapper>
      <IconWrapper>
        <IconTextWrapper onClick={() => setAudio(!audio)}>
          {audio ? (
            <>
              <AudioOutlined />
              <Label>Mute</Label>{" "}
            </>
          ) : (
            <>
              <AudioMutedOutlined />

              <Label>Unmute</Label>
            </>
          )}
        </IconTextWrapper>
        <Dropdown overlay={audiomenu}>
          <UpOutlined style={{ color: "white" }} />
        </Dropdown>
      </IconWrapper>

      <IconWrapper>
        <IconTextWrapper onClick={() => setVideo(!video)}>
          {video ? (
            <>
              <VideoCameraOutlined />
              <Label>Stop Video</Label>
            </>
          ) : (
            <>
              <StopOutlined />
              <Label>Show Video</Label>
            </>
          )}
        </IconTextWrapper>
        <Dropdown overlay={videomenu}>
          <UpOutlined style={{ color: "white" }} />
        </Dropdown>
      </IconWrapper>
    </Wrapper>
  );
};
export default Footer;
