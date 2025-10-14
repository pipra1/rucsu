import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [studentId, setStudentId] = useState('')
  const [studentData, setStudentData] = useState([])
  const [searchResult, setSearchResult] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  // Load the student data from RUCSU_VOTER.txt
  useEffect(() => {
    fetch('/src/assets/RUCSU_VOTER.txt')
      .then(response => response.text())
      .then(text => {
        // Parse the JSON-like data
        try {
          // Extract all JSON objects from the text
          const jsonMatches = text.match(/\{[^}]+\}/g)
          if (jsonMatches) {
            const students = jsonMatches.map(match => {
              try {
                return JSON.parse(match)
              } catch {
                return null
              }
            }).filter(s => s !== null)
            setStudentData(students)
          }
        } catch (err) {
          console.error('Error parsing student data:', err)
          setError('Failed to parse student data')
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading student data:', err)
        setError('Failed to load student data')
        setLoading(false)
      })
  }, [])
  const hallCodeToName = (code) => {
    const hallMap = {
      '101': 'Sher-e Bangla Fazlul Haque Hall',
      '102': 'Shah Makhdum Hall',
      '103': 'Nawab Abdul Latif Hall',
      '104': 'Syed Amer Ali Hall',
      '105': 'Shaheed Shamsuzzoha Hall',
      '106': 'Shaheed Habibur Rahman Hall',
      '107': 'Matihar Hall',
      '108': 'Madar Bux Hall',
      '109': 'Shaheed Suhrawardy Hall',
      '110': 'Shaheed Ziaur Rahman Hall',
      '111': 'Bijoy 24 Hall (Bangabandhu Sheikh Mujibur Rahman Hall)',
      '120': 'Mannujan Hall',
      '121': 'Rokeya Hall',
      '122': 'Taposhi Rabeya Hall',
      '123': 'Begum Khaleda Zia Hall',
      '124': 'Rahamatunnesa Hall',
      '125': 'July 36 Hall (Bangamata Sheikh Fazilatunnesa Hall)',
    }
    return hallMap[code] || '--'
  }

  const pollingCenterName = (code) => {
    const hallMap = {
      '101': 'Satyendranath Bose Science Building, Gallery Room-129',
      '102': 'Zuberi Building, West Hall Room',
      '103': 'Jamal Nazrul Islam Science Building, North-West, Room-109',
      '104': 'Zuberi Building, East Hall Room',
      '105': 'Jabir Ibn Hayyan Science Building, Room-101',
      '106': 'Jabir Ibn Hayyan Science Building, Room-224',
      '107': 'Satyendranath Bose Science Building, Room-112',
      '108': 'Jagadish Chandra Bose Science Building, South-East Gate, Room-150',
      '109': 'Jagadish Chandra Bose Science Building, South-West Gate, Room-121',
      '110': 'Dr. Shahidullah Arts Building, Gallery Room-150',
      '111': 'Jamal Nazrul Islam Science Building, Conference Room-137',
      '120': 'Dean’s Complex, Room-110 (Canteen)',
      '121': 'Syed Ismail Hossain Siraji Building, North-West Gate, Room-125',
      '122': 'Rabindra Building, North-West Gate, Room-244',
      '123': 'Rabindra Building, East-South Gate, Room-119',
      '124': 'Rabindra Building, South-West Gate, Room-123',
      '125': 'Syed Ismail Hossain Siraji Building, North-West Gate, Room-128',
    }
    return hallMap[code] || '--'
  }

  
  const handleSearch = () => {
    setError('')
    setSearchResult(null)

    if (!studentId.trim()) {
      setError('Please enter a Student ID')
      return
    }

    // Search for the student by Student ID
    const found = studentData.find(student => 
      student['Student ID'] && student['Student ID'].toString() === studentId.trim()
    )

    if (found) {
      // Extract polling center code (characters at index 2, 3, 4)
      const pollingCenterCode = found['Student ID'] ? found['Student ID'].toString().substring(2, 5) : ''
      console.log('Polling Center Code:', pollingCenterCode)
      setSearchResult(found)
    } else {
      setError('Student not found')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }


  return (
    <div className="app-container">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '' }}>
        <img
          src="/src/assets/RU_Official_Logo.png"
          alt="RU Official Logo"
          style={{ width: '200px', height: '200px', objectFit: 'contain' }}
        />
      </div>
      
      <h1>RUCSU Voter Search</h1>
      
      {loading && <p>Loading student data...</p>}

      <div className="search-container">
        <input
          type="text"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          onKeyPress={handleKeyPress}
          className="search-input"
          disabled={loading}
        />
        <button onClick={handleSearch} className="search-button" disabled={loading}>
          Search
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {searchResult && (
        <div className="result-container">
          <h2>Student Details</h2>
          <div className="student-details">
            <div className="detail-row">
              <span className="label">SL_RU:</span>
              <span className="value">{searchResult.SL_RU || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="label">Voter ID:</span>
              <span className="value">{searchResult['Voter ID'] || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="label">Student ID:</span>
              <span className="value">{searchResult['Student ID'] || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="label">Name:</span>
              <span className="value">{searchResult.Name || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="label">Department:</span>
              <span className="value">{searchResult.Department || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="label">Residence Status:</span>
              <span className="value">{searchResult['Residence Status'] || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="label">Hall Name:</span>
              <span className="value">{hallCodeToName(studentId.substring(2, 5))}</span>
            </div>
             <div className="detail-row">
              <span className="label">Polling Center:</span>
              <span className="value">{pollingCenterName(studentId.substring(2, 5))}</span>
            </div>
          </div>
        </div>
      )}

    <footer className="footer">
      <div>
        Developed by <a href="https://www.linkedin.com/in/pipra--/" target="_blank" rel="noopener noreferrer">Habibur Rahman</a> & <a href="https://www.linkedin.com/in/shuvo-roy-596814267/" target="_blank" rel="noopener noreferrer"> Shuvo Roy</a> 

      </div>
      <div>
        &copy; {new Date().getFullYear()} RUCSU Voter Search
      </div>
    </footer>
    </div>
  )
}

export default App