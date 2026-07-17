import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h2>Dashboard</h2>
            <p>If you can see this, you successfully logged in!</p>
            
            <button onClick={() => {
                localStorage.removeItem('token');
                navigate('/login');
            }}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
