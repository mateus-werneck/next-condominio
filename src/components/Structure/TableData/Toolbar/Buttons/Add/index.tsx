import Button from '@Components/Structure/Button';
import AddIcon from '@mui/icons-material/Add';

export default function Add(route: string): JSX.Element[] {
  return [
    <Button
      route={route}
      key={route}
      className="px-0 py-0 bg-transperent text-black hover:bg-blue"
    >
      <div className="flex gap-1">
        <AddIcon fontSize="small" />
        <span>ADICIONAR</span>
      </div>
    </Button>
  ];
}
