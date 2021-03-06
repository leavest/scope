import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { trackAnalyticsEvent } from '../utils/tracking-utils';


class ViewModeButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    trackAnalyticsEvent('scope.layout.selector.click', {
      layout: this.props.viewMode,
      parentTopologyId: this.props.currentTopology.get('parentId'),
      topologyId: this.props.currentTopology.get('id'),
    });
    this.props.onClick();
  }

  render() {
    const { label, viewMode, disabled } = this.props;

    const isSelected = (this.props.topologyViewMode === viewMode);
    const className = classNames(`tour-step-anchor view-mode-selector-action view-${label}-action`, {
      'view-mode-selector-action-selected': isSelected,
    });

    return (
      <div
        className={className}
        disabled={disabled}
        onClick={!disabled ? this.handleClick : undefined}
        title={`View ${label.toLowerCase()}`}>
        <i className={this.props.icons} />
        <span className="label">{label}</span>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentTopology: state.get('currentTopology'),
    topologyViewMode: state.get('topologyViewMode'),
  };
}

export default connect(mapStateToProps)(ViewModeButton);
