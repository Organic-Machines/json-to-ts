import { useState } from 'react';
import styles from './App.module.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [tsOutput, setTsOutput] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const generateInterface = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      let result = "interface GeneratedInterface {\n";
      for (const key in parsed) {
        const value = parsed[key];
        if (Array.isArray(value)) {
          const innerType = value.length > 0 ? typeof value[0] : 'any';
          result += `  ${key}: ${innerType}[];\n`;
        } else {
          result += `  ${key}: ${typeof value};\n`;
        }
      }
      result += "}";
      setTsOutput(result);
      setCopySuccess(false);
    } catch (e) {
      setTsOutput("// Error: Please provide valid JSON");
    }
  };

  const handleCopy = async () => {
    if (!tsOutput || tsOutput.startsWith("//")) return;
    await navigator.clipboard.writeText(tsOutput);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>JSON → TypeScript</h1>
      
      <div className={styles.editorGrid}>
        {/* Left Column: Input */}
        <div className={styles.column}>
          <label className={styles.label}>Input JSON</label>
          <textarea 
            className={styles.textarea}
            placeholder='{ "id": 1, "tags": ["tech"] }'
            onChange={(e) => setJsonInput(e.target.value)}
          />
          <button className={`${styles.actionButton} ${styles.transformBtn}`} onClick={generateInterface}>
            Transform Data
          </button>
        </div>
        
        {/* Right Column: Output */}
        <div className={styles.column}>
          <label className={styles.label}>Output Interface</label>
          <pre className={styles.output}>
            {tsOutput || "// Output will appear here..."}
          </pre>
          <button 
            className={`${styles.actionButton} ${styles.copyBtn}`} 
            onClick={handleCopy}
            disabled={!tsOutput || tsOutput.startsWith("//")}
          >
            {copySuccess ? "✓ Copied!" : "Copy to Clipboard"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;