import { useState } from 'react';

import { Header } from "./components/Header.js"
import { Tile } from './components/Tile.js';
import { Edit } from './components/Edit.js';
import { LocationRow } from './components/LocationRow.js';
import { EditLocation } from './components/EditLocation.js';
import { AddLocation } from './components/AddLocation.js';

// import ferrariImage from "../public/ferrari.png"; 
const cars = [
  { image: "https://www.usinenouvelle.com/mediatheque/2/3/9/001298932_1200x800_c.jpg", model: "Bugatti Chiron", plate: "FW-245-MD" },
  //{ image: ferrariImage, model: "Ferrari 812 Superfast", plate: "AB-763-LP" },
  { image: "https://www.automotivpress.fr/wp-content/uploads/2019/03/Lamborghini-Aventador-SVJ-Roadster-8.jpg", model: "Lamborghini Aventador SVJ", plate: "QR-982-ZX" },
  { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_IrIRnm_G2Fj-KNpDNNe70-9JPlivwQbHSA&s", model: "Rolls-Royce Phantom", plate: "XT-527-KH" },
  { image: "https://i.gaw.to/content/photos/41/69/416992-la-nouvelle-porsche-911-turbo-s-grimpe-a-641-chevaux.jpg", model: "Porsche 911 Turbo S", plate: "YL-318-WG" },
  { image: "https://i1.wp.com/pdlv.fr/wp-content/uploads/2021/11/70292-autoart-aston-martin-dbs-2.jpg?fit=1200%2C723", model: "Aston Martin DBS Superleggera", plate: "MK-654-VT" },
  { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScOsqXe7iLU7dHDVqHPEPb7PAfX-dad0QJFA&s", model: "Bentley Continental GT", plate: "DN-432-XC" },
  { image: "https://cdn.motor1.com/images/mgl/pEblJ/s3/maserati-mc20.jpg", model: "Maserati MC20", plate: "ZH-871-BQ" },
  { image: "https://mclaren.scene7.com/is/image/mclaren/765lt-3-1200x1200-1:crop-4x3?wid=1920&hei=1440", model: "McLaren 765LT", plate: "GT-609-FY" },
  { image: "https://carfans.fr/wp-content/uploads/2023/09/Mercedes-AMG-GT-black-series-occasion_1-scaled.jpg.webp", model: "Mercedes-AMG GT Black Series", plate: "PJ-728-RM" },
  { image: "https://lesvoitures.fr/wp-content/uploads/2018/07/audi-r8-v10-plus-audi-sport-performance-2018.jpg", model: "Audi R8 V10 Performance", plate: "LX-875-DP" },
  { image: "https://auto.cdn-rivamedia.com/photos/annoncecli/big/bmw-m8-competition-coupe-157953642.jpg", model: "BMW M8 Competition", plate: "KY-562-TB" },
  { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLR_fpXtvlGl8FKdzpbIPeXuue0DIUZsoGHA&s", model: "Jaguar F-Type R", plate: "OS-903-LN" },
  { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqKsjrD7AVwpiCotPiIxBEOtAa-jbDIeChEw&s", model: "Lexus LC 500", plate: "EV-146-QZ" }
];

const initialLocations = [
  { plate: "FW-245-MD", model: "Bugatti Chiron", startTime: "2025-03-26", endTime: "2025-05-11", userId: "mathis"},
  { plate: "QR-982-ZX", model: "Lamborghini Aventador SVJ", startTime: "2025-02-26", endTime: "2025-06-25", userId: "anais"},
  { plate: "YL-318-WG", model: "Porsche 911 Turbo S", startTime: "2025-04-05", endTime: "2025-04-30", userId: "charles"},
  { plate: "PJ-728-RM", model: "Mercedes-AMG GT Black Series", startTime: "2025-05-12", endTime: "2025-07-26", userId: "paulhenri"}
]

export function Admin() {
  const [activeTab, setActiveTab] = useState(0);
  const [editTab, setEditTab] = useState(false);
  const [editLoc, setEditLoc] = useState(false);
  const [addLocationMode, setAddLocationMode] = useState(false);
  const [locations, setLocations] = useState(initialLocations);

  const handleDelete = (plate) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cette location ?");
    if (confirmDelete) {
      setLocations(locations.filter(location => location.plate !== plate));
    }
  };

  return (
    <div>
      <Header activeTab={activeTab} setActiveTab={setActiveTab}/>

      {/* Vehicles Management */}
      {activeTab===0 && editTab===false && (
        <div className="container mt-4">
          <div className="row g-4">
          <button type="button" className="btn btn-secondary btn-lg" onClick={() => setEditTab(true)}>Ajouter un véhicule +</button>
            {cars.map((car, index) => (
              <Tile key={index} image={car.image} model={car.model} plate={car.plate} setEditTab={setEditTab}/>
            ))}
          </div>
      </div>
      )}

      {activeTab===0 && editTab===true && (
        <Edit setEditTab={setEditTab}></Edit>
      )}

      {/* Location Management */}
      {activeTab === 1 && !editLoc && !addLocationMode && (
        <div className="container mt-4">
          <button type="button" className="btn btn-secondary btn-lg mb-3" onClick={() => setAddLocationMode(true)}>Ajouter une location +</button>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Plaque</th>
                <th>Modèle</th>
                <th>Utilisateur</th>
                <th>Début</th>
                <th>Fin</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location, index) => (
                <LocationRow key={index} plate={location.plate} model={location.model} startTime={location.startTime} endTime={location.endTime} userId={location.userId} setEditLoc={setEditLoc} handleDelete={handleDelete}/>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Location Page */}
      {activeTab === 1 && addLocationMode && (
        <AddLocation
          setAddLocationMode={setAddLocationMode}
          locations={locations}
          setLocations={setLocations}
        />
      )}

      {/* Edit Location Page*/}
      {activeTab === 1 && editLoc && (
        <EditLocation 
          setEditLoc={setEditLoc} 
          selectedLocation={editLoc}
          locations={locations}
          setLocations={setLocations}
        />
      )}
    </div>
  );
}
