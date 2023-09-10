import { useMobileMenu } from '@Contexts/useMobileMenu';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { getHomeButton } from '../../Utils/StandardMenu';

export const Mobile = () => {
  const { showMobileMenu, setShowMobileMenu, resetActiveLink } =
    useMobileMenu();

  const onClick = () => {
    setShowMobileMenu((previousValue: boolean) => {
      if (previousValue) resetActiveLink();

      return !previousValue;
    });
  };

  return (
    <div className="flex items-center justify-center py-8 bg-black">
      {getHomeButton()}
      <button onClick={onClick} className="absolute right-4">
        <MenuIcon
          style={{
            color: 'white',
            display: showMobileMenu ? 'none' : 'block'
          }}
          fontSize="large"
        />
        <CloseIcon
          style={{
            color: 'white',
            display: showMobileMenu ? 'block' : 'none'
          }}
          fontSize="large"
        />
      </button>
    </div>
  );
};
