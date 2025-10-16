import { useState, useEffect } from "react";
import "./App.css";
import { get, ref } from "firebase/database";
import { db } from "../firestore";

function App() {
  const [studentId, setStudentId] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [stdId, setStdId] = useState("");
  const [hallId, setHallId] = useState("");

  const firebaseFetch = async () => {
    try {
      setLoading(true);
      const snapshot = await get(ref(db, "/" + studentId));
      if (snapshot.exists()) {
        const result = snapshot.val();
        setSearchResult(result);
        setStdId(studentId);
        const hallCode = result["Voter ID"].substring(
          0,
          result["Voter ID"].indexOf(":")
        );
        setHallId(hallCode);
        return true;
      } else {
        setError("No data available.");
        return false;
      }
    } catch (error) {
      setError("No data available.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const hallCodeToName = (code) => {
    const hallMap = {
      SB: "Sher-e Bangla Fazlul Haque Hall",
      SM: "Shah Makhdum Hall",
      AL: "Nawab Abdul Latif Hall",
      AA: "Syed Amer Ali Hall",
      SZ: "Shaheed Shamsuzzoha Hall",
      HR: "Shaheed Habibur Rahman Hall",
      MH: "Matihar Hall",
      MB: "Madar Bux Hall",
      SW: "Shaheed Suhrawardy Hall",
      ZR: "Shaheed Ziaur Rahman Hall",
      B24: "Bijoy 24 Hall (Bangabandhu Sheikh Mujibur Rahman Hall)",
      MJ: "Mannujan Hall",
      RK: "Rokeya Hall",
      TR: "Taposhi Rabeya Hall",
      KZ: "Begum Khaleda Zia Hall",
      RN: "Rahamatunnesa Hall",
      J36: "July 36 Hall (Bangamata Sheikh Fazilatunnesa Hall)",
    };
    return hallMap[code] || "--";
  };

  // const hallCodeToName = (code) => {
  //   const hallMap = {
  //     101: "Sher-e Bangla Fazlul Haque Hall",
  //     102: "Shah Makhdum Hall",
  //     103: "Nawab Abdul Latif Hall",
  //     104: "Syed Amer Ali Hall",
  //     105: "Shaheed Shamsuzzoha Hall",
  //     106: "Shaheed Habibur Rahman Hall",
  //     107: "Matihar Hall",
  //     108: "Madar Bux Hall",
  //     109: "Shaheed Suhrawardy Hall",
  //     110: "Shaheed Ziaur Rahman Hall",
  //     111: "Bijoy 24 Hall (Bangabandhu Sheikh Mujibur Rahman Hall)",
  //     120: "Mannujan Hall",
  //     121: "Rokeya Hall",
  //     122: "Taposhi Rabeya Hall",
  //     123: "Begum Khaleda Zia Hall",
  //     124: "Rahamatunnesa Hall",
  //     125: "July 36 Hall (Bangamata Sheikh Fazilatunnesa Hall)",
  //   };
  //   return hallMap[code] || "--";
  // };

  const pollingCenterName = (code) => {
    const hallMap = {
      SB: "Satyendranath Bose Science Building, Gallery Room-129",
      SM: "Zuberi Building, West Hall Room",
      AL: "Jamal Nazrul Islam Science Building, North-West, Room-109",
      AA: "Zuberi Building, East Hall Room",
      SZ: "Jabir Ibn Hayyan Science Building, Room-101",
      HR: "Jabir Ibn Hayyan Science Building, Room-224",
      MH: "Satyendranath Bose Science Building, Room-112",
      MB: "Jagadish Chandra Bose Science Building, South-East Gate, Room-150",
      SW: "Jagadish Chandra Bose Science Building, South-West Gate, Room-121",
      ZR: "Dr. Shahidullah Arts Building, Gallery Room-150",
      B24: "Jamal Nazrul Islam Science Building, Conference Room-137",
      MJ: "Dean’s Complex, Room-110 (Canteen)",
      RK: "Syed Ismail Hossain Siraji Building, North-West Gate, Room-125",
      TR: "Rabindra Building, North-West Gate, Room-244",
      KZ: "Rabindra Building, East-South Gate, Room-119",
      RN: "Rabindra Building, South-West Gate, Room-123",
      J36: "Syed Ismail Hossain Siraji Building, North-West Gate, Room-128",
    };
    return hallMap[code] || "--";
  };

  // const pollingCenterName = (code) => {
  //   const hallMap = {
  //     101: "Satyendranath Bose Science Building, Gallery Room-129",
  //     102: "Zuberi Building, West Hall Room",
  //     103: "Jamal Nazrul Islam Science Building, North-West, Room-109",
  //     104: "Zuberi Building, East Hall Room",
  //     105: "Jabir Ibn Hayyan Science Building, Room-101",
  //     106: "Jabir Ibn Hayyan Science Building, Room-224",
  //     107: "Satyendranath Bose Science Building, Room-112",
  //     108: "Jagadish Chandra Bose Science Building, South-East Gate, Room-150",
  //     109: "Jagadish Chandra Bose Science Building, South-West Gate, Room-121",
  //     110: "Dr. Shahidullah Arts Building, Gallery Room-150",
  //     111: "Jamal Nazrul Islam Science Building, Conference Room-137",
  //     120: "Dean’s Complex, Room-110 (Canteen)",
  //     121: "Syed Ismail Hossain Siraji Building, North-West Gate, Room-125",
  //     122: "Rabindra Building, North-West Gate, Room-244",
  //     123: "Rabindra Building, East-South Gate, Room-119",
  //     124: "Rabindra Building, South-West Gate, Room-123",
  //     125: "Syed Ismail Hossain Siraji Building, North-West Gate, Room-128",
  //   };
  //   return hallMap[code] || "--";
  // };

  const pollingCenterBanglaName = (code) => {
    const hallMap = {
      SB: "সত্যেন্দ্রনাথ বসু বিজ্ঞান ভবন, গ্যালারী রুম-১২৯",
      SM: "জুবেরী ভবন, পশ্চিম হল রুম",
      AL: "জামাল নজরুল ইসলাম বিজ্ঞান ভবন, উত্তর-পশ্চিম, রুম-১০৯",
      AA: "জুবেরী ভবন, পূর্ব হল রুম",
      SZ: "জাবির ইবনে হাইয়ান বিজ্ঞান ভবন, রুম-১০১",
      HR: "জাবির ইবনে হাইয়ান বিজ্ঞান ভবন, রুম-২২৪",
      MH: "সত্যেন্দ্রনাথ বসু বিজ্ঞান ভবন, রুম-১১২",
      MB: "জগদীশ চন্দ্র বসু বিজ্ঞান ভবন, দক্ষিণ-পূর্ব গেট, রুম-১৫০",
      SW: "জগদীশ চন্দ্র বসু বিজ্ঞান ভবন, দক্ষিণ-পশ্চিম গেট, রুম-১২১",
      ZR: "ড. শহীদুল্লাহ কলা ভবন, গ্যালারী রুম-১৫০",
      B24: "জামাল নজরুল ইসলাম বিজ্ঞান ভবন, কনফারেন্স রুম-১৩৭",
      MJ: "ডীনস কমপ্লেক্স, রুম-১১০(ক্যান্টিন)",
      RK: "সৈয়দ ইসমাঈল হোসেন সিরাজী ভবন, উত্তর-পশ্চিম গেট, রুম-১২৫",
      TR: "রবীন্দ্র ভবন, উত্তর পশ্চিম গেট, রুম-২৪৪",
      KZ: "রবীন্দ্র ভবন, পূর্ব-দক্ষিণ গেট, রুম-১১৯",
      RN: "রবীন্দ্র ভবন, দক্ষিণ-পশ্চিম গেট, রুম-১২৩",
      J36: "সৈয়দ ইসমাঈল হোসেন সিরাজী ভবন, উত্তর-পশ্চিম গেট, রুম-১২৮",
    };
    return hallMap[code] || "--";
  };

  const handleSearch = () => {
    setError("");
    setSearchResult(null);
    if (!studentId.trim()) {
      setError("Please enter a Student ID");
      return;
    }

    if (firebaseFetch()) {
      // setStdId(studentId);
      // setHallId(searchResult["Voter ID"].substring(0, searchResult["Voter ID"].indexOf(":")));
      //   console.log(hallId);
    } else {
      setError("Student not found");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="app-container">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "",
        }}
      >
        <img
          src="https://www.ru.ac.bd/wp-content/uploads/2025/04/RU_Official_Logo.png"
          alt="RU Official Logo"
          style={{ width: "200px", height: "200px", objectFit: "contain" }}
        />
      </div>

      <h1>RUCSU Voter Search</h1>

      {loading && <p>Loading student data...</p>}

      <div className="search-container">
        <input
          type="number"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          onKeyPress={handleKeyPress}
          className="search-input"
          disabled={loading}
        />
        <button
          onClick={handleSearch}
          className="search-button"
          disabled={loading}
        >
          Search
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {searchResult && (
        <div className="result-container">
          {/* <div style={{ textAlign: "center", marginBottom: 16 }}>
            <img
              src={"/habibi.jpeg"}
              alt="Habibi"
              style={{
                width: 340,
                marginLeft: "5px",
                height: 140,
                objectFit: "cover",
                borderRadius: "8px",
                border: "2px solid #ddd",
              }}
            />
          </div> */}
          <div
            className="candidate-info-container"
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "32px",
              marginBottom: "20px",
            }}
          >
            <div
              className="candidate-card left-candidate"
              style={{
                background: "#eaf6fb",
                padding: "16px",
                borderRadius: "6px",
                width: "48%",
              }}
            >
              <h3 style={{ margin: "0 0 8px 0", color: "#222" }}>
                মোঃ হাবিবুর রহমান
              </h3>
              <h3
                style={{
                  fontWeight: "bold",
                  margin: "0 0 8px 0",
                  color: "#222",
                }}
              >
                কেন্দ্রীয় নির্বাহী সদস্য (স্বতন্ত্র)
              </h3>
              <p
                className="ballot-number"
                style={{ color: "#2c3e50", margin: 0 }}
              >
                ব্যালট নং - ১৯
              </p>
            </div>
          </div>
          <h2>Student Details</h2>
          <div className="student-details">
            <div className="detail-row">
              <span className="label">SL_RU:</span>
              <span className="value">{searchResult.SL_RU || "N/A"}</span>
            </div>
            <div className="detail-row">
              <span className="label">Voter ID:</span>
              <span className="value">{searchResult["Voter ID"] || "N/A"}</span>
            </div>
            <div className="detail-row">
              <span className="label">Student ID:</span>
              <span className="value">{stdId || "N/A"}</span>
            </div>
            <div className="detail-row">
              <span className="label">Name:</span>
              <span className="value">{searchResult.Name || "N/A"}</span>
            </div>
            <div className="detail-row">
              <span className="label">Department:</span>
              <span className="value">{searchResult.Department || "N/A"}</span>
            </div>
            <div className="detail-row">
              <span className="label">Residence Status:</span>
              <span className="value">
                {searchResult["Resident Status"] === true
                  ? "Resident"
                  : "Non-Resident"}
              </span>
            </div>
            <div className="detail-row">
              <span className="label">Hall Name:</span>
              <span className="value">{hallCodeToName(hallId)}</span>
            </div>
            <div className="detail-row">
              <span className="label">Polling Center:</span>
              <span className="value">
                {pollingCenterName(hallId)}
                <br />
                {pollingCenterBanglaName(hallId)}
              </span>
            </div>
          </div>

          {/* <div
            style={{
              margin: "24px 0",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "1.2em",
              color: "#2c3e50",
            }}
          >
            Vote for Husband & Wife
          </div> */}

          {/* Candidate Information Section */}
          {/* <div
            className="candidate-info-container"
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "32px",
            }}
          >
            <div
              className="candidate-card left-candidate"
              style={{
                background: "#eaf6fb",
                padding: "16px",
                borderRadius: "6px",
                width: "48%",
              }}
            >
              <h3 style={{ margin: "0 0 8px 0", color: "#222" }}>
                মোঃ হাবিবুর রহমান
              </h3>
              <h3
                style={{
                  fontWeight: "bold",
                  margin: "0 0 8px 0",
                  color: "#222",
                }}
              >
                কেন্দ্রীয় নির্বাহী সদস্য
              </h3>
              <p
                className="ballot-number"
                style={{ color: "#2c3e50", margin: 0 }}
              >
                ব্যালট নং - ১৯
              </p>
            </div>
            <div
              className="candidate-card right-candidate"
              style={{
                background: "#fdf6e3",
                padding: "16px",
                borderRadius: "6px",
                width: "48%",
              }}
            >
              <h3 style={{ margin: "0 0 8px 0", color: "#222" }}>
                সানজিদা আক্তার
              </h3>
              <h3 style={{ margin: "0 0 8px 0", color: "#222" }}>
                মন্নুজান হল বিতর্ক সম্পাদক
              </h3>
              <p
                className="ballot-number"
                style={{ color: "#2c3e50", margin: 0 }}
              >
                ব্যালট নং - ১
              </p>
            </div>
          </div> */}
        </div>
      )}

      {/* <div>
        Developed by <a href="https://www.linkedin.com/in/pipra--/" target="_blank" rel="noopener noreferrer">Habibur Rahman</a> & <a href="https://www.linkedin.com/in/shuvo-roy-596814267/" target="_blank" rel="noopener noreferrer"> Shuvo Roy</a> 

      </div> */}
      {/* Always show copyright */}
      <div
        style={{
          marginTop: "32px",
          textAlign: "center",
          color: "#888",
          fontSize: "0.95em",
        }}
      >
        &copy; {new Date().getFullYear()} RUCSU Voter Search
      </div>
    </div>
  );
}
export default App;
