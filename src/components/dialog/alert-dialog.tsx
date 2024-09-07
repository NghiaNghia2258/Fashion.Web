import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Theme, SxProps } from '@mui/material';

type AlertDialogProps = {
  description: string;
  title: string;
  labelDisagree: string;
  labelAgree: string;
  handleAgree: Function;
  handleDisagree: Function;
  isOpen: boolean;
  sx?: SxProps<Theme>;
};

export default function AlertDialog({
  title,
  description,
  labelDisagree,
  labelAgree,
  handleAgree,
  handleDisagree,
  isOpen,
  sx,
}: AlertDialogProps) {
  return (
    <Dialog
      open={isOpen}
      aria-labelledby="alert-dialog-title1"
      aria-describedby="alert-dialog-description"
      sx={{
        '& .MuiPaper-root': {
          width: '300px',
        },
        ...sx,
      }}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{
            border: '3px solid #e14646',
            color: '#e14646',
          }}
          onClick={() => {
            handleDisagree();
          }}
        >
          {labelDisagree}
        </Button>
        <Button
          sx={{
            backgroundColor: '#2a2986',
            color: '#fff',
          }}
          onClick={() => handleAgree()}
          autoFocus
        >
          {labelAgree}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
