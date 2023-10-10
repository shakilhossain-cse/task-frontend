import { Stack, Button } from '@mui/material';
import { useReaction } from '../store/reaction/Provider';
import { IUserReaction } from '../interfaces/type';

interface ReactionProps {
  onAddReaction: (reactionId: number) => void;
  selectedReactions: IUserReaction[];
}

const Reaction: React.FC<ReactionProps> = ({ onAddReaction, selectedReactions }) => {
  const { reactions } = useReaction();

  return (
    <Stack direction="row" spacing={2}>
      {reactions &&
        reactions.map((reaction) => (
          <Button
            key={reaction.id}
            variant={selectedReactions && selectedReactions.some((selected) => selected.title === reaction.title) ? 'contained' : 'outlined'}
            onClick={() => onAddReaction(reaction.id)}
          >
            {reaction.title}
          </Button>
        ))}
    </Stack>
  );
};

export default Reaction;
