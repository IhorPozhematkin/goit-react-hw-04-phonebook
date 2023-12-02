import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { PhonebookTitle, ContactsTitle, Wrapper } from './App.styled';
import { nanoid } from 'nanoid';

const CONTACTS = 'contacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem(CONTACTS));
    savedContacts &&
      this.setState({
        contacts: savedContacts,
      });
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem(CONTACTS, JSON.stringify(this.state.contacts));
    }
  }

  addContact = newContact => {
    const duplicate = this.state.contacts.find(
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
    this.setState(prev => ({
      contacts: [...prev.contacts, contactObj],
    }));
  };

  onDeleteContact = contactId => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(({ id }) => id !== contactId),
    }));
  };

  handleFind = e => {
    this.setState({ filter: e.target.value });
  };

  filterContactsByName = () => {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase().trim())
    );
    return filteredContacts;
  };

  render() {
    return (
      <Wrapper>
        <PhonebookTitle>Phonebook</PhonebookTitle>
        <ContactForm addContact={this.addContact} />
        <Filter filter={this.state.filter} handleFind={this.handleFind} />
        <ContactsTitle>Contacts</ContactsTitle>
        <ContactList
          contacts={this.filterContactsByName()}
          onDeleteContact={this.onDeleteContact}
        />
      </Wrapper>
    );
  }
}
