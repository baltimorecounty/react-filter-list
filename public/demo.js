'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var ReactDOM = _interopDefault(require('react-dom'));

const P = ({
  children,
  ...rest
}) => React.createElement("p", rest, children);

const Demo = props => {
  return React.createElement("div", {
    className: "demo"
  }, React.createElement("p", null, "Demo Stuff Goes here"), React.createElement(P, null, "This is some really meaningful text."), React.createElement(P, null, "This is some really meaningful text."), React.createElement(P, null, "This is some really meaningful text."), React.createElement(P, null, "This is some really meaningful text."), React.createElement(P, null, "This is some really meaningful text."), React.createElement(P, null, "This is some really meaningful text."), React.createElement(P, null, "This is some really meaningful text."));
};

const rootElement = document.getElementById("root");
ReactDOM.render(React.createElement(Demo, null), rootElement);
