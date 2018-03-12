import React, { Fragment } from "react";
import styles from "./index.css";

import { Input, Button } from "components";

export class DateFilterCard extends React.Component {
  render() {
    const { dateMin, dateMax, onChangeDateMin, onChangeDateMax } = this.props;
    return (
      <div className={styles.container + " container row"}>
        <output className="left">По дате</output>
        <input
          id="date"
          type="date"
          defaultValue={dateMin}
          onInput={onChangeDateMin}
          className="col s4"
        />
        <input
          id="date"
          type="date"
          defaultValue={dateMax}
          onInput={onChangeDateMax}
          className="col s4"
        />
      </div>
    );
  }
}
export default DateFilterCard;
