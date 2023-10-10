import { Box, Typography } from "@mui/material";
import React from "react";
import { IReply } from "../interfaces/type";
import Reaction from "./Reaction";
import { useReaction } from "../store/reaction/Provider";
import ReactionCount from "./ReactionCount";

interface IReplayProps {
  replay: IReply;
}
const Replay: React.FC<IReplayProps> = ({ replay }) => {
  const { addReplayReaction } = useReaction();

  const handelAddReplayReaction = (reactionId: number) => {
    addReplayReaction(Number(replay.id), reactionId);
  };

  return (
    <Box
      key={replay.id}
      pl={4}
      pr={2}
      border={1}
      borderColor="grey.200"
      marginBottom={1}
    >
      <Typography variant="h6">{replay.user.name}</Typography>
      <Typography variant="body1">{replay.body}</Typography>
      {replay.reactionsData &&
        replay.reactionsData.map((reaction) => (
          <ReactionCount reaction={reaction} />
        ))}

      <Reaction
        onAddReaction={handelAddReplayReaction}
        selectedReactions={replay.reactionsData}
      />
    </Box>
  );
};

export default Replay;
