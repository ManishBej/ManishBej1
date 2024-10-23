import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Chart from '../components/Chart';
import LogForm from '../components/LogForm';

export default function Dashboard() {
    const router = useRouter();
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState({
        startDate: '',
        endDate: ''
    });

    const fetchChartData = async (filters = {}) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            const response = await axios.get('http://localhost:5000/api/chart', {
                headers: { Authorization: `Bearer ${token}` },
                params: filters
            });
            setChartData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            if (error.response?.status === 401) {
                router.push('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogSubmit = async (formData) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/chart', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchChartData();
        } catch (error) {
            console.error('Error submitting log:', error);
        }
    };

    const handleDateFilter = () => {
        fetchChartData(dateRange);
    };

    useEffect(() => {
        fetchChartData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl mb-4">Energy Consumption Dashboard</h1>
            
            {/* Date Filter */}
            <div className="mb-4 p-4 bg-white rounded-lg shadow">
                <div className="grid grid-cols-3 gap-4">
                    <input
                        type="date"
                        className="p-2 border rounded"
                        value={dateRange.startDate}
                        onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
                    />
                    <input
                        type="date"
                        className="p-2 border rounded"
                        value={dateRange.endDate}
                        onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
                    />
                    <button
                        onClick={handleDateFilter}
                        className="bg-blue-500 text-white p-2 rounded"
                    >
                        Filter
                    </button>
                </div>
            </div>

            {/* Chart */}
            <div className="mb-8">
                <Chart data={chartData} />
            </div>

            {/* Log Form */}
            <div className="mb-8">
                <h2 className="text-xl mb-4">Log Access</h2>
                <LogForm onSubmit={handleLogSubmit} />
            </div>
        </div>
    );
}