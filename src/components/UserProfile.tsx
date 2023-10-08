import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import formateDate from "../utils/formateDate";
import { red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";

interface UserProfileProps {
  data?: {
    name: string;
  };
  created_at: string;
}

const UserProfile = ({ data, created_at }: UserProfileProps) => {
  return (
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          {data?.name[0]}
        </Avatar>
      }
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      }
      title={data?.name}
      subheader={formateDate(created_at)}
    />
  );
};

export default UserProfile;
