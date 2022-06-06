import {
  Image,
  keyframes,
  usePrefersReducedMotion,
  ImageProps,
} from "@chakra-ui/react";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const Logo = (props: ImageProps & { source?: string }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { source } = props;

  const animation = prefersReducedMotion
    ? undefined
    : `${spin} infinite 20s linear`;

  return <Image src={source ? source : "/assets/logo.svg"} {...props} />;
};
