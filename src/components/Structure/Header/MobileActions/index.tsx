import { useDevice } from '@Contexts/useDevice';
import MenuIcon from '@mui/icons-material/Menu';

interface IMobileActions {
  onClick: (value: any) => void;
}

export const MobileActions = ({ onClick }: IMobileActions) => {
  const { isMobileView } = useDevice();
  return (
    <>
      {isMobileView() && (
        <div className="absolute right-4 flex items-center justify-center py-8">
          <button onClick={onClick}>
            <MenuIcon style={{ color: 'black' }} />
          </button>
        </div>
      )}
    </>
  );
};
