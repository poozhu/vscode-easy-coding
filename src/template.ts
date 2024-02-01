const tsxStr = `import React from "react";

import styles from "./index.less";

interface Props {
  [key: string]: any;
}
const {{componentName}}: React.FC<Props> = () => {
  return <div className={styles.{{className}}}>
    
  </div>;
};

export default {{componentName}};`;

const lessStr = `.{{className}} {

}
`;

export { tsxStr, lessStr };
