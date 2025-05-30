import Fond from '../utile/style.jsx';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logged from "../Contexts/Authenticated.js";
import {SeeUnconfirmed} from "../Locations/seeBookings.jsx";
import { useCSRF } from "../Contexts/CsrfContext";



export default function Confirmation(){
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { csrfToken } = useCSRF();
    const [options, setOptions] = useState({
        gps: false,
        siegeBebe: false,
        assurance: false,
    });
    const selectedOptions = Object.keys(options).filter((opt) => options[opt]); //prend toutes les cles de options et filtre pour avoir les True
    const handleAction = async () => {
        try {
          const response = await fetch("/api/bookings/validate-user-bookings", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-Token': csrfToken
            },
            credentials: "include",
            body: JSON.stringify({
                options: selectedOptions,
              }),
          });
      
          if (!response.ok) {
            console.error("Erreur lors de la validation des réservations.");
          }
        } catch (err) {
          console.error("Erreur réseau :", err);
        }
      
        setIsOpen(false); 
        navigate("/user");
      };
  
    const handleOptionChange = (option) => {
      setOptions((prev) => ({ ...prev, [option]: !prev[option] }));
    };

    return (
        <Logged>
        <Fond>
          <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
          <SeeUnconfirmed/>
            {/* Section Options */}
            <div className="mt-6 mb-6">
              <label className="block font-semibold text-lg">Options :</label>
              <div className="flex flex-col gap-4 mt-4">
                {Object.keys(options).map((opt) => (
                  <label key={opt} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={options[opt]}
                      onChange={() => handleOptionChange(opt)}
                      className="w-5 h-5"
                    />
                    {opt === "gps" && "GPS"}
                    {opt === "siegeBebe" && "Siège Bébé"}
                    {opt === "assurance" && "Assurance"}
                  </label>
                ))}
              </div>
            </div>
    
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setIsOpen(true)}
                className="bg-gray-800 text-white px-8 py-3 rounded-lg text-lg hover:bg-black transition"
              >
                Paiement
              </button>
            </div>
            {isOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                  <h2 className="text-xl font-semibold text-center">Paiement</h2>
                  <p className="mt-4 text-center text-gray-700">
                    Ici vous payez cher par carte!
                  </p>
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={handleAction}
                      className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-black transition"
                    >
                      Paiement réussi (temporaire)
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Fond>
        </Logged>
      );
}

