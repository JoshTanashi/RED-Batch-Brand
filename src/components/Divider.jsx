import { C } from '../lib/theme';

export const Divider = ({ color = C.line }) => (
  <div style={{ borderBottom: `1px solid ${color}`, width: '100%' }} />
);
