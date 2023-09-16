import Button from '@Components/Structure/Button';
import AddIcon from '@mui/icons-material/Add';

export default function Add(route: string): JSX.Element[] {
  return [
    <Button route={route} variant="text" key={route}>
      <AddIcon fontSize="small" />
      Adicionar
    </Button>
  ];
}
