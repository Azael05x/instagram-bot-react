import * as React from "react";
import * as styles from "./NoDataOverlay.scss";

export const NoDataOverlay: React.FC  = () => {
  return (
    <div className={styles.noDataChartOverlay}>
      No data at the moment 😟<br/>
      Try other options or Come back later!
    </div>
  );
};
