/**
 * Created by dz on 16/9/26.
 */

import React, { PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './alert.scss';
import { insertComponent } from '../../ultils/helper';
import Dialog from '../customdialog/dialog';

@cssModules(styles, { errorWhenNotFound: false })
class AlertWrap extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.any.isRequired,
    onConfirm: PropTypes.func,
    style: PropTypes.object,
    onCloseCallback: PropTypes.func,
    isShowOk: PropTypes.bool,
    isShowCancel: PropTypes.bool,
    okText: PropTypes.string,
    cancelText: PropTypes.string,
  };

  static defaultProps = {
    title: '温馨提示',
    okText: '确定',
    cancelText: '取消',
    isShowOk: true,
    isShowCancel: true,
  };

  onConfirm = () => {
    if (this.props.onConfirm) this.props.onConfirm();
    this.dialog.close();
  };

  renderButtons() {
    if (this.props.onConfirm) {
      return (<div className="button-group" styleName="buttons">
        {
          this.props.isShowCancel ?
            <button
              className="button primary"
              onClick={() => this.dialog.close()}
            >{this.props.cancelText}</button> : null
        }
        {
          this.props.isShowOk ?
            <button
              className="button primary"
              onClick={this.onConfirm}
            >{this.props.okText}</button> : null
        }

      </div>);
    }
    return null;
  }

  render() {
    return (
      <Dialog
        title={this.props.title} ref={(ref) => { this.dialog = ref; }}
        style={this.props.style} onCloseCallback={this.props.onCloseCallback}
      >
        <div styleName="alert">
          <div styleName="content">
            {this.props.content }
          </div>
          {this.renderButtons()}
        </div>
      </Dialog>
    );
  }
}

export default class Alert extends AlertWrap {
  static show = (content, title = undefined,
                 onConfirm = undefined,
                 style = undefined,
                 onCloseCallback,
                 isShowOk,
                 isShowCancel,
                 okText,
                 cancelText) => {
    insertComponent(
      <AlertWrap
        content={content} title={title} onConfirm={onConfirm} style={style}
        onCloseCallback={onCloseCallback}
        isShowOk={isShowOk}
        isShowCancel={isShowCancel}
        okText={okText}
        cancelText={cancelText}
      />
    );
  };
}
