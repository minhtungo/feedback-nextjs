import {
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react';

const Usage = () => (
  <StatGroup>
    <Stat>
      <StatLabel color='gray.700'>Feedback</StatLabel>
      <StatNumber fontWeight='semibold'>∞</StatNumber>
      <StatHelpText>10,000 limit</StatHelpText>
    </Stat>

    <Stat>
      <StatLabel color='gray.700'>Sites</StatLabel>
      <StatNumber fontWeight='semibold'>1/∞</StatNumber>
      <StatHelpText>Unlimited Sites</StatHelpText>
    </Stat>
  </StatGroup>
);

export default Usage;
