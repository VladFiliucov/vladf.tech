import React, { useRef } from 'react';
import Reward from 'react-rewards';
// https://github.com/thedevelobear/react-rewards
import { Button } from '@chakra-ui/react';

// in render

// in fetchSomeData:
// to reward a user with confetti/emoji/memphis rain:
// this.reward.rewardMe();
// to "punish" user :
// this.reward.punishMe();
//
const HeroCTA = () => {
  const celebrateRef = useRef(null);

  const handleClick = () => {
    // celebrateRef.current.punishMe()
    celebrateRef.current.rewardMe()
  }
  return (
    <Reward
      type='confetti'
      ref={celebrateRef}
    >
      <Button
        colorScheme={'blue'}
        bg={'blue.400'}
        rounded={'full'}
        mt="-10"
        px={6}
        onClick={handleClick}
        _hover={{
          bg: 'blue.500',
        }}>
        Celebrate
      </Button>
    </Reward>
  );
}

export default HeroCTA;
