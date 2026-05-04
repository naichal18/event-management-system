import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';

const PendingEvents = () => {
  const { t } = useTranslation();
  const { token, API_BASE } = useOutletContext();
  const SERVER_URL = API_BASE.replace('/api', '');
  const [pendingEvents, setPendingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&w=800&q=80';
    if (imagePath.startsWith('http')) return imagePath;
    return `${SERVER_URL}${imagePath}`;
  };

  useEffect(() => {
    fetchPendingEvents();
  }, []);

  const fetchPendingEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/events/admin/pending`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setPendingEvents(data);
      }
    } catch (e) {
      console.error('Failed to fetch pending events:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, action) => {
    setActionLoading(id);
    try {
      console.log(`Frontend: Attempting to ${action} event:`, id);
      const res = await fetch(`${API_BASE}/events/${id}/${action}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await res.json();
      console.log(`Frontend: ${action} Response:`, data);

      if (res.ok) {
        alert(action === 'approve' ? t('pending_events.alerts.approved') : t('pending_events.alerts.rejected'));
        fetchPendingEvents();
      } else {
        console.error(`Frontend: ${action} Failed:`, data);
        alert(data.message || t('pending_events.alerts.fail', { action: action }));
      }
    } catch (e) {
      console.error(`Frontend: ${action} Error:`, e);
      alert(`Server error: ${e.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div>
      <div className="glass-panel" style={{ padding: '25px' }}>
        <div className="page-header">
          <h3>{t('pending_events.title')} ({pendingEvents.length})</h3>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>{t('pending_events.subtitle')}</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>{t('pending_events.loading')}</div>
        ) : (
          <div className="glass-table-container">
            <table className="glass-table">
              <thead>
                <tr>
                  <th>{t('pending_events.table.no')}</th>
                  <th>{t('pending_events.table.details')}</th>
                  <th>{t('pending_events.table.ai_plan')}</th>
                  <th>{t('pending_events.table.budget')}</th>
                  <th>{t('pending_events.table.status')}</th>
                  <th>{t('pending_events.table.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {pendingEvents.map((event, index) => (
                  <tr key={event._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <img src={getImageUrl(event.image)} alt="" style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                        <div>
                          <div style={{ fontWeight: 600, color: '#fff' }}>{event.title}</div>
                          <div style={{ fontSize: '12px', color: '#94a3b8' }}>{event.category} | {event.location}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: '12px', maxWidth: '200px', color: '#cbd5e1' }}>
                        <strong>{t('pending_events.ai_labels.theme')}:</strong> {event.ai_suggestions?.theme || 'N/A'}<br/>
                        <strong>{t('pending_events.ai_labels.music')}:</strong> {event.ai_suggestions?.music || 'N/A'}
                      </div>
                    </td>
                    <td>₹{event.price?.toLocaleString()}</td>
                    <td>
                      <span className="status-badge status-pending">{t('pending_events.status.pending')}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          className="gradient-btn"
                          onClick={() => handleStatusUpdate(event._id, 'approve')}
                          disabled={actionLoading === event._id}
                          style={{ padding: '6px 12px', fontSize: '12px', background: 'linear-gradient(135deg, #10b981, #059669)' }}
                        >
                          {actionLoading === event._id && action === 'approve' ? t('pending_events.actions.approving') : t('pending_events.actions.approve')}
                        </button>
                        <button
                          className="gradient-btn gradient-btn-danger"
                          onClick={() => handleStatusUpdate(event._id, 'reject')}
                          disabled={actionLoading === event._id}
                          style={{ padding: '6px 12px', fontSize: '12px' }}
                        >
                          {actionLoading === event._id && action === 'reject' ? t('pending_events.actions.rejecting') : t('pending_events.actions.reject')}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {pendingEvents.length === 0 && (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                      {t('pending_events.no_events')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingEvents;
