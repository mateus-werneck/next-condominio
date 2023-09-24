import Button from '@Components/Structure/Button';
import RefreshIcon from '@mui/icons-material/Refresh';

type TReload = {
  onClickFunction: () => void;
};

export default function Reload({ onClickFunction }: TReload): JSX.Element {
  return (
    <Button
      key="TableDate_Reload"
      className="bg-transperent text-black hover:bg-light-blue/4"
      onClickFunction={onClickFunction}
    >
      <div className="flex gap-1">
        <RefreshIcon className="font-bold w-6 h-6 pb-0 sm:pb-1" />
        <span className="font-medium sm:font-normal">Recarregar</span>
      </div>
    </Button>
  );
}
