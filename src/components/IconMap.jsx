import React from 'react';
import {
  Shield,
  AlertTriangle,
  KeyRound,
  Lock,
  Smartphone,
  PhoneCall,
  MailWarning,
  QrCode,
  IndianRupee,
  Headset,
  Sliders,
  FileLock2,
  ShoppingBag,
  GlobeLock,
  AppWindow,
  HardDrive,
  Wifi,
  Paperclip,
  MessageSquareHeart,
  Users,
  Cpu,
  LifeBuoy,
  Gamepad2,
  ClipboardCheck,
  BookOpen
} from 'lucide-react';

const ICON_COMPONENTS = {
  Shield,
  AlertTriangle,
  KeyRound,
  Lock,
  Smartphone,
  PhoneCall,
  MailWarning,
  QrCode,
  IndianRupee,
  Headset,
  Sliders,
  FileLock2,
  ShoppingBag,
  GlobeLock,
  AppWindow,
  HardDrive,
  Wifi,
  Paperclip,
  MessageSquareHeart,
  Users,
  Cpu,
  LifeBuoy,
  Gamepad2,
  ClipboardCheck
};

export function ActivityIcon({ name, className = 'w-5 h-5' }) {
  const IconComponent = ICON_COMPONENTS[name] || BookOpen;
  return <IconComponent className={className} aria-hidden="true" />;
}
