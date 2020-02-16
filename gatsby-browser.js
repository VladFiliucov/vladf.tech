// exports.onPreRouteUpdate = ({ location }) => {
//   console.log("Gatsby started to change location", location.pathname)
// }
import './src/pages/global.css'
import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { Typography } from 'antd';
import Highlight, { defaultProps } from "prism-react-renderer";
import Prism from 'prism-react-renderer/prism';
(typeof global !== 'undefined' ? global : window).Prism = Prism;

require('prismjs/components/prism-ruby');

const { Text } = Typography;

const components = {
  p: props => <Text>{props.children}</Text>,
  pre: props => {
    const className = props.children.props.className || "";
    const matches = className.match(/language-(?<lang>.*)/);

    return (
      <Highlight
        {...defaultProps}
        code={props.children.props.children}
        language={
          matches && matches.groups && matches.groups.lang
            ? matches.groups.lang
            : ""
        }
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    )
  }
}
export const wrapRootElement = ({ element }) => {
  return (
    <MDXProvider components={components}>
      {element}
    </MDXProvider>
  )
}
