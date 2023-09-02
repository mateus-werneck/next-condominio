import { useDevice } from '@Contexts/useDevice';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { getHomeButton } from '../Utils/StandardMenu';

interface IMobileActions {
  showMobileMenu: boolean;
  onClick: (value: any) => void;
}

export const MobileActions = ({ showMobileMenu, onClick }: IMobileActions) => {
  const { isMobileView } = useDevice();
  return (
    <>
      {isMobileView() && (
        <div className="flex items-center justify-center py-8 bg-black">
          {getHomeButton()}
          <button onClick={onClick} className="absolute right-4">
            {!showMobileMenu ? (
              <MenuIcon style={{ color: 'white' }} fontSize="large" />
            ) : (
              <CloseIcon style={{ color: 'white' }} fontSize="large" />
            )}
          </button>
        </div>
      )}
    </>
  );
};
