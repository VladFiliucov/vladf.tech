import React from 'react';
import { render } from "react-dom";
import Highlight, { defaultProps } from "prism-react-renderer";
import Prism from 'prism-react-renderer/prism';
(typeof global !== 'undefined' ? global : window).Prism = Prism;

require('prismjs/components/prism-java');

const exampleCodetwo = `
(function someDemo() {
  var test = "Hello World!";
  console.log(test);
})();

return () => <App />;
`;

const exampleCode = `
def hello(arg)
  if arg > 2
    yield
  end
end
`;


const Syntax = () => {
  return (
    <section>
      <h1>Syntax page</h1>
      <Highlight {...defaultProps} code={exampleCode} language="python">
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
    </section>
  )
}

export default Syntax
