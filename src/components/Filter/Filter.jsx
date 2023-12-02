import { ContactsTitle } from 'components/App.styled';
import { FindInput } from './Filter.styled';

export const Filter = ({ filter, handleFind }) => {
  return (
    <div>
      <ContactsTitle>Find contacts by name</ContactsTitle>
      <FindInput type="text" value={filter} onChange={handleFind} />
    </div>
  );
};
