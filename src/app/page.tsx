export default function Home() {
  return (
    <div style={{ 
      backgroundColor: '#020617', 
      color: 'white', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>MUN AI is Alive</h1>
      <p style={{ color: '#94a3b8' }}>If you see this, the routing is working. Deployment successful.</p>
      <a href="/dashboard" style={{ 
        marginTop: '2rem', 
        padding: '12px 24px', 
        backgroundColor: '#4f46e5', 
        color: 'white', 
        borderRadius: '8px',
        textDecoration: 'none',
        fontWeight: 'bold'
      }}>
        Enter Dashboard
      </a>
    </div>
  )
}
