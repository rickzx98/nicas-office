import PropTypes from 'prop-types';
import React from 'react';

export class CollapseHeader extends React.Component {
  constructor(props) {
    super(props);
    this.panelStyle = 'collapse-header panel ' + (props.panelStyle || 'panel-default');
    this.collapse = this.onCollapse.bind(this);
    this.state = { collapsed: !!props.collapsed };
  }
  onCollapse() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    return (<div className={this.panelStyle}>
      <div className="panel-heading" onClick={this.collapse}>
        <div className="panel-title">{this.props.heading}</div>
        <div className="actions">{this.state.collapsed ? <i className="glyphicon glyphicon-menu-left" /> :
          <i className="glyphicon glyphicon-menu-down" />}</div>
      </div>
      {!this.state.collapsed && <div className="panel-body">{this.props.body || this.props.children}</div>}
    </div>);
  }
}

CollapseHeader.propTypes = {
  heading: PropTypes.object.isRequired,
  body: PropTypes.object,
  children: PropTypes.object,
  panelStyle: PropTypes.string
};
