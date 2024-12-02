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
      if (!prev) return prev; // Ensure prev is defined
      const updatedLinks =
        editIndex !== null
          ? // Update an existing link
            prev.links.map((link, index) =>
              index === editIndex ? newLink : link
            )
          : // Add new link
            [...prev.links, newLink];

      return { ...prev, links: updatedLinks };
    });
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
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Enter in your User Name</label>
        <input
          id="username"
          name="username"
          placeholder="@CrazyJoe123"
          value={newCard ? newCard.username : ""}
          onChange={handleInputChange}
        />
        <h2>Get started adding your links!</h2>
        <div className="link-inputs">
          <label htmlFor="url">URL</label>
          <input
            id="url"
            type="text"
            name="url"
            value={newLink.url}
            onChange={handleLinkChange}
          />
          <label htmlFor="description">URL Title</label>
          <input
            id="description"
            type="text"
            name="description"
            value={newLink.description}
            onChange={handleLinkChange}
          />
          <button type="button" onClick={handleConfirmLink}>
            {editIndex !== null ? "Update Link" : "Confirm Link"}
          </button>
        </div>
        <button type="submit">Create Card</button>
      </form>
      {/* the users card preview */}
      <h3> Card Preview:</h3>
      <h2>{newCard ? newCard.username : ""}</h2>
      <ul>
        {newCard?.links?.map((link, index) => (
          <li key={index}>
            <a href={link.url}>{link.description}</a>
            <br />
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
  );
}
