import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CardData } from "../interfaces/CardData";
import { getCardById, updateCard } from "../api/cardAPI";

export default function UpdateCard() {
  const [card, setCard] = useState<CardData | null>(null);
  const [newLink, setNewLink] = useState<{ url: string; description: string }>({
    url: "",
    description: "",
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchCard = async () => {
      if (id) {
        try {
          const fetchedCard = await getCardById(parseInt(id));

          setCard(fetchedCard);
        } catch (error) {
          console.error("Error fetching card:", error);
        }
      }
    };
    fetchCard();
  }, [id]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCard((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLink((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmLink = () => {
    setCard((prev) => {
      if (!prev) return prev;
      const updatedLinks =
        editIndex !== null
          ? prev.links.map((link, index) =>
              index === editIndex ? newLink : link
            )
          : [...prev.links, newLink];

      return { ...prev, links: updatedLinks };
    });
    setNewLink({ url: "", description: "" });
    setEditIndex(null);
  };

  const handleEditLink = (index: number) => {
    if (card) {
      setNewLink(card.links[index]);
      setEditIndex(index);
    }
  };

  const handleDeleteLink = (index: number) => {
    setCard((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        links: prev.links.filter((_, i) => i !== index),
      };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (card) {
      await updateCard(card.id, card);
      navigate("/profile");
    }
  };

  if (!card) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-xl"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Update Your Card
        </h1>

        <label htmlFor="username" className="block text-lg font-semibold mb-2">
          Username
        </label>
        <input
          id="username"
          name="username"
          value={card.username}
          onChange={handleInputChange}
          className="w-full p-3 mb-4 bg-gray-700 text-white border border-gray-600 rounded-md"
        />

        <h2 className="text-2xl font-semibold mb-4 text-center">
          Update Links
        </h2>

        <div className="link-inputs space-y-4">
          <label htmlFor="url" className="block text-lg font-semibold">
            URL
          </label>
          <input
            id="url"
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
            {editIndex !== null ? "Update Link" : "Add Link"}
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-4 bg-green-500 text-white rounded-md hover:bg-green-400 transition duration-300"
        >
          Save Changes
        </button>
      </form>

      {/* Preview Section */}
      <div className="mt-8 w-full max-w-xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-center mb-4">Card Preview</h3>
        <h2 className="text-2xl font-semibold text-center mb-4">
          {card.username}
        </h2>
        <ul className="space-y-4">
          {card.links.map((link, index) => (
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
