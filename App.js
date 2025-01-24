import React, { useState } from 'react';
import './App.css'; // Create a CSS file for styles or use inline styles

function InventoryManagement() {
    const [items, setItems] = useState([
        { id: 1, name: 'Sample Item', category: 'Category A', quantity: 10 },
    ]);

    const [newItem, setNewItem] = useState({ name: '', category: '', quantity: '' });
    const [editItem, setEditItem] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    const handleAddItem = (e) => {
        e.preventDefault();

        if (newItem.name && newItem.category && newItem.quantity) {
            setItems([
                ...items,
                { id: Date.now(), ...newItem, quantity: parseInt(newItem.quantity, 10) },
            ]);
            setNewItem({ name: '', category: '', quantity: '' });
        }
    };

    const handleDeleteItem = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };

    const handleEditItem = (item) => {
        setEditItem(item);
        setNewItem({ name: item.name, category: item.category, quantity: item.quantity.toString() });
    };

    const handleSaveEdit = (e) => {
        e.preventDefault();
        if (newItem.name && newItem.category && newItem.quantity) {
            setItems(
                items.map((item) =>
                    item.id === editItem.id
                        ? { ...item, ...newItem, quantity: parseInt(newItem.quantity, 10) }
                        : item
                )
            );
            setNewItem({ name: '', category: '', quantity: '' });
            setEditItem(null);
        }
    };

    return (
        <div className="container">
            <h1>Inventory Management</h1>

            <h2>Items in Stock</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr
                            key={item.id}
                            className={item.quantity < 5 ? 'low-stock' : ''}
                            style={{
                                backgroundColor: item.quantity < 5 ? '#f8d7da' : 'transparent',
                            }}
                        >
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.quantity}</td>
                            <td>
                                <button
                                    className="edit-btn"
                                    onClick={() => handleEditItem(item)}
                                    style={{
                                        backgroundColor: '#ffc107',
                                        color: 'black',
                                        border: 'none',
                                        padding: '5px 10px',
                                        borderRadius: '3px',
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDeleteItem(item.id)}
                                    style={{
                                        backgroundColor: '#dc3545',
                                        color: 'white',
                                        border: 'none',
                                        padding: '5px 10px',
                                        borderRadius: '3px',
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>{editItem ? 'Edit Item' : 'Add New Item'}</h2>
            <form onSubmit={editItem ? handleSaveEdit : handleAddItem}>
                <div className="form-group">
                    <input
                        type="text"
                        name="name"
                        value={newItem.name}
                        placeholder="Name"
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="category"
                        value={newItem.category}
                        placeholder="Category"
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="number"
                        name="quantity"
                        value={newItem.quantity}
                        placeholder="Quantity"
                        onChange={handleInputChange}
                        required
                    />
                    <button
                        type="submit"
                        style={{
                            backgroundColor: '#007BFF',
                            color: 'white',
                            padding: '10px 15px',
                            borderRadius: '5px',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        {editItem ? 'Save Changes' : 'Add Item'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default InventoryManagement;
