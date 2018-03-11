import React, { Fragment } from "react";
import styles from "./index.css";
import M from "materialize-css";

import { Input, Button } from "components";

export class DateFilterCard extends React.Component {
  render() {
    const { dateMin, dateMax, onChangeDateMin, onChangeDateMax } = this.props;
    // const newdateMin =
    //   new Date(dateMin).getFullYear() +
    //   "-" +
    //   (new Date(dateMin).getMonth() + 1) +
    //   "-" +
    //   ("0" + new Date(dateMin).getDate()).slice(-2);
    // const newdateMax =
    //   new Date(dateMax).getFullYear() +
    //   "-" +
    //   (new Date(dateMax).getMonth() + 1) +
    //   "-" +
    //   ("0" + new Date(dateMax).getDate()).slice(-2);
    return (
      <div className={styles.container + " container row"}>
        <output className="left">По дате</output>
        <input
          id="date"
          type="date"
          value={dateMin}
          onInput={onChangeDateMin}
          className="col s4"
        />
        <input
          id="date"
          type="date"
          value={dateMax}
          onInput={onChangeDateMax}
          className="col s4"
        />
      </div>
    );
  }
}
export default DateFilterCard;
