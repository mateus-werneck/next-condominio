import { useDevice } from '@Contexts/useDevice';
import MenuIcon from '@mui/icons-material/Menu';
import { ActionContainer } from './style';

interface IMobileActions {
  onClick: (value: any) => void;
}

export const MobileActions = ({ onClick }: IMobileActions) => {
  const { isMobileView } = useDevice();
  return (
    <>
      {isMobileView() && (
        <ActionContainer className="flex items-center justify-center py-8">
          <button onClick={onClick}>
            <MenuIcon style={{ color: 'black' }} />
          </button>
        </ActionContainer>
      )}
    </>
  );
};
