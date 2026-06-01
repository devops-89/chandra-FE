import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

export default function GroupAvatars() {
  return (
    <AvatarGroup max={4}>
      <Avatar sx={{ width: { xs: 32, sm: 36 }, height: { xs: 32, sm: 36 } }}>R</Avatar>
      <Avatar sx={{ width: { xs: 36, sm: 36 }, height: { xs: 36, sm: 36 } }}>T</Avatar>
      <Avatar sx={{ width: { xs: 36, sm: 36 }, height: { xs: 36, sm: 36 } }}>C</Avatar>
      <Avatar sx={{ width: { xs: 36, sm: 36 }, height: { xs: 36, sm: 36 } }}>A</Avatar>
      <Avatar sx={{ width: { xs: 40, sm: 46 }, height: { xs: 40, sm: 46 } }}>T</Avatar>
    </AvatarGroup>
  );
}
