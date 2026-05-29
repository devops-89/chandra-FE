import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

export default function GroupAvatars() {
  return (
    <AvatarGroup max={4}>
      <Avatar sx={{ width: { xs: 32, sm: 36 }, height: { xs: 32, sm: 36 } }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <Avatar sx={{ width: { xs: 36, sm: 36 }, height: { xs: 36, sm: 36 } }} alt="Travis Howard" src="/static/images/avatar/2.jpg" />
      <Avatar sx={{ width: { xs: 36, sm: 36 }, height: { xs: 36, sm: 36 } }} alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
      <Avatar sx={{ width: { xs: 36, sm: 36 }, height: { xs: 36, sm: 36 } }} alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
      <Avatar sx={{ width: { xs: 40, sm: 46 }, height: { xs: 40, sm: 46 } }} alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
    </AvatarGroup>
  );
}
