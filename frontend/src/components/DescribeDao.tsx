import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar'; // Import the progress bar component


function DescribeDao() {
  const [name, setName] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/define-membership");
  };

  const handleBack = () => {
    navigate('/select-dao-type'); // Navigate back to the previous page (Select DAO Type)
  };

  return (
    <div className="container mx-auto py-10">
      {/* Progress Bar - 2 out of 5 steps */}
      <ProgressBar currentStep={2} totalSteps={5} />
      
      <h1 className="text-3xl font-bold mb-4">Describe your DAO</h1>
      
      <div className="mb-4">
        <label className="block mb-2">Name</label>
        <input
          type="text"
          className="border rounded p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      
      <div className="mb-4">
        <label className="block mb-2">ENS Subdomain</label>
        <input
          type="text"
          className="border rounded p-2 w-full"
          value={subdomain}
          onChange={(e) => setSubdomain(e.target.value)}
        />
      </div>
      
      <div className="mb-4">
        <label className="block mb-2">Description</label>
        <textarea
          className="border rounded p-2 w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={handleBack} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400">
          Back
        </button>
        
        <button onClick={handleNext} className="bg-red-500 text-white px-4 py-2 rounded-lg">
          Next
        </button>
      </div>

    </div>
  );
}

export default DescribeDao;
