import { Stack, Button } from '@mui/material';
import { IUserReaction } from '../interfaces/type';
import { useApp } from '../store/app/Provider';

interface ReactionProps {
  onAddReaction: (reactionId: number) => void;
  selectedReactions: IUserReaction[];
}

const Reaction: React.FC<ReactionProps> = ({ onAddReaction, selectedReactions }) => {
  const { reactions } = useApp();  

  return (
    <Stack direction="row" spacing={2}>
      {reactions &&
        reactions.map((reaction) => (
          <Button
            key={reaction.id}
            variant={selectedReactions && selectedReactions.find((selected) => selected.title === reaction.title)?.user  ? 'contained' : 'outlined'}
            onClick={() => onAddReaction(reaction.id)}
          >
            {reaction.title}
          </Button>
        ))}
    </Stack>
  );
};

export default Reaction;
