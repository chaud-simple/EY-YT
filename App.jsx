import { useState, useRef, useEffect } from "react";

const CATEGORIES = [
  { label: "🍜 Restaurant", value: "restaurant", color: "#E8572A" },
  { label: "☕ Café", value: "cafe", color: "#8B5E3C" },
  { label: "🏯 Attraction", value: "attraction", color: "#2A6EE8" },
  { label: "🛍️ Shopping", value: "shopping", color: "#9B2AE8" },
  { label: "🌸 Nature", value: "nature", color: "#2AAE5A" },
  { label: "🍺 Bar & Nightlife", value: "bar", color: "#1A1A2E" },
];

const THEMES = [
  { id: "bright", label: "☀️ Bright", bg: "#FFFDF7", accent: "#E8572A", text: "#1A1A1A", sub: "#6B6B6B" },
  { id: "seoul", label: "🌃 Seoul Night", bg: "#0D0D1A", accent: "#FF6B9D", text: "#F0F0FF", sub: "#9090B0" },
  { id: "hanok", label: "🏘️ Hanok", bg: "#F5EFE0", accent: "#8B4513", text: "#2C1810", sub: "#7A6355" },
];

function InfoCard({ data, theme, cardRef }) {
  const cat = CATEGORIES.find(c => c.value === data.category) || CATEGORIES[0];
  const t = THEMES.find(t => t.id === theme) || THEMES[0];

  const styles = {
    card: {
      width: "540px",
      minHeight: "320px",
      background: t.bg,
      borderRadius: "20px",
      overflow: "hidden",
      fontFamily: "'Noto Sans KR', 'Segoe UI', sans-serif",
      boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
      position: "relative",
    },
    header: {
      background: cat.color,
      padding: "24px 28px 20px",
      position: "relative",
    },
    categoryBadge: {
      display: "inline-block",
      background: "rgba(255,255,255,0.25)",
      color: "#fff",
      fontSize: "12px",
      fontWeight: "700",
      letterSpacing: "1.5px",
      textTransform: "uppercase",
      padding: "4px 12px",
      borderRadius: "20px",
      marginBottom: "10px",
    },
    placeName: {
      color: "#fff",
      fontSize: "26px",
      fontWeight: "800",
      margin: "0 0 4px 0",
      lineHeight: "1.2",
      textShadow: "0 2px 8px rgba(0,0,0,0.2)",
    },
    koreanName: {
      color: "rgba(255,255,255,0.8)",
      fontSize: "15px",
      fontWeight: "400",
      margin: 0,
    },
    body: {
      padding: "22px 28px 24px",
    },
    description: {
      color: t.text,
      fontSize: "14px",
      lineHeight: "1.7",
      marginBottom: "18px",
      fontStyle: "italic",
      opacity: 0.85,
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "12px",
      marginBottom: "16px",
    },
    infoItem: {
      display: "flex",
      flexDirection: "column",
      gap: "2px",
    },
    infoLabel: {
      fontSize: "10px",
      fontWeight: "700",
      letterSpacing: "1.2px",
      textTransform: "uppercase",
      color: t.sub,
    },
    infoValue: {
      fontSize: "13px",
      color: t.text,
      fontWeight: "500",
    },
    tip: {
      background: theme === "seoul" ? "rgba(255,107,157,0.12)" : theme === "hanok" ? "rgba(139,69,19,0.1)" : "rgba(232,87,42,0.08)",
      border: `1.5px solid ${cat.color}33`,
      borderLeft: `4px solid ${cat.color}`,
      borderRadius: "8px",
      padding: "10px 14px",
      marginTop: "4px",
    },
    tipLabel: {
      fontSize: "10px",
      fontWeight: "700",
      letterSpacing: "1px",
      textTransform: "uppercase",
      color: cat.color,
      marginBottom: "3px",
    },
    tipText: {
      fontSize: "13px",
      color: t.text,
      lineHeight: "1.5",
    },
    footer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 28px",
      borderTop: `1px solid ${theme === "seoul" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`,
    },
    channel: {
      fontSize: "11px",
      color: t.sub,
      fontWeight: "600",
    },
    rating: {
      display: "flex",
      gap: "2px",
    },
  };

  const stars = data.rating ? "★".repeat(parseInt(data.rating)) + "☆".repeat(5 - parseInt(data.rating)) : "";

  return (
    <div style={styles.card} ref={cardRef}>
      <div style={styles.header}>
        <div style={styles.categoryBadge}>{cat.label}</div>
        <h2 style={styles.placeName}>{data.name || "Place Name"}</h2>
        {data.koreanName && <p style={styles.koreanName}>{data.koreanName}</p>}
      </div>
      <div style={styles.body}>
        {data.description && (
          <p style={styles.description}>"{data.description}"</p>
        )}
        <div style={styles.grid}>
          {data.address && (
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>📍 Location</span>
              <span style={styles.infoValue}>{data.address}</span>
            </div>
          )}
          {data.hours && (
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>🕐 Hours</span>
              <span style={styles.infoValue}>{data.hours}</span>
            </div>
          )}
          {data.price && (
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>💰 Price Range</span>
              <span style={styles.infoValue}>{data.price}</span>
            </div>
          )}
          {data.subway && (
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>🚇 Subway</span>
              <span style={styles.infoValue}>{data.subway}</span>
            </div>
          )}
        </div>
        {data.tip && (
          <div style={styles.tip}>
            <div style={styles.tipLabel}>✨ Tip</div>
            <div style={styles.tipText}>{data.tip}</div>
          </div>
        )}
      </div>
      <div style={styles.footer}>
        <span style={styles.channel}>{data.channel || "Korea Travel Vlog"}</span>
        {stars && <span style={{ color: "#FFB800", fontSize: "14px", letterSpacing: "1px" }}>{stars}</span>}
      </div>
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState(1);
  const [theme, setTheme] = useState("bright");
  const [generating, setGenerating] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [data, setData] = useState({
    name: "",
    koreanName: "",
    category: "restaurant",
    description: "",
    address: "",
    hours: "",
    price: "",
    subway: "",
    tip: "",
    rating: "4",
    channel: "",
  });
  const cardRef = useRef(null);

  // Load html2canvas
  useEffect(() => {
    if (!window.html2canvas) {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
      document.head.appendChild(script);
    }
  }, []);

  const update = (field, value) => setData(prev => ({ ...prev, [field]: value }));

  const generateDescription = async () => {
    if (!data.name) return;
    setGenerating(true);
    try {
      const prompt = `Write a SHORT, warm, and inviting 1-2 sentence English description for a Korean travel YouTube video info card about this place:
Place name: ${data.name} ${data.koreanName ? `(${data.koreanName})` : ""}
Category: ${data.category}
${data.tip ? `Notes: ${data.tip}` : ""}
Write as if you personally visited. Keep it under 30 words. No hashtags.`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const result = await response.json();
      const text = result.content?.[0]?.text?.trim().replace(/^["']|["']$/g, "");
      if (text) update("description", text);
    } catch (e) {
      console.error(e);
    }
    setGenerating(false);
  };

  const downloadCard = async () => {
    if (!cardRef.current || !window.html2canvas) {
      alert("Still loading... please try again in a second!");
      return;
    }
    setDownloading(true);
    try {
      const canvas = await window.html2canvas(cardRef.current, {
        scale: 3,
        backgroundColor: null,
        useCORS: true,
        logging: false,
      });
      const link = document.createElement("a");
      link.download = `${data.name || "info-card"}-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (e) {
      alert("Download failed. Try again!");
    }
    setDownloading(false);
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "2px solid #E8E8E8",
    fontSize: "15px",
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    display: "block",
    fontSize: "13px",
    fontWeight: "700",
    color: "#444",
    marginBottom: "6px",
  };

  const bigBtn = {
    padding: "14px 28px",
    borderRadius: "12px",
    border: "none",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s",
    fontFamily: "inherit",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F7F5F0", fontFamily: "'Noto Sans KR', 'Segoe UI', sans-serif" }}>
      {/* Header */}
      <div style={{ background: "#E8572A", padding: "20px 24px", textAlign: "center" }}>
        <h1 style={{ margin: 0, color: "#fff", fontSize: "22px", fontWeight: "800" }}>🇰🇷 Korea Travel Card Maker</h1>
        <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,0.85)", fontSize: "14px" }}>
          Make beautiful info cards for your YouTube videos — no design skills needed!
        </p>
      </div>

      {/* Steps indicator */}
      <div style={{ display: "flex", justifyContent: "center", gap: "0", padding: "20px 24px 0" }}>
        {["1. Fill Info", "2. Pick Style", "3. Download"].map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center" }}>
            <div
              onClick={() => setStep(i + 1)}
              style={{
                padding: "8px 16px",
                borderRadius: "20px",
                background: step === i + 1 ? "#E8572A" : step > i + 1 ? "#2AAE5A" : "#E0E0E0",
                color: step >= i + 1 ? "#fff" : "#888",
                fontSize: "13px",
                fontWeight: "700",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {step > i + 1 ? "✓ " : ""}{s}
            </div>
            {i < 2 && <div style={{ width: "20px", height: "2px", background: step > i + 1 ? "#2AAE5A" : "#E0E0E0" }} />}
          </div>
        ))}
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "20px 16px 40px", display: "flex", gap: "24px", flexWrap: "wrap" }}>
        {/* Left panel */}
        <div style={{ flex: "1", minWidth: "320px" }}>
          {/* Step 1 */}
          {step === 1 && (
            <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}>
              <h2 style={{ margin: "0 0 20px", fontSize: "18px", color: "#1A1A1A" }}>📝 Step 1: Tell us about the place</h2>

              <div style={{ marginBottom: "16px" }}>
                <label style={labelStyle}>Category *</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.value}
                      onClick={() => update("category", cat.value)}
                      style={{
                        padding: "8px 14px",
                        borderRadius: "20px",
                        border: "2px solid",
                        borderColor: data.category === cat.value ? cat.color : "#E0E0E0",
                        background: data.category === cat.value ? cat.color : "#fff",
                        color: data.category === cat.value ? "#fff" : "#555",
                        fontSize: "13px",
                        fontWeight: "600",
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={labelStyle}>Place Name (English) *</label>
                <input style={inputStyle} placeholder="e.g. Gyeongbokgung Palace" value={data.name} onChange={e => update("name", e.target.value)} />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={labelStyle}>Korean Name (optional)</label>
                <input style={inputStyle} placeholder="e.g. 경복궁" value={data.koreanName} onChange={e => update("koreanName", e.target.value)} />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={labelStyle}>Your Channel Name</label>
                <input style={inputStyle} placeholder="e.g. Mom's Korea Travel" value={data.channel} onChange={e => update("channel", e.target.value)} />
              </div>

              <div style={{ marginBottom: "6px" }}>
                <label style={labelStyle}>Short Description (English)</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <textarea
                    style={{ ...inputStyle, resize: "vertical", minHeight: "70px" }}
                    placeholder="A short description about this place..."
                    value={data.description}
                    onChange={e => update("description", e.target.value)}
                  />
                </div>
              </div>
              <button
                onClick={generateDescription}
                disabled={generating || !data.name}
                style={{
                  ...bigBtn,
                  background: generating ? "#ccc" : "#2A6EE8",
                  color: "#fff",
                  fontSize: "13px",
                  padding: "10px 16px",
                  marginBottom: "16px",
                  width: "100%",
                }}
              >
                {generating ? "✨ Writing description..." : "✨ Auto-write description for me!"}
              </button>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
                <div>
                  <label style={labelStyle}>📍 Area / Address</label>
                  <input style={inputStyle} placeholder="e.g. Jongno-gu, Seoul" value={data.address} onChange={e => update("address", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>🕐 Opening Hours</label>
                  <input style={inputStyle} placeholder="e.g. 9am – 6pm daily" value={data.hours} onChange={e => update("hours", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>💰 Price Range</label>
                  <input style={inputStyle} placeholder="e.g. ₩10,000–20,000" value={data.price} onChange={e => update("price", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>🚇 Nearest Subway</label>
                  <input style={inputStyle} placeholder="e.g. Gyeongbokgung Stn." value={data.subway} onChange={e => update("subway", e.target.value)} />
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={labelStyle}>✨ Your Personal Tip</label>
                <input style={inputStyle} placeholder="e.g. Go early morning to avoid crowds!" value={data.tip} onChange={e => update("tip", e.target.value)} />
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={labelStyle}>⭐ Your Rating</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  {[1, 2, 3, 4, 5].map(n => (
                    <button
                      key={n}
                      onClick={() => update("rating", String(n))}
                      style={{
                        width: "44px", height: "44px", borderRadius: "10px", border: "2px solid",
                        borderColor: parseInt(data.rating) >= n ? "#FFB800" : "#E0E0E0",
                        background: parseInt(data.rating) >= n ? "#FFF8E1" : "#fff",
                        fontSize: "22px", cursor: "pointer",
                      }}
                    >★</button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                style={{ ...bigBtn, background: "#E8572A", color: "#fff", width: "100%", fontSize: "17px" }}
              >
                Next: Pick a Style →
              </button>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}>
              <h2 style={{ margin: "0 0 20px", fontSize: "18px", color: "#1A1A1A" }}>🎨 Step 2: Pick a card style</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
                {THEMES.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    style={{
                      padding: "16px 20px",
                      borderRadius: "12px",
                      border: "3px solid",
                      borderColor: theme === t.id ? t.accent : "#E0E0E0",
                      background: t.bg,
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      textAlign: "left",
                    }}
                  >
                    <span style={{ fontSize: "28px" }}>{t.label.split(" ")[0]}</span>
                    <div>
                      <div style={{ fontWeight: "700", fontSize: "15px", color: t.text }}>{t.label.split(" ").slice(1).join(" ")}</div>
                      <div style={{ fontSize: "12px", color: t.sub, marginTop: "2px" }}>
                        {t.id === "bright" ? "Clean, modern and easy to read" : t.id === "seoul" ? "Moody and stylish for nightlife & trendy spots" : "Warm and cozy, great for traditional places"}
                      </div>
                    </div>
                    {theme === t.id && <span style={{ marginLeft: "auto", color: t.accent, fontSize: "20px" }}>✓</span>}
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => setStep(1)} style={{ ...bigBtn, background: "#F0F0F0", color: "#555", flex: 1 }}>← Back</button>
                <button onClick={() => setStep(3)} style={{ ...bigBtn, background: "#E8572A", color: "#fff", flex: 2 }}>Next: Download →</button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}>
              <h2 style={{ margin: "0 0 8px", fontSize: "18px", color: "#1A1A1A" }}>📲 Step 3: Download your card!</h2>
              <p style={{ margin: "0 0 20px", color: "#666", fontSize: "14px", lineHeight: "1.6" }}>
                Your card is ready! Tap the big button to save the image to your phone. Then you can add it to your video!
              </p>
              <div style={{ background: "#F7FFF9", border: "2px solid #2AAE5A", borderRadius: "12px", padding: "16px", marginBottom: "20px" }}>
                <div style={{ fontWeight: "700", color: "#2AAE5A", marginBottom: "6px" }}>📱 How to add to your video:</div>
                <ol style={{ margin: 0, paddingLeft: "18px", fontSize: "13px", color: "#444", lineHeight: "2" }}>
                  <li>Tap the download button below</li>
                  <li>Find the image in your Photos app</li>
                  <li>Add it to your video editing app as an overlay or image clip</li>
                </ol>
              </div>
              <button
                onClick={downloadCard}
                disabled={downloading}
                style={{
                  ...bigBtn,
                  background: downloading ? "#ccc" : "#2AAE5A",
                  color: "#fff",
                  width: "100%",
                  fontSize: "18px",
                  padding: "18px",
                  marginBottom: "12px",
                }}
              >
                {downloading ? "⏳ Saving..." : "⬇️ Download Card Image"}
              </button>
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => setStep(2)} style={{ ...bigBtn, background: "#F0F0F0", color: "#555", flex: 1, fontSize: "14px" }}>← Change Style</button>
                <button onClick={() => { setStep(1); setData({ ...data, name: "", koreanName: "", description: "", address: "", hours: "", price: "", subway: "", tip: "", rating: "4" }); }} style={{ ...bigBtn, background: "#FFF0EC", color: "#E8572A", flex: 1, fontSize: "14px" }}>+ New Place</button>
              </div>
            </div>
          )}
        </div>

        {/* Right panel: Card Preview */}
        <div style={{ flex: "1", minWidth: "320px" }}>
          <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.07)", position: "sticky", top: "20px" }}>
            <h3 style={{ margin: "0 0 16px", fontSize: "15px", color: "#666", fontWeight: "600" }}>👀 Live Preview</h3>
            <div style={{ display: "flex", justifyContent: "center", transform: "scale(0.85)", transformOrigin: "top center", marginBottom: "-40px" }}>
              <InfoCard data={data} theme={theme} cardRef={cardRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
