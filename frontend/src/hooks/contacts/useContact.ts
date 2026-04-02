import { useEffect, useState } from "react";
import { getContact } from "../../common/services/contactService";
import type { Contact } from "../../types/contact.types";

export const useContact = () => {
  const [contact, setContact] = useState<Contact | null>(null);

  useEffect(() => {
    const fetchContact = async () => {
      const data = await getContact();
      setContact(data);
    };
    fetchContact();
  }, []);

  return { contact };
};
