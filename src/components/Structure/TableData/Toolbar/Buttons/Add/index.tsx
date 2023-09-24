import Button from '@Components/Structure/Button';
import AddIcon from '@mui/icons-material/Add';

type TAdd = {
  onClick: () => void;
};

export default function Add({ onClick }: TAdd): JSX.Element {
  return (
    <Button
      className="bg-transperent text-black hover:bg-light-blue/4"
      onClickFunction={onClick}
    >
      <div className="flex gap-1">
        <AddIcon className="font-bold w-6 h-6 pb-0 sm:pb-1" />
        <span className="font-medium sm:font-normal">ADICIONAR</span>
      </div>
    </Button>
  );
}
