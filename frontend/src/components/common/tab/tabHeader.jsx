import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import If from "../operator/if";
import { selectTab } from "./tabActions";

export class TabHeader extends Component {
  render() {
    const selected = this.props.tab.selected === this.props.target,
      visible = this.props.tab.visible[this.props.target];

    return (
      <If test={visible}>
        <li className={selected ? "active" : ""}>
          <a
            href="javascript:;"
            data-toggle="tab"
            data-target={this.props.target}
            onClick={() => this.props.selectTab(this.props.target)}
          >
            <i className={`fa fa-${this.props.icon}`}></i> {this.props.label}
          </a>
        </li>
      </If>
    );
  }
}

const mapStateToProps = state => ({
  tab: state.tab
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ selectTab }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabHeader);
