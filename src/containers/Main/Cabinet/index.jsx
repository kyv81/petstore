import React from 'react';
import { UserCard, UserAnimals } from 'containers';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// сделаем пропсом данного компонента данные из store redux
function mapStateToProps(state) {
  return {
    user: state.auth.data,
  };
}

@connect(mapStateToProps)
export default class Cabinet extends React.Component {
  render() {
    let { user: { id } } = this.props;
    return id ? (
      <div>
        <UserCard id={id} />
        <UserAnimals id={id} />
      </div>
    ) : null;
  }
}
