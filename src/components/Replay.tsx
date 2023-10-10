import { Box, Typography } from "@mui/material";
import React from "react";
import { IReply } from "../interfaces/type";
import Reaction from "./Reaction";
import ReactionCount from "./ReactionCount";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReplayReaction } from "../api/reactionApi";

interface IReplayProps {
  replay: IReply;
}
const Replay: React.FC<IReplayProps> = ({ replay }) => {
  const queryClient = useQueryClient()


  // replay reaction mutation 
  const { mutateAsync: createReplayReactionMutation } = useMutation<
    void,
    Error,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { replayId: number; reactionId: number }
  >({
    mutationFn: ({ replayId, reactionId }) =>
      createReplayReaction(replayId, reactionId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["getPostData"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getAllData"],
      });
    },
  });


  const handelAddReplayReaction = (reactionId: number) => {
    createReplayReactionMutation({replayId:Number(replay.id), reactionId:reactionId})
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
