import React from 'react';
import styles from 'styles/Loader.module.css';

const component = () => {
  return (
    <div className={styles.total}>
      <div className="relative w-[100px] h-[75px]">
        <img className={styles.spin} src="/images/loader.png" alt="Goodness Land loader image" />
      </div>
    </div>
  );
};
export default component;
