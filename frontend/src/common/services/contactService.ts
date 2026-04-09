import axios from "axios";
import type { Contact } from "../../types/contact.types";

export const getContact = async (): Promise<Contact> => {
  const res = await axios.get("/api/contact");
  return res.data;
};
