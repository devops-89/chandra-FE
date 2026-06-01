import Avatar from '@mui/material/Avatar';

interface Props {
  src: string;
  alt: string;
}

export function TestimonialAvatar({
  src,
  alt,
}: Props) {
  return (
    <Avatar
      src={src}
      alt={alt}
      sx={{
        width: 56,
        height: 56,
      }}
    />
  );
}