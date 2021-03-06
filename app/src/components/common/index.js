import React from 'react';
import ReactBootstrapDatePicker from 'react-bootstrap-date-picker';
import ReactFontAwesome from 'react-fontawesome';
import ReactLoading from 'react-loading';
import TP from 'react-bootstrap-time-picker';
import bPagination from 'react-bootstrap/lib/Pagination';
export { CancelModalBody } from './CancelModalBody';
export { CancelModalFooter } from './CancelModalFooter';
export { BackButton } from './BackButton';
export { SearchSelector } from './SearchSelector';
export { Selector } from './Selector';
export { TextInput } from './TextInput';
export { CollapseHeader } from './CollapseHeader';
export { FormGroup } from './FormGroup';
export { Header } from './Header';
export { TextArea } from './TextArea';
export { ListForm } from './ListForm';
export { ResponsiveButton } from './ResponsiveButton';
export { DeleteModalBody } from './DeleteModalBody';
export { PageHeader } from './PageHeader';
export { PageBody } from './PageBody';
export { LoadingBalls } from './LoadingBalls';
export const Loading = () => {
  return (<ReactLoading type="spin" color="#E67E22" height={39} width={39} delay={100} />);
};
export const FontAwesome = ReactFontAwesome;
export const DatePicker = ReactBootstrapDatePicker;
export const Pagination = bPagination;
export const TimePicker = TP;
export { Page } from './Page';
