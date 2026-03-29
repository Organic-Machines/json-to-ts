// src/App.jsx
import { useState } from 'react';
import styles from './App.module.css'; // Import our new styles

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [tsOutput, setTsOutput] = useState('');

  const generateInterface = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      let result = "interface GeneratedInterface {\n";

      for (const key in parsed) {
        const value = parsed[key];
        
        if (Array.isArray(value)) {
          // Check the first item to see what's in the list
          const innerType = value.length > 0 ? typeof value[0] : 'any';
          result += `  ${key}: ${innerType}[];\n`;
        } else {
          result += `  ${key}: ${typeof value};\n`;
        }
      }

      result += "}";
      setTsOutput(result);
    } catch (e) {
      setTsOutput("// Error: Please provide valid JSON");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>JSON → TypeScript</h1>
      
      <div className={styles.editorGrid}>
        <div>
          <label>Input JSON</label>
          <textarea 
            className={styles.textarea}
            placeholder='{ "id": 1, "tags": ["tech", "web"] }'
            onChange={(e) => setJsonInput(e.target.value)}
          />
        </div>
        
        <div>
          <label>Output Interface</label>
          <pre className={styles.output}>
            {tsOutput || "// Output will appear here..."}
          </pre>
        </div>
      </div>

      <button className={styles.button} onClick={generateInterface}>
        Transform Data
      </button>
    </div>
  );
}

export default App;