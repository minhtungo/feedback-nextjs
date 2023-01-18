import { FiGithub } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { Button, Stack } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import StyledButton from './StyledButton';

interface LoginButtonProps {
  [key: string]: any;
}

const LoginButtons = (props: LoginButtonProps) => {
  const auth = useAuth();

  return (
    <Stack spacing='12px' direction={['column', 'row']} {...props}>
      <StyledButton
        onClick={() => auth.signInWithGitHub()}
        leftIcon={<FiGithub />}

      >
        Sign In with GitHub
      </StyledButton>
      <StyledButton
        onClick={() => auth.signInWithGoogle()}
        leftIcon={<FcGoogle />}

        variant='secondary'
      >
        Sign In with Google
      </StyledButton>
    </Stack>
  );
};

export default LoginButtons;
