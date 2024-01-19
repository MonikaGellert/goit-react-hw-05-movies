import { StyledLink } from './BackLink.styled';
import { CgArrowRight } from 'react-icons/cg';

const BackLink = ({ to }) => {
  return (
    <StyledLink to={to}>
      <CgArrowRight/> <span>Go Back</span>
    </StyledLink>
  );
};

export default BackLink;