import '../../images/profile.jpg';

import { APP_NAME, LABEL_CUSTOMERS, LABEL_ORDERS, LABEL_SETTINGS } from '../../labels/';

import FontAwesome from 'react-fontawesome';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Navbar from 'react-bootstrap/lib/Navbar';
import React from 'react';
import { browserHistory } from 'react-router';

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.goToSettingsFromHeader = this.goToSettings.bind(this);
    this.goToCustomersFromHeader = this.goToCustomers.bind(this);
    this.goToOrdersFromHeader = this.goToOrders.bind(this);
  }
  goToSettings() {
    browserHistory.push('/settings');
  }
  goToCustomers() {
    browserHistory.push('/customers');
  }
  goToOrders() {
    browserHistory.push('/orders');
  }
  render() {
    return (<Navbar collapseOnSelect fixedTop={true} fluid={true}>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">{APP_NAME}</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem onClick={this.goToOrdersFromHeader} eventKey={1} href="#"><FontAwesome size="lg" name="briefcase" />&nbsp;{LABEL_ORDERS}</NavItem>
          <NavItem onClick={this.goToCustomersFromHeader} eventKey={2} href="#"><FontAwesome size="lg" name="users" />&nbsp;{LABEL_CUSTOMERS}</NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem onClick={this.goToSettingsFromHeader}><FontAwesome size="lg" name="gear" fixedWidth={true} />&nbsp;{LABEL_SETTINGS}</NavItem>
          <NavItem><img className="header-thumbnail" height="24" width="24" src="/profile.jpg" />&nbsp;Jerico de Guzman</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>);
  }
}
