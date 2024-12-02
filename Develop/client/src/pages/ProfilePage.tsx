import { useEffect, useState, useLayoutEffect, useCallback } from "react";
import auth from "../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import { CardData } from "../interfaces/CardData";
import { retrieveCard } from "../api/cardAPI";

const ProfilePage = () => {
  const [loginCheck, setLoginCheck] = useState(false);
  const [card, setCard] = useState<CardData | null>(null); // Change to single card
  const navigate = useNavigate();

  // Check if the user is logged in
  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  // Fetch the user's card from the database
  const fetchCard = useCallback(async () => {
    try {
      const data = await retrieveCard();

      if (!data) {
        navigate("/create-card");
        return;
      }
      // If a card is found, set it
      setCard(data); // Now data should be a single card object
    } catch (err) {
      console.error("Failed to retrieve card:", err);
    }
  }, [navigate]);

  useEffect(() => {
    if (loginCheck) {
      fetchCard();
      console.log("Logged in");
    }
  }, [loginCheck, fetchCard]);

  return (
    <>
      {!loginCheck ? (
        <div>
          <h1>Login to create & view profile</h1>
        </div>
      ) : (
        <div>
          <h1>You are logged into Profile Page</h1>
          <Link to="/create-card">Create Your Zenlink Card!</Link>
          {/* Conditionally render the user's card */}
          <div>
            {card ? (
              <div className="text-2xl border-8 border-black rounded-lg">
                <p>@ {card.username}</p>
                <div>
                  <h3>Links:</h3>
                  {card.links.map((link, index) => (
                    <div key={index}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.description}
                      </a>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center items-center min-h-screen">
                  <img
                    className="w-32 h-32"
                    src="../../public/zenlink.png"
                    alt="ZenLink"
                  />
                </div>
              </div>
            ) : (
              <p>No card found. Please create your card.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
