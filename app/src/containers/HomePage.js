import * as actions from '../actions/HomeActions';
import * as alertActions from '../actions/NotificationActions';

import { HomePageIndex } from '../components/home/';
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getPage } from '../utils/';

export class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.thisOnChange = this.onChange.bind(this);
    this.thisOnSubmit = this.onSubmit.bind(this);
    this.thisPaginate = this.paginate.bind(this);
    this.thisDownloadAsCsv = this.downloadAsCsv.bind(this);
  }
  onChange(event) {
    this.props.actions.setHomeSearchField(event.target.name, event.target.value);
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.actions.loadOrders();
  }
  downloadAsCsv() {
    this.props.actions.downloadAsCSV();
  }
  paginate(page_current) {
    this.props.actions.loadOrders({ page_current, page_offset: getPage(this.props.home.orders.limit, page_current) });
  }
  render() {
    return (<HomePageIndex
      downloadAsCsv={this.thisDownloadAsCsv}
      onPaginate={this.thisPaginate}
      onSubmit={this.thisOnSubmit}
      home={this.props.home}
      onChange={this.thisOnChange}
      user={this.props.user}
      ajaxGlobal={this.props.ajaxGlobal} />);
  }
}

HomePage.propTypes = {
  user: PropTypes.object.isRequired,
  ajaxGlobal: PropTypes.object.isRequired,
  home: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    ajaxGlobal: state.ajaxGlobal,
    home: state.home
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    alertActions: bindActionCreators(alertActions, dispatch)
  };
}

export const ConnectedHomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
