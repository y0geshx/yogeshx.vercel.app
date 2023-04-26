import {
  SiDiscord,
  SiGithub,
  SiTwitter,
  SiLastdotfm,
  SiSpotify,
  SiTelegram,
  SiReddit,
  SiDevdotto,
} from "react-icons/si";
import { IconType } from "react-icons";

export type Link = {
  name: string;
  url: string;
  value: string;
  icon: IconType;
};

export type Links = Link[];

export const links: Links = [
  {
    name: "Discord",
    url: "https://discord.com/users/942108658148450315",
    value: "vibrantfix#7827",
    icon: SiDiscord,
  },
  {
    name: "GitHub",
    url: "https://github.com/vibrantfix",
    value: "@vibrantfix",
    icon: SiGithub,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/yogeshx95",
    value: "@yogeshx95",
    icon: SiTwitter,
  },
  {
    name: "Last.fm",
    url: "https://www.last.fm/user/YogeshX",
    value: "@YogeshX",
    icon: SiLastdotfm,
  },
  {
    name: "Spotify",
    url: "https://open.spotify.com/user/m3cp5b66nyxy9uuhf6cw5linh",
    value: "@yogeshx",
    icon: SiSpotify,
  },
  {
    name: "Telegram",
    url: "https://t.me/vibrantfix",
    value: "@vibrantfix",
    icon: SiTelegram,
  },
  {
    name: "Reddit",
    url: "https://www.reddit.com/u/",
    value: "n/a",
    icon: SiReddit,
  },
  {
    name: "Dev.to",
    url: "https://dev.to/yogeshx",
    value: "@yogeshx",
    icon: SiDevdotto,
  },
];
