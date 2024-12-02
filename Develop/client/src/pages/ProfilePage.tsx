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

      // If a card is found, set it
      setCard(data); // Now data should be a single card object
    } catch (err) {
      console.error("Failed to retrieve card:", err);
    }
  }, []);

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if (loginCheck) {
      fetchCard();
      console.log("Logged in");
    }
  }, [loginCheck, fetchCard]);

  const handleLogin = () => {
    // Navigate to login page
    navigate("/login");
  };

  const handleCreateUser = () => {
    // Navigate to signup page
    navigate("/create-user");
  };

  const handleUpdateCard = () => {
    if (card) {
      navigate(`/update-card/${card.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {!loginCheck ? (
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-4xl mb-4">Welcome to LinkZen</h1>
          <button
            onClick={handleLogin}
            className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-6 rounded-md mb-4"
          >
            Login
          </button>
          <button
            onClick={handleCreateUser}
            className="bg-green-500 hover:bg-green-400 text-white py-2 px-6 rounded-md"
          >
            Create User
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-6">
          <h1 className="text-3xl font-bold mb-6">
           Welcome to your personal zen space 
          </h1>
          {/* Conditionally render the Create Card button only if no card exists */}
          {!card && (
            <Link
              to="/create-card"
              className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-6 rounded-md mb-6"
            >
              Create Your Zenlink Card!
            </Link>
          )}
          {card && (
            <button
              onClick={handleUpdateCard}
              className="bg-yellow-500 hover:bg-yellow-400 text-white py-2 px-6 rounded-md"
            >
              Update Card
            </button>
          )}
          {/* Conditionally render the user's card */}
          <div className="text-center space-y-6">
            {card ? (
              <div className="bg-gray-800 border-4 border-gray-600 rounded-lg p-6 shadow-lg">
                <p className="text-xl font-semibold">@ {card.username}</p>
                <div className="mt-4">
                  {card.links.length > 0 && (
                    <h3 className="text-lg font-semibold">Links:</h3>
                  )}
                  {card.links.map((link, index) => (
                    <div key={index} className="mt-2">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300"
                      >
                        {link.description}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-center items-center">
                  <img
                    className="w-32 h-32 rounded-full"
                    src="../../zenlink.png"
                    alt="ZenLink"
                  />
                </div>
              </div>
            ) : (
              <p className="text-xl">No card found. Please create your card.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
