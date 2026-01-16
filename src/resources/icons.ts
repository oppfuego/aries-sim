import {HiOutlineGlobeAlt} from "react-icons/hi";
import {MdOutlineSpeed} from "react-icons/md";
import {RiSimCardLine} from "react-icons/ri";
import {FiShield} from "react-icons/fi";
import {FaCoins} from "react-icons/fa";
import {IoMdPhonePortrait} from "react-icons/io";
import {HiOutlineLogin} from "react-icons/hi";
import { FaWallet } from "react-icons/fa";
import { IoMdMailOpen } from "react-icons/io";
import { FaPhoneVolume } from "react-icons/fa6";
import { BsCurrencyExchange } from "react-icons/bs";

export const ICONS = {
    globe: HiOutlineGlobeAlt,
    speed: MdOutlineSpeed,
    sim: RiSimCardLine,
    shield: FiShield,
    coins: FaCoins,
    phone: IoMdPhonePortrait,
    login: HiOutlineLogin,
    wallet: FaWallet,
    mail: IoMdMailOpen,
    call: FaPhoneVolume,
    pay: BsCurrencyExchange,
} as const;

export type IconKey = keyof typeof ICONS;
