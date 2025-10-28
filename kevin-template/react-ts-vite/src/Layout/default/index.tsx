import React, { PureComponent } from 'react';
import styles from './index.module.scss'

function DefaultLayout(props: any) {
    
  return (
    <div className={styles.main}>
      <div className={styles.main__context}>
        {props.children}
      </div>
    </div>
  )
}
export default DefaultLayout