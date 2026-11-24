import { useState } from "react";
import { CATEGORIES } from "../data/resources";
import {
  getResources,
  addResource,
  updateResource,
  deleteResource,
  resetResources,
} from "../utils/resources";

const PASSCODE = "admin123";
const EMPTY = { name: "", category: CATEGORIES[0], description: "", phone: "", location: "" };

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(
    sessionStorage.getItem("emocheck_admin") === "yes"
  );
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [resources, setResources] = useState(getResources());
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  function handleLogin() {
    if (code === PASSCODE) {
      sessionStorage.setItem("emocheck_admin", "yes");
      setLoggedIn(true);
      setError("");
    } else {
      setError("Wrong passcode. Try again.");
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("emocheck_admin");
    setLoggedIn(false);
    setCode("");
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    if (!form.name.trim() || !form.description.trim()) {
      setMessage("Name and description are required.");
      return;
    }
    if (editingId) {
      setResources(updateResource(editingId, form));
      setMessage("Resource updated.");
    } else {
      setResources(addResource(form));
      setMessage("Resource added.");
    }
    setForm(EMPTY);
    setEditingId(null);
  }

  function handleEdit(r) {
    setForm({
      name: r.name,
      category: r.category,
      description: r.description,
      phone: r.phone || "",
      location: r.location || "",
    });
    setEditingId(r.id);
    setMessage("");
  }

  function handleDelete(id) {
    if (window.confirm("Delete this resource?")) {
      setResources(deleteResource(id));
      setMessage("Resource deleted.");
    }
  }

  function handleReset() {
    if (window.confirm("Restore the default resources? Your changes will be lost.")) {
      setResources(resetResources());
      setMessage("Default resources restored.");
    }
  }

  if (!loggedIn) {
    return (
      <section className="card">
        <h1>Administrator Login</h1>
        <p>Enter the administrator passcode to manage support resources.</p>
        <input
          className="search"
          type="password"
          placeholder="Passcode"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button className="primary" onClick={handleLogin}>Log in</button>
        {error && <p className="error">{error}</p>}
      </section>
    );
  }

  return (
    <section>
      <div className="card">
        <div className="resource-top">
          <h1>Administrator</h1>
          <button className="secondary" onClick={handleLogout}>Log out</button>
        </div>

        <h2>{editingId ? "Edit resource" : "Add a resource"}</h2>
        <div className="form-grid">
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
          <select name="category" value={form.category} onChange={handleChange}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <input name="phone" placeholder="Phone (optional)" value={form.phone} onChange={handleChange} />
          <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
          <textarea
            name="description"
            rows="3"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <button className="primary" onClick={handleSubmit}>
          {editingId ? "Save changes" : "Add resource"}
        </button>
        {editingId && (
          <button
            className="secondary"
            onClick={() => {
              setForm(EMPTY);
              setEditingId(null);
            }}
          >
            Cancel edit
          </button>
        )}
        {message && <p className="message">{message}</p>}
      </div>

      <div className="card admin-list">
        <div className="resource-top">
          <h2>All resources ({resources.length})</h2>
          <button className="link-danger" onClick={handleReset}>Restore defaults</button>
        </div>
        <ul className="resource-list">
          {resources.map((r) => (
            <li key={r.id} className="resource-item">
              <div className="resource-top">
                <h3>{r.name}</h3>
                <span className="badge">{r.category}</span>
              </div>
              <p className="resource-meta">
                {r.location}
                {r.phone && <> &middot; {r.phone}</>}
              </p>
              <button className="save-btn" onClick={() => handleEdit(r)}>Edit</button>{" "}
              <button className="link-danger" onClick={() => handleDelete(r.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
