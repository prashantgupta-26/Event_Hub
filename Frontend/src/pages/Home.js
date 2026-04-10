import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar as CalendarIcon } from 'lucide-react';

// Function to generate image based on event category/title
const getEventImage = (event) => {
  const query = encodeURIComponent(event.category + ' ' + event.title);
  return `https://source.unsplash.com/600x400/?${query}`;
};

const mockEvents = [
  {
    id: 101,
    title: 'Tech Meetup 2026',
    category: 'Technology',
    date: '2026-05-15',
    location: 'Downtown Hub, Bistupur',
    image: 'https://share.google/0i7PENqf4aJznyiMb'
  },
  {
    id: 102,
    title: 'Summer Jamming Session',
    category: 'Music',
    date: '2026-06-20',
    location: 'Jubliee Park',
    image: 'https://share.google/jG6RfVA4WnsdknwL3'
  },
  {
    id: 103,
    title: 'Art & Design Expo',
    category: 'Art',
    date: '2026-07-10',
    location: 'City Art Gallery',
    image: 'https://share.google/KuuLEoNQG09sHPCt8'
  },
  {
    id: 104,
    title: 'Local Food Carnival',
    category: 'Food',
    date: '2026-08-05',
    location: 'Riverside Walk',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836'
  },
  {
    id: 105,
    title: 'Startup Pitch Night',
    category: 'Business',
    date: '2026-05-25',
    location: 'Innovation Center',
    image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786'
  },
  {
    id: 106,
    title: 'Wellness Retreat',
    category: 'Health',
    date: '2026-06-12',
    location: 'Hill View Resort',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773'
  },
  {
    id: 107,
    title: 'Charity Marathon',
    category: 'Sports',
    date: '2026-09-18',
    location: 'JRD Stadium Track',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5'
  },
  {
    id: 108,
    title: 'Gaming Tournament',
    category: 'Gaming',
    date: '2026-07-22',
    location: 'Gaming Zone (PM Mall)',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420'
  },
  {
    id: 109,
    title: 'Photography Workshop',
    category: 'Education',
    date: '2026-08-15',
    location: 'Creative Studio',
    image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7'
  },
  {
    id: 110,
    title: 'Standup Comedy Night',
    category: 'Entertainment',
    date: '2026-05-30',
    location: 'The Laugh Club',
    image: 'https://images.unsplash.com/photo-1527224538127-2104bb71c51b'
  }
];

const Home = () => {
  const [events, setEvents] = useState(mockEvents);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/events/all');
      const apiEvents = res.data?.events || [];

      const merged = [...apiEvents, ...mockEvents];
      const uniqueEvents = Array.from(new Map(merged.map(e => [e.id, e])).values());

      setEvents(uniqueEvents);
    } catch (err) {
      console.error('Error fetching events, using mock events.');
      setEvents(mockEvents);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(e => 
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container">
      <header style={{ marginBottom: '24px' }}>
        <h1 className="gradient-text" style={{ fontSize: '28px' }}>Explore Events</h1>
        <p style={{ color: '#666' }}>Find what's happening near you</p>
      </header>

      <div style={{ position: 'relative', marginBottom: '24px' }}>
        <Search style={{ position: 'absolute', left: '12px', top: '12px', color: '#888' }} size={20} />
        <input 
          type="text" 
          className="input" 
          placeholder="Search events, locations..." 
          style={{ paddingLeft: '44px', marginBottom: 0 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading events...</p>
      ) : (
        <div className="events-list">
          {filteredEvents.length > 0 ? filteredEvents.map((event, index) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card"
              style={{ padding: 0, overflow: 'hidden' }}
            >
              {/* Event Image */}
              <img 
                src={getEventImage(event)} 
                alt={event.title}
                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
              />

              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '18px', margin: 0 }}>{event.title}</h3>
                  <span style={{ fontSize: '12px', background: '#FFF0E6', color: '#FF8C42', padding: '4px 8px', borderRadius: '12px', fontWeight: 600 }}>{event.category}</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', color: '#666', fontSize: '14px', marginBottom: '4px' }}>
                  <CalendarIcon size={14} style={{ marginRight: '6px' }} />
                  {new Date(event.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', color: '#666', fontSize: '14px', marginBottom: '16px' }}>
                  <MapPin size={14} style={{ marginRight: '6px' }} />
                  {event.location}
                </div>
                
                <button className="btn" style={{ padding: '8px' }}>
                  Join Event
                </button>
              </div>
            </motion.div>
          )) : (
            <p style={{ textAlign: 'center', color: '#888', marginTop: '40px' }}>No events found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;

