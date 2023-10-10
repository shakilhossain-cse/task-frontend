import React from 'react'
import {  IUserReaction } from '../interfaces/type'
import { Button } from '@mui/material'


interface IReactionPops{
    reaction:IUserReaction
}
const ReactionCount:React.FC<IReactionPops> = ({reaction}) => {
  return (
    <Button variant='outlined'>
        {reaction.title} ({reaction.count}) 
    </Button>
  )
}

export default ReactionCount