import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const Profile = () => {
  const { email } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [showAddProductPopup, setShowAddProductPopup] = useState(false);
  const [showAddIntakePopup, setShowAddIntakePopup] = useState(false);
  const [productForm, setProductForm] = useState({ name: '', unit: 'gr', kcal_per_unit: '' });
  const [intakeForm, setIntakeForm] = useState({ product: '', amount: '' });
  const [products, setProducts] = useState([]);
  const [intakes, setIntakes] = useState([]);  // New state for intake history
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`users/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setIsOwnProfile(localStorage.getItem('email') === email);
      } catch (err) {
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    const fetchIntakes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`calories/intakes/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIntakes(response.data);  // Set the fetched intake history
      } catch (err) {
        console.error('Failed to fetch intake data:', err);
      }
    };

    fetchUserData();
    fetchIntakes(); // Fetch intake data
  }, [email]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/login');
  };

  const toggleAddProductPopup = async () => {
    setShowAddProductPopup(!showAddProductPopup);
    if (!showAddProductPopup) await fetchProducts();
  };

  const toggleAddIntakePopup = async () => {
    setShowAddIntakePopup(!showAddIntakePopup);
    if (!showAddIntakePopup) await fetchProducts();
  };

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('calories/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleIntakeFormChange = (e) => {
    const { name, value } = e.target;
    setIntakeForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'calories/products/',
        {
          name: productForm.name,
          unit: productForm.unit,
          kcal_per_unit: parseInt(productForm.kcal_per_unit),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProductForm({ name: '', unit: 'gr', kcal_per_unit: '' });
      await fetchProducts();
    } catch (err) {
      console.error('Failed to add product:', err);
    }
  };

  const handleSubmitIntake = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'calories/intakes/',
        {
          product: parseInt(intakeForm.product),
          amount: parseFloat(intakeForm.amount),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIntakeForm({ product: '', amount: '' });
      setShowAddIntakePopup(false);
    } catch (err) {
      console.error('Failed to add intake:', err);
    }
  };

  if (loading) return <p style={{ padding: '2rem' }}>Loading...</p>;
  if (error) return <p style={{ padding: '2rem' }}>{error}</p>;
  if (!user) return <p style={{ padding: '2rem' }}>User not found</p>;

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.first_name)}+${encodeURIComponent(user.last_name)}&background=random&color=fff&size=256`;

  return (
    <div style={styles.container}>
      <div style={styles.profileHeader}>
        <img src={avatarUrl} alt="Avatar" style={styles.avatar} />
        <div>
          <h2 style={styles.name}>{user.first_name} {user.last_name}</h2>
          <p style={styles.registered}>📅 Joined: {new Date(user.date_joined).toLocaleDateString()}</p>
          <div style={styles.stats}>
            <div style={{ ...styles.statCard, backgroundColor: '#e0f7fa' }}><strong>Today</strong><span>0 kcal</span></div>
            <div style={{ ...styles.statCard, backgroundColor: '#fff3e0' }}><strong>This Month</strong><span>0 kcal</span></div>
            <div style={{ ...styles.statCard, backgroundColor: '#e8f5e9' }}><strong>Lifetime</strong><span>0 kcal</span></div>
          </div>
          {isOwnProfile && (
            <div style={styles.profileActions}>
              <button style={{ ...styles.actionButton, backgroundColor: '#4CAF50' }} onClick={toggleAddProductPopup}>Add Product</button>
              <button style={{ ...styles.actionButton, backgroundColor: '#FF9800' }} onClick={toggleAddIntakePopup}>Add Intake History</button>
              <button style={{ ...styles.actionButton, backgroundColor: '#F44336' }} onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>

      <h3 style={styles.sectionTitle}>🍴 Food Intake History</h3>
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Food</th>
              <th style={styles.tableHeader}>Date</th>
              <th style={styles.tableHeader}>Time</th>
              <th style={styles.tableHeader}>Amount</th>
              <th style={styles.tableHeader}>Calories</th>
            </tr>
          </thead>
          <tbody>
            {intakes.length > 0 ? (
              intakes.map((intake) => (
                <tr key={intake.id} style={styles.tableRow}>
                  <td>{intake.product_details.name}</td>
                  <td>{new Date(intake.date_taken).toLocaleDateString()}</td>
                  <td>{new Date(intake.date_taken).toLocaleTimeString()}</td>
                  <td>{intake.amount}</td>
                  <td>{intake.total_kcal_taken}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={styles.noData}>No intake history found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Product Popup */}
      {showAddProductPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupContent}>
            <h3>Add Product</h3>
            <form onSubmit={handleSubmitProduct} style={{ marginBottom: '1rem' }}>
              <div><label>Name:</label><input name="name" value={productForm.name} onChange={handleFormChange} required style={styles.input} /></div>
              <div><label>Unit:</label><select name="unit" value={productForm.unit} onChange={handleFormChange} style={styles.input}>
                <option value="gr">gr</option>
                <option value="unit">unit</option>
              </select></div>
              <div><label>Kcal per unit:</label><input type="number" name="kcal_per_unit" value={productForm.kcal_per_unit} onChange={handleFormChange} required style={styles.input} /></div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" style={{ ...styles.actionButton, backgroundColor: '#4CAF50' }}>Submit</button>
                <button type="button" style={{ ...styles.actionButton, backgroundColor: '#9E9E9E' }} onClick={toggleAddProductPopup}>Cancel</button>
              </div>
            </form>

            <h4 style={{ marginTop: '1rem' }}>Your Products</h4>
            <div style={{ overflowX: 'auto' }}>
              <table style={styles.productTable}>
                <thead>
                  <tr>
                    <th style={styles.productTh}>Name</th>
                    <th style={styles.productTh}>Unit</th>
                    <th style={styles.productTh}>Kcal/Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 ? (
                    products.map((product, i) => (
                      <tr key={product.id} style={i % 2 === 0 ? styles.productTrEven : styles.productTrOdd}>
                        <td>{product.name}</td>
                        <td>{product.unit}</td>
                        <td>{product.kcal_per_unit}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="3" style={{ textAlign: 'center', padding: '1rem', color: '#666' }}>No products found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add Intake Popup */}
      {showAddIntakePopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupContent}>
            <h3>Add Intake History</h3>
            <form onSubmit={handleSubmitIntake}>
              <div>
                <label>Product:</label>
                <select name="product" value={intakeForm.product} onChange={handleIntakeFormChange} required style={styles.input}>
                  <option value="">Select a product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} ({product.unit}, {product.kcal_per_unit} kcal)
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ marginTop: '0.75rem' }}>
                <label>Amount:</label>
                <input name="amount" type="number" value={intakeForm.amount} onChange={handleIntakeFormChange} required style={styles.input} />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" style={{ ...styles.actionButton, backgroundColor: '#FF9800' }}>Submit</button>
                <button type="button" style={{ ...styles.actionButton, backgroundColor: '#9E9E9E' }} onClick={toggleAddIntakePopup}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { maxWidth: '1000px', margin: '2rem auto', padding: '1rem', fontFamily: 'Segoe UI, sans-serif' },
  profileHeader: { display: 'flex', alignItems: 'center', gap: '2rem', padding: '2rem', borderRadius: '16px', background: 'linear-gradient(135deg, #f3f4f6, #ffffff)', boxShadow: '0 8px 24px rgba(0,0,0,0.05)' },
  avatar: { width: '160px', height: '160px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #ccc' },
  name: { fontSize: '2rem', marginBottom: '0.3rem', color: '#333' },
  registered: { marginBottom: '1rem', fontStyle: 'italic', color: '#666' },
  stats: { display: 'flex', gap: '1rem', flexWrap: 'wrap' },
  statCard: { padding: '1rem', borderRadius: '12px', minWidth: '150px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.95rem' },
  profileActions: { marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'flex-start' },
  actionButton: { padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.9rem', color: '#fff', border: 'none', cursor: 'pointer', transition: '0.2s ease-in-out', minWidth: '120px', display: 'inline-block' },
  sectionTitle: { marginTop: '3rem', marginBottom: '1rem', fontSize: '1.4rem', color: '#444' },
  tableWrapper: { overflowX: 'auto', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem', backgroundColor: '#fff' },
  tableHeader: { textAlign: 'left', padding: '0.75rem', backgroundColor: '#0288d1', color: '#fff', borderBottom: '2px solid #ccc' },
  tableRow: { borderBottom: '1px solid #f5f5f5' },
  noData: { textAlign: 'center', padding: '1rem', color: '#666' },
  popupOverlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  popupContent: { backgroundColor: '#fff', padding: '2rem', borderRadius: '12px', minWidth: '500px', maxWidth: '90%', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' },
  input: { width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '0.95rem' },
  productTable: { width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' },
  productTh: { padding: '0.75rem', backgroundColor: '#0288d1', color: '#fff', borderBottom: '2px solid #ccc' },
  productTrEven: { backgroundColor: '#f9f9f9' },
  productTrOdd: { backgroundColor: '#f1f1f1' }
};

export default Profile;
