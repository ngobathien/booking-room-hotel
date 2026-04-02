import { useContact } from "../../../hooks/contacts/useContact";

const FloatingContact = () => {
  const { contact } = useContact();

  if (!contact) return null;

  return (
    <div className="fixed bottom-5 right-5 flex flex-col gap-3 z-50">
      {/* Zalo */}
      {contact.zalo && (
        <a
          href={`https://zalo.me/${contact.zalo}`}
          target="_blank"
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg"
        >
          Zalo
        </a>
      )}

      {/* Call */}
      {contact.phone && (
        <a
          href={`tel:${contact.phone}`}
          className="bg-green-500 text-white p-3 rounded-full shadow-lg"
        >
          Call
        </a>
      )}
    </div>
  );
};

export default FloatingContact;
