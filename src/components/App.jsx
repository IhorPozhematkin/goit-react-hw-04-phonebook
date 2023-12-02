import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { PhonebookTitle, ContactsTitle, Wrapper } from './App.styled';
import { nanoid } from 'nanoid';

const CONTACTS = 'contacts';

export function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem(CONTACTS));
    console.log('Saved Contacts from localStorage:', savedContacts);
    savedContacts && setContacts(savedContacts);
  }, []);

  useEffect(() => {
    if (!contacts.length) {
      return;
    }
    localStorage.setItem(CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    const duplicate = contacts.find(
      contact =>
        contact.name.toLowerCase() === newContact.name.toLowerCase().trim()
    );
    const contactObj = {
      ...newContact,
      id: nanoid(),
    };
    if (duplicate) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }
    setContacts(state => [...state, contactObj]);
  };

  const onDeleteContact = contactId => {
    setContacts(state => state.filter(({ id }) => id !== contactId));
  };

  const handleFind = e => {
    setFilter(e.target.value);
  };

  const filterContactsByName = () => {
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase().trim())
    );
    return filteredContacts;
  };

  return (
    <Wrapper>
      <PhonebookTitle>Phonebook</PhonebookTitle>
      <ContactForm addContact={addContact} />
      <Filter filter={filter} handleFind={handleFind} />
      <ContactsTitle>Contacts</ContactsTitle>
      <ContactList
        contacts={filterContactsByName()}
        onDeleteContact={onDeleteContact}
      />
    </Wrapper>
  );
}
