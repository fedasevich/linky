import {
  faDiscord,
  faFacebook,
  faFacebookMessenger,
  faFigma,
  faGithub,
  faInstagram,
  faInternetExplorer,
  faSpotify,
  faSteam,
  faTelegram,
  faTiktok,
  faTwitch,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { ButtonLink } from "../../types/Profile/ButtonLink";

type LinkTypesMapToButton = {
  [key: string]: ButtonLink;
};

export const LinkTypesMapToButton: LinkTypesMapToButton = {
  Regular: {
    icon: faInternetExplorer,
    className: "bg-[#2457F5]",
    isGradient: false,
  },
  Discord: { icon: faDiscord, className: "bg-[#5865F2]", isGradient: false },
  GenericEmail: {
    icon: faEnvelope,
    className: "bg-[#2457F5]",
    isGradient: false,
  },
  Facebook: { icon: faFacebook, className: "bg-[#1877F2]", isGradient: false },
  ChatOnMessenger: {
    icon: faFacebookMessenger,
    className: "",
    isGradient: true,
    gradient: {
      colors: ["#FF7061", "#A033FF", "#09F"],
      start: { x: 1, y: 0 },
      end: { x: 0, y: 1.3 },
    },
  },
  FigmaCommunity: {
    icon: faFigma,
    className: "bg-black border border-1 border-white",
    isGradient: false,
  },
  GitHub: {
    icon: faGithub,
    className: "bg-black border border-1 border-white",
    isGradient: false,
  },
  Instagram: {
    icon: faInstagram,
    className: "",
    isGradient: true,
    gradient: {
      colors: ["#1400C8", "#B900B4", "#F50000"],
      start: { x: 1, y: 0 },
      end: { x: 0, y: 1 },
    },
  },
  Spotify: {
    icon: faSpotify,
    className: "bg-[#191414] border border-1 border-white",
    isGradient: false,
  },
  Steam: {
    icon: faSteam,
    className: "",
    isGradient: true,
    gradient: {
      colors: ["#08BBFF", "#2B75FF"],
      start: { x: 0, y: 1 },
      end: { x: 1, y: 0 },
    },
  },
  Telegram: { icon: faTelegram, className: "bg-[#3FAEE8]", isGradient: false },
  TikTok: {
    icon: faTiktok,
    className: "bg-black border border-1 border-white",
    isGradient: false,
  },
  Twitch: { icon: faTwitch, className: "bg-[#9146FF]", isGradient: false },
  Twitter: { icon: faTwitter, className: "bg-[#1DA1F2]", isGradient: false },
  YouTube: {
    icon: faYoutube,
    className: "bg-black border border-1 border-white",
    isGradient: false,
  },
} as const;
