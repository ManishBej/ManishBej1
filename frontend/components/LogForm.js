import { useState } from 'react';

export default function LogForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        access_time: '',
        access_date: '',
        employee_name: '',
        algo_status: 'OFF'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block mb-2">Access Time</label>
                    <input
                        type="time"
                        className="w-full p-2 border rounded"
                        value={formData.access_time}
                        onChange={(e) => setFormData({...formData, access_time: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block mb-2">Access Date</label>
                    <input
                        type="date"
                        className="w-full p-2 border rounded"
                        value={formData.access_date}
                        onChange={(e) => setFormData({...formData, access_date: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block mb-2">Employee Name</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={formData.employee_name}
                        onChange={(e) => setFormData({...formData, employee_name: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block mb-2">Energy Saving Mode</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={formData.algo_status}
                        onChange={(e) => setFormData({...formData, algo_status: e.target.value})}
                    >
                        <option value="OFF">OFF</option>
                        <option value="ON">ON</option>
                    </select>
                </div>
            </div>
            <button className="mt-4 w-full bg-blue-500 text-white p-2 rounded">
                Submit
            </button>
        </form>
    );
}