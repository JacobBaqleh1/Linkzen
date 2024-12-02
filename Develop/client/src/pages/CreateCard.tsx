import { useNavigate } from "react-router-dom";
import { useState, FormEvent, ChangeEvent } from "react";
import { CardData } from "../interfaces/CardData";
import { createCard } from "../api/cardAPI";

export default function CreateCard() {
  const [newCard, setNewCard] = useState<CardData | undefined>({
    id: 0,
    username: "",
    links: [],
  });

  const [newLink, setNewLink] = useState<{ url: string; description: string }>({
    url: "",
    description: "",
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newCard) {
      const data = await createCard(newCard);
      console.log(data);
      navigate("/profile");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCard((prev) => (prev ? { ...prev, [name]: value } : undefined));
  };

  // Handle link input change
  const handleLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLink((prev) => ({ ...prev, [name]: value }));
  };

  // Handle confirm link addition
  const handleConfirmLink = () => {
    setNewCard((prev) => {
      if (!prev) return prev;
      const updatedLinks =
        editIndex !== null
          ? prev.links.map((link, index) =>
              index === editIndex ? newLink : link
            )
          : [...prev.links, newLink];

      return { ...prev, links: updatedLinks };
    });
    setNewLink({ url: "", description: "" }); // Reset the input fields
    setEditIndex(null); // Reset the edit index
  };

  const handleEditLink = (index: number) => {
    if (newCard) {
      // Check if newCard is not undefined
      // Populate the input fields with link data to be edited
      setNewLink(newCard.links[index]);
      // Track the editing
      setEditIndex(index);
    }
  };

  const handleDeleteLink = (index: number) => {
    setNewCard((prev) => {
      if (!prev) return undefined; // Ensure `prev` is defined
      return {
        ...prev,
        links: prev.links.filter((_, i) => i !== index), // Filter the links array
      };
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-xl"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Create Your ZenLink Card
        </h1>

        <label htmlFor="username" className="block text-lg font-semibold mb-2">
          Enter in your User Name
        </label>
        <input
          id="username"
          name="username"
          placeholder="CrazyJoe123"
          value={newCard ? newCard.username : ""}
          onChange={handleInputChange}
          className="w-full p-3 mb-4 bg-gray-700 text-white border border-gray-600 rounded-md"
        />

        <h2 className="text-2xl font-semibold mb-4 text-center">
          Get started by adding your links!
        </h2>

        <div className="link-inputs space-y-4">
          <label htmlFor="url" className="block text-lg font-semibold">
            URL
          </label>
          <input
            id="url"
            type="text"
            name="url"
            value={newLink.url}
            onChange={handleLinkChange}
            className="w-full p-3 mb-2 bg-gray-700 text-white border border-gray-600 rounded-md"
          />

          <label htmlFor="description" className="block text-lg font-semibold">
            URL Title
          </label>
          <input
            id="description"
            type="text"
            name="description"
            value={newLink.description}
            onChange={handleLinkChange}
            className="w-full p-3 mb-4 bg-gray-700 text-white border border-gray-600 rounded-md"
          />

          <button
            type="button"
            onClick={handleConfirmLink}
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition duration-300"
          >
            {editIndex !== null ? "Update Link" : "Confirm Link"}
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-4 bg-green-500 text-white rounded-md hover:bg-green-400 transition duration-300"
        >
          Create Card
        </button>
      </form>

      {/* Card Preview */}
      <div className="mt-8 w-full max-w-xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-center mb-4">Card Preview</h3>
        <h2 className="text-2xl font-semibold text-center mb-4">
          {newCard ? newCard.username : ""}
        </h2>
        <ul className="space-y-4">
          {newCard?.links?.map((link, index) => (
            <li
              key={index}
              className="flex justify-between items-center text-lg"
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                {link.description}
              </a>
              <div className="space-x-2">
                <button
                  type="button"
                  onClick={() => handleEditLink(index)}
                  className="text-yellow-400 hover:text-yellow-300"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteLink(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
