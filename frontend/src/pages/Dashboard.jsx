import UploadComponents from "../components/UploadComponents";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Krishi Dashboard</h1>
      <UploadComponents />
    </div>
  );
};

export default Dashboard;
