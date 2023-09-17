import Button from '@Components/Structure/Button';
import AddIcon from '@mui/icons-material/Add';

export default function Add(route: string): JSX.Element[] {
  return [
    <Button
      route={route}
      key={route}
      className="bg-transperent text-black hover:bg-light-blue/4"
    >
      <div className="flex gap-1">
        <AddIcon className="font-bold w-6 h-6 pb-0 sm:pb-1" />
        <span className="font-medium sm:font-normal">ADICIONAR</span>
      </div>
    </Button>
  ];
}
