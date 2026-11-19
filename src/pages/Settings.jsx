import { useState } from "react";
import { getCheckIns, getDeviceId, deleteAllData } from "../utils/storage";

export default function Settings() {
  const [count, setCount] = useState(getCheckIns().length);
  const [confirming, setConfirming] = useState(false);
  const [message, setMessage] = useState("");
  const [deviceId, setDeviceId] = useState(getDeviceId());

  function handleDelete() {
    deleteAllData();
    setCount(0);
    setConfirming(false);
    setDeviceId("");
    setMessage("All your data has been deleted from this device.");
  }

  return (
    <section className="card">
      <h1>My Data</h1>
      <p>
        EmoCheck does not ask for your name or email. Your check-ins are stored
        only on this device, under an anonymous ID.
      </p>

      <div className="data-box">
        <p>
          <strong>Anonymous ID:</strong>{" "}
          {deviceId ? deviceId.slice(0, 8) + "..." : "none"}
        </p>
        <p>
          <strong>Saved check-ins:</strong> {count}
        </p>
      </div>

      <h2>Delete my data</h2>
      <p>
        This permanently removes your check-ins, saved resources and anonymous ID
        from this device. It cannot be undone.
      </p>

      {!confirming ? (
        <button className="danger" onClick={() => setConfirming(true)}>
          Delete all my data
        </button>
      ) : (
        <div className="confirm-box">
          <p>Are you sure? All your data will be erased.</p>
          <button className="danger" onClick={handleDelete}>
            Yes, delete everything
          </button>
          <button className="secondary" onClick={() => setConfirming(false)}>
            Cancel
          </button>
        </div>
      )}

      {message && <p className="message">{message}</p>}
    </section>
  );
}
