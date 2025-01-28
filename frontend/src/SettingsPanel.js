import React from "react";
import { RotateCw } from "lucide-react";

function SettingsPanel({ language, setLanguage, seed, setSeed, likes, setLikes, reviews, setReviews }) {
  const randomizeSeed = () => setSeed(Math.floor(Math.random() * 100000000));

  return (
    <div className="container d-flex justify-content-center py-4">
      <div className="row align-items-center g-2">
        {/* Language Dropdown */}
        <div className="col-auto">
          <div className="text-xs text-gray-600 mb-1">Language</div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="form-select form-select-sm"
          >
            <option value="en-US">English (US)</option>
            <option value="fr-FR">Latin (LA)</option>
            <option value="es-ES">Spanish (ES)</option>
          </select>
        </div>

        {/* Seed Input */}
        <div className="col-auto">
          <div className="text-xs text-gray-600 mb-1">Seed</div>
          <div className="input-group input-group-sm">
            <input
              type="number"
              value={seed}
              onChange={(e) => setSeed(Number(e.target.value))}
              className="form-control"
            />
            <button
              onClick={randomizeSeed}
              className="btn btn-outline-secondary"
              title="Randomize"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Likes Slider */}
        <div className="col-auto">
          <div className="text-xs text-gray-600 mb-1">Likes</div>
          <div className="d-flex align-items-center gap-2">
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={likes}
              onChange={(e) => setLikes(Number(e.target.value))}
              className="form-range"
            />
            <input
              type="number"
              value={likes}
              onChange={(e) => setLikes(Number(e.target.value))}
              className="form-control form-control-sm text-end"
              step="0.1"
              style={{ width: "4rem" }}
            />
          </div>
        </div>

        {/* Reviews Input */}
        <div className="col-auto">
          <div className="text-xs text-gray-600 mb-1">Reviews</div>
          <input
            type="number"
            value={reviews}
            onChange={(e) => setReviews(Number(e.target.value))}
            className="form-control form-control-sm"
            step="0.1"
          />
        </div>
      </div>
    </div>
  );
}

export default SettingsPanel;
