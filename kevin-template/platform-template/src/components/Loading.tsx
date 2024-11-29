import { Spin } from "antd";
import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
function LoadingComp(props: any) {
  return (
    <div className={styles.loadingBox1}>
      <div className={styles.cube}>
        <div className={`${styles.box} ${styles.box1}`}>
          <h1>.</h1>
        </div>
        <div className={`${styles.box} ${styles.box2}`}>
          <h1>.</h1>
        </div>
        <div className={`${styles.box} ${styles.box3}`}>
          <h1>.</h1>
        </div>
        <div className={`${styles.box} ${styles.box4}`}>
          <h1>.</h1>
        </div>
        <div className={`${styles.box} ${styles.box5}`}>
          <h1>.</h1>
        </div>
        <div className={`${styles.box} ${styles.box6}`}>
          <h1>.</h1>
        </div>
      </div>
    </div>
  );
}
export default LoadingComp;
