import React, { useState } from 'react';
import { useProductIdeas } from '../hooks/useProductIdeas';
import { useRealityChecks } from '../hooks/useRealityChecks';
import type { RealityCheckStatus } from '../types/entities';

// --- Helper Components ---

const RealityCheckList = ({ productIdeaId }: { productIdeaId?: string | null }) => {
  const { realityChecks, summary, addRealityCheck, updateRealityCheck, removeRealityCheck } = useRealityChecks({
    productIdeaId: productIdeaId === null ? undefined : productIdeaId,
  });

  const [form, setForm] = useState({
    hypothesis: '',
    experiment: '',
    status: 'New' as RealityCheckStatus,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.hypothesis) return;
    addRealityCheck({
      ...form,
      productIdeaId: productIdeaId === null ? null : productIdeaId || null,
    });
    setForm({
      hypothesis: '',
      experiment: '',
      status: 'New',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
    });
  };

  const handleUpdate = (id: string) => {
    const currentStatus = realityChecks.find(rc => rc.id === id)?.status;
    const newStatus: RealityCheckStatus = currentStatus === 'New' ? 'In Progress' : 'Proved';
    updateRealityCheck(id, { status: newStatus, hypothesis: 'Updated Hypothesis' });
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
      <h4>{productIdeaId ? 'Associated' : 'All'} Reality Checks</h4>
      <div style={{ marginBottom: '10px' }}>
        <strong>Summary:</strong>
        <span> New: {summary.New}, </span>
        <span> In Progress: {summary['In Progress']}, </span>
        <span> Proved: {summary.Proved}, </span>
        <span> Disproved: {summary.Disproved}, </span>
        <span> Total: {summary.total}</span>
      </div>
      <form onSubmit={handleAdd} style={{ marginBottom: '10px' }}>
        <input name="hypothesis" value={form.hypothesis} onChange={handleChange} placeholder="Hypothesis" />
        <input name="experiment" value={form.experiment} onChange={handleChange} placeholder="Experiment" />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="New">New</option>
          <option value="In Progress">In Progress</option>
          <option value="Proved">Proved</option>
          <option value="Disproved">Disproved</option>
        </select>
        <input type="date" name="startDate" value={form.startDate} onChange={handleChange} />
        <input type="date" name="endDate" value={form.endDate} onChange={handleChange} />
        <button type="submit">Add Reality Check</button>
      </form>
      <ul>
        {realityChecks.map((rc) => (
          <li key={rc.id}>
            <p><strong>Hypothesis:</strong> {rc.hypothesis} | <strong>Status:</strong> {rc.status}</p>
            <p><strong>Experiment:</strong> {rc.experiment}</p>
            <p><strong>Dates:</strong> {rc.startDate} to {rc.endDate}</p>
            <button onClick={() => handleUpdate(rc.id)}>Update (Status & Hypothesis)</button>
            <button onClick={() => removeRealityCheck(rc.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ProductIdeaList = () => {
  const { productIdeas, addProductIdea, updateProductIdea, removeProductIdea } = useProductIdeas();
  const [form, setForm] = useState({ name: '', description: '', impact: 5, confidence: 5, ease: 5 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'number' ? Number(value) : value }));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) return;
    addProductIdea(form);
    setForm({ name: '', description: '', impact: 5, confidence: 5, ease: 5 });
  };

  const handleUpdate = (id: string) => {
    updateProductIdea(id, { name: 'Updated Idea Name', impact: 10 });
  };

  return (
    <div>
      <h2>Product Ideas</h2>
      <form onSubmit={handleAdd} style={{ marginBottom: '20px', borderBottom: '2px solid black', paddingBottom: '20px' }}>
        <h3>Add New Product Idea</h3>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
        <label>Impact: <input type="number" name="impact" value={form.impact} onChange={handleChange} min="1" max="10" /></label>
        <label>Confidence: <input type="number" name="confidence" value={form.confidence} onChange={handleChange} min="1" max="10" /></label>
        <label>Ease: <input type="number" name="ease" value={form.ease} onChange={handleChange} min="1" max="10" /></label>
        <button type="submit">Add Product Idea</button>
      </form>
      {productIdeas.map((idea) => (
        <div key={idea.id} style={{ border: '2px solid #007bff', padding: '15px', margin: '15px 0' }}>
          <h3>{idea.name} (ICE: {idea.iceScore})</h3>
          <p>{idea.description}</p>
          <p>Impact: {idea.impact}, Confidence: {idea.confidence}, Ease: {idea.ease}</p>
          <p><em>Created: {new Date(idea.createdAt).toLocaleString()} | Updated: {new Date(idea.updatedAt).toLocaleString()}</em></p>
          <button onClick={() => handleUpdate(idea.id)}>Update (Name & Impact)</button>
          <button onClick={() => removeProductIdea(idea.id)}>Remove</button>
          <RealityCheckList productIdeaId={idea.id} />
        </div>
      ))}
    </div>
  );
};

// --- Main Test Page Component ---

export const DalTestPage = () => {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>DAL Test Page</h1>
      <ProductIdeaList />
      <hr style={{ margin: '40px 0' }} />
      <RealityCheckList productIdeaId={null} />
    </div>
  );
};
