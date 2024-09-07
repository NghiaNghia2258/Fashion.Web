import Box from '@mui/material/Box';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { useSettingsContext } from 'src/components/settings';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import AlertTitle from '@mui/material/AlertTitle';
import LinearProgress from '@mui/material/LinearProgress';

import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { useState, createContext } from 'react';
import Header from './header';
import NavMini from './nav-mini';
import NavVertical from './nav-vertical';
import NavHorizontal from './nav-horizontal';

import Main from './main';

// ----------------------------------------------------------------------

interface ToastOptions {
  severity: 'error' | 'warning' | 'info' | 'success'; // Các giá trị hợp lệ cho severity
  description: string; // Mô tả hoặc nội dung chính
  autoHideDuration?: number; // Thời gian tự động ẩn (có thể không bắt buộc)
  title?: string; // Tiêu đề của thông báo (có thể không bắt buộc)
  sx?: SxProps<Theme>; // Thuộc tính kiểu SX cho style tùy chỉnh của MUI
}

type Props = {
  children: React.ReactNode;
};

export interface IDashboardContext {
  ShowToast: (obj: any) => void;
}

export const DashboardContext = createContext<IDashboardContext | null>(null);

export default function DashboardLayout({ children }: Props) {
  const settings = useSettingsContext();

  const lgUp = useResponsive('up', 'lg');

  const nav = useBoolean();

  const isHorizontal = settings.themeLayout === 'horizontal';

  const isMini = settings.themeLayout === 'mini';

  const renderNavMini = <NavMini />;

  const renderHorizontal = <NavHorizontal />;

  const renderNavVertical = <NavVertical openNav={nav.value} onCloseNav={nav.onFalse} />;

  const [toast, settoast] = useState<any>({
    open: false,
    severity: '',
    description: '',
    title: '',
    sx: {},
  });

  const ShowToast = ({ severity, description, autoHideDuration, title, sx }: ToastOptions) => {
    settoast({
      open: true,
      severity,
      description,
      title,
      sx,
    });
    setTimeout(() => {
      settoast({ open: false, severity: '', description: '', title: '', sx: {} });
    }, autoHideDuration ?? 999999);
  };

  if (isHorizontal) {
    return (
      <>
        <Header onOpenNav={nav.onTrue} />

        {lgUp ? renderHorizontal : renderNavVertical}

        <Main>{children}</Main>
      </>
    );
  }

  if (isMini) {
    return (
      <>
        <Header onOpenNav={nav.onTrue} />

        <Box
          sx={{
            minHeight: 1,
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
          }}
        >
          {lgUp ? renderNavMini : renderNavVertical}

          <Main>{children}</Main>
        </Box>
      </>
    );
  }

  return (
    <DashboardContext.Provider value={{ ShowToast }}>
      <Header onOpenNav={nav.onTrue} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        {renderNavVertical}

        <Main>{children}</Main>
      </Box>

      <Collapse
        className="toast"
        in={toast.open}
        sx={{ position: 'fixed', top: 30, right: 10, zIndex: 1101, ...toast.sx }}
      >
        <Alert severity={toast.severity}>
          <AlertTitle>{toast.title}</AlertTitle>
          {toast.description}
        </Alert>
        <LinearProgress />
      </Collapse>
    </DashboardContext.Provider>
  );
}
