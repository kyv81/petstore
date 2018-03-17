import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import { UserAnimalsListItem, EditAnimalCard, FAB } from 'components';
import { ModalContainer } from 'containers';

export default class UserAnimalsList extends React.PureComponent {
  state = {
    animal: {
      id: '',
      salerId: '',
      imgUrl: '',
      name: '',
      description: '',
      date: '',
      price: '',
    },
    modal: '',
  };

  static propTypes = {
    isEditable: PropTypes.bool,
    animals: PropTypes.instanceOf(List),
    storageRef: PropTypes.object,
    onUploadStart: PropTypes.func,
    onUploadError: PropTypes.func,
    onUploadSuccess: PropTypes.func,
    onEdit: PropTypes.func,
    onCreate: PropTypes.func,
    onRemove: PropTypes.func,
  };

  showEditModal = animal => {
    this.setState({
      animal: animal.toJS(),
      modal: 'edit',
    });
  };

  showCreateModal = () => {
    this.setState({
      animal: {
        id: '',
        salerId: '',
        imgUrl: '',
        name: '',
        description: '',
        date: '',
        price: '',
      },
      modal: 'create',
    });
  };

  handleCancel = () => {
    this.setState({ modal: '' });
  };

  onRemove = animal => {
    const { onRemove } = this.props;
    this.handleCancel();
    onRemove(animal);
  };

  onEdit = animal => {
    const { onEdit } = this.props;
    this.handleCancel();
    onEdit(animal);
  };

  onCreate = animal => {
    const { onCreate } = this.props;
    this.handleCancel();
    onCreate(animal);
  };

  render() {
    const {
      isEditable,
      animals,
      storageRef,
      onUploadStart,
      onUploadError,
      onUploadSuccess,
    } = this.props;
    const { modal } = this.state;

    const animalsList = animals.map(animal => {
      return (
        <UserAnimalsListItem
          key={animal.get('id')}
          animal={animal}
          isEditable={isEditable}
          onEdit={this.showEditModal}
          onRemove={this.onRemove}
          storageRef={storageRef}
          onUploadStart={onUploadStart}
          onUploadError={onUploadError}
          onUploadSuccess={onUploadSuccess}
        />
      );
    });

    return (
      <React.Fragment>
        {modal && (
          <ModalContainer>
            <EditAnimalCard
              animal={this.state.animal}
              onCancel={this.handleCancel}
              onSubmit={modal === 'edit' ? this.onEdit : this.onCreate}
            />
          </ModalContainer>
        )}
        {animalsList}
        {isEditable && <FAB onClick={this.showCreateModal} />}
      </React.Fragment>
    );
  }
}
