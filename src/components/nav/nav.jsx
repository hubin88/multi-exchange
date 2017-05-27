/**
 * Created by wenxinfu on 2017/2/10.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './nav.scss';

class Nav extends Component {
  static propTypes = {
    navText: PropTypes.array,
    navLink: PropTypes.array,
    setIndex: PropTypes.func,
  }
  static defaultProps = {
    navText: [],
    navLink: [],
  }
  style = {
    width: `${(1 / this.props.navText.length) * 100}%`,
  }
  changeNav = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.target;
    const index = target.getAttribute('data-index');
    Array.from(this.nav.children).forEach((item) => {
      const val = item;
      val.style.borderBottom = 'none';
      val.style.color = 'black';
    });
    target.style.borderBottom = 'solid 2px #2f89eb';
    target.style.color = '#2f89eb';
    this.nav.style.borderBottom = 'none';
    if (this.props.setIndex) {
      this.props.setIndex(index);
    }
  }

  render() {
    const width = { width: `${(1 / this.props.navText.length) * 100}%` };
    return (
      <div styleName="nav">
        <nav>
          <ul
            styleName="nav-ul" className="navs" onClick={this.changeNav} ref={(ref) => {
              this.nav = ref;
            }}
          >
            {
              this.props.navText.map((item, index) =>
                <li
                  data-index={this.props.navLink[index]} key={index}
                  style={Object.assign({}, width)}
                >
                  {item}
                </li>
              )}

          </ul>

        </nav>
      </div>
    );
  }
}

export default cssModules(Nav, styles, { allowMultiple: true, errorWhenNotFound: false });
