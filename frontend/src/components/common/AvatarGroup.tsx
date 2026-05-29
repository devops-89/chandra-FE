import Image from 'next/image';

export default function GroupAvatars() {
  return (
    <Image
      src="/landing/avatargrp.png"
      alt="Users"
      width={120}
      height={40}
      className="h-auto w-auto"
    />
  );
}