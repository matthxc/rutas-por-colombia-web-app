import styled from 'styled-components';

// Antd
import AntDrawer from 'antd/lib/drawer';

export const Drawer = styled(AntDrawer)`
  &&& {
    .ant-drawer-content-wrapper {
      max-width: 560px;
    }
  }
`;
