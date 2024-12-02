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
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Update Your Card</h1>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          value={card.username}
          onChange={handleInputChange}
        />
        <h2>Update Links</h2>
        <div>
          <label htmlFor="url">URL</label>
          <input
            id="url"
            name="url"
            value={newLink.url}
            onChange={handleLinkChange}
          />
          <label htmlFor="description">URL Title</label>
          <input
            id="description"
            name="description"
            value={newLink.description}
            onChange={handleLinkChange}
          />
          <button type="button" onClick={handleConfirmLink}>
            {editIndex !== null ? "Update Link" : "Add Link"}
          </button>
        </div>
        <button type="submit">Save Changes</button>
      </form>

      <div>
        <h3>Card Preview</h3>
        <h2>{card.username}</h2>
        <ul>
          {card.links.map((link, index) => (
            <li key={index}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.description}
              </a>
              <button type="button" onClick={() => handleEditLink(index)}>
                Edit
              </button>
              <button type="button" onClick={() => handleDeleteLink(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
