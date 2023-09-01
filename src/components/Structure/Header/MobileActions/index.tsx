import { useDevice } from '@Contexts/useDevice';
import MenuIcon from '@mui/icons-material/Menu';
import { getHomeButton } from '../Utils/StandardMenu';

interface IMobileActions {
  onClick: (value: any) => void;
}

export const MobileActions = ({ onClick }: IMobileActions) => {
  const { isMobileView } = useDevice();
  return (
    <>
      {isMobileView() && (
        <div className="flex items-center justify-center py-8 bg-black">
          {getHomeButton()}
          <button onClick={onClick} className="absolute right-4">
            <MenuIcon style={{ color: 'white' }} fontSize="large" />
          </button>
        </div>
      )}
    </>
  );
};
