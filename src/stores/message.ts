import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// 单个联系人信息
interface Contact {
  id: string;           
  name: string;
  img:string;        
  latestMessage: string; 
  latestTime: string;     
  unread?: number;     
}

// 单个对话的消息记录
interface MessageRecord {
  contactId: string;    
  messages: Array<{
    content: string;   
    time: string;      
    isSelf: boolean;    
  }>;
}

export const useMessageStore = defineStore('message', () => {
  const contacts = ref<Contact[]>([]);
  const messageRecords = ref<Record<string, MessageRecord>>({});

  const hasContacts = computed(() => contacts.value.length > 0);

  const addOrUpdateContact = (contact: Omit<Contact, 'latestMessage' | 'latestTime' | 'queueId'>) => {
    const existingIndex = contacts.value.findIndex(c => c.id === contact.id);
    
    if (existingIndex > -1) {
      contacts.value[existingIndex] = {
        ...contacts.value[existingIndex],
        ...contact
      };
    } else {

      contacts.value.push({
        ...contact,
        latestMessage: '',
        latestTime: '',
        unread: 0
      });
      
      messageRecords.value[contact.id] = {
        contactId: contact.id,
        messages: []
      };
    }
  };


  const addMessage = (contactId: string, message: string, isSelf: boolean = false) => {
    const contact = contacts.value.find(c => c.id === contactId);
    const contactIndex = contacts.value.findIndex(c => c.id === contactId);
    if (!contact) return; 

    const now = new Date().toLocaleTimeString(); 
    

    if (!messageRecords.value[contactId]) {
      messageRecords.value[contactId] = { contactId, messages: [] };
    }
    messageRecords.value[contactId].messages.push({
      content: message,
      time: now,
      isSelf
    });

    contact.latestMessage = message;
    contact.latestTime = now;
    contacts.value.unshift(contact);
    contacts.value.splice(contactIndex+1,contactIndex+1);
    
    // 如果是对方发送的消息，增加未读计数
    if (!isSelf) {
      contact.unread = (contact.unread || 0) + 1;
    }

    floatContactToTop(contactId);
  };


  const floatContactToTop = (contactId: string) => {
    const index = contacts.value.findIndex(c => c.id === contactId);
    if (index > 0) { 
 
      const [movedContact] = contacts.value.splice(index, 1);
      contacts.value.unshift(movedContact);
    }
  };

  const getContactMessages = (contactId: string) => {
    return messageRecords.value[contactId]?.messages || [];
  };

  const markIfRead = (contactId: string) => {
    const contact = contacts.value.find(c => c.id === contactId);
    if (contact) {
      contact.unread = 0;
    }
  };

  return {

    contacts,
    messageRecords,
    
    hasContacts,
    
    addOrUpdateContact,
    addMessage,
    getContactMessages,
    markIfRead,
    floatContactToTop
  };
});
