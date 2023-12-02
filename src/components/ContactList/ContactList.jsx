import { ButtonDelete, ContactItem } from './ContactList.styled';

export const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul>
      {contacts.map(contact => (
        <ContactItem key={contact.id}>
          {contact.name}: {contact.number}
          <ButtonDelete
            type="button"
            onClick={() => onDeleteContact(contact.id)}
          >
            Delete
          </ButtonDelete>
        </ContactItem>
      ))}
    </ul>
  );
};
