import Button from '@Components/Structure/Button';
import { Colors } from '@Lib/Treat/Colors';
import AddIcon from '@mui/icons-material/Add';

export default function Add(route: string): JSX.Element[] {
  return [
    <Button route={route} variant="outlined" key={route} color={Colors.success}>
      <AddIcon fontSize="small" />
      Adicionar
    </Button>
  ];
}
