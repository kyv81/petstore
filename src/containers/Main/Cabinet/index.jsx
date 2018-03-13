import React from 'react';
import { UserCard, UserAnimals } from 'containers';
import { connect } from 'react-redux';

// сделаем пропсом данного компонента данные из store redux
function mapStateToProps(state) {
  return {
    user: state.getIn(['auth', 'data']),
  };
}

@connect(mapStateToProps)
export default class Cabinet extends React.Component {
  render() {
    const { user } = this.props;
    const id = user.get('id');
    return id ? (
      <div className="row">
        <UserCard id={id} />
        <UserAnimals id={id} />
      </div>
    ) : null;
  }
}
