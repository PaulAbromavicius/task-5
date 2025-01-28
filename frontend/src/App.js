// App.js
import React, { useState } from "react";
import BooksTable from "./BooksTable";
import SettingsPanel from "./SettingsPanel";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [seed, setSeed] = useState(1234);
  const [language, setLanguage] = useState("en-US");
  const [likes, setLikes] = useState(5);
  const [reviews, setReviews] = useState(3);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      
      
      <div className="max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-lg">
        <SettingsPanel
          language={language}
          setLanguage={setLanguage}
          seed={seed}
          setSeed={setSeed}
          likes={likes}
          setLikes={setLikes}
          reviews={reviews}
          setReviews={setReviews}
        />
      </div>
      
      <div className="mt-8">
        <BooksTable
          seed={seed}
          language={language}
          likes={likes}
          reviews={reviews}
        />
      </div>
    </div>
  );
};

export default App;
