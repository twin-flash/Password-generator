import { useState, useEffect } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { IoCopy } from "react-icons/io5";

const App = () => {
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(false);
  const [includeLower, setIncludeLower] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  const generatePassword = () => {
    let charSet = "";
    if (includeUpper) charSet += upperChars;
    if (includeLower) charSet += lowerChars;
    if (includeNumbers) charSet += numberChars;
    if (includeSymbols) charSet += symbolChars;
    if (!charSet) return;

    let generated = "";
    for (let i = 0; i < length; i++) {
      generated += charSet[Math.floor(Math.random() * charSet.length)];
      setPassword(generated);
    }
    setPassword(generated);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols]);

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStrenght = () => {
    let strength = 0;
    if (includeUpper) strength += 1;
    if (includeLower) strength += 1;
    if (includeNumbers) strength += 1;
    if (includeSymbols) strength += 1;
    if (length >= 12) strength += 1;

    if (strength <= 2) return "Weak";
    if (strength === 3) return "Medium";
    if (strength >= 4) return "Strong";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="bg-gray-900 text-gray-200 w-full max-w-md p-6 rounded-2xl shadow-xl border-gray-800">
        <h1 className="text-2xl font-bold text-center mb-4">
          PassWord-Generator
        </h1>
        <div className="flex mb-4 justify-center">
          <input
            type="text"
            value={password}
            placeholder="Generate Password"
            readOnly
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-l-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-default"
          />
          <button onClick={copyToClipboard} className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 px-4 py-2.5 rounded-r-lg transition-colors duration-200 flex items-center justify-center text-white">
            { copied ? <IoCopy className="text-xl"/> :  <IoCopyOutline className="text-xl" />}
          </button>
        </div>

        {/* ------Password Strength Meter------ */}
        <div className=" mb-4">
          <label htmlFor="" className="block mb-2 text-sm font-medium">
            PassWord Length
          </label>
          <input
            type="range"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            min={6}
            max={20}
            className="w-full accent-indigo-600 "
          />
        </div>
        {/* ------Options------ */}
        <div className="space-y-3 mb-6">
          <label className="flex items-center justify-between cursor-pointer">
            <span>Include UpperCase</span>
            <input type="checkbox" className="accent-indigo-600" onChange={() => setIncludeUpper(!includeUpper)}/>
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span>Include LowerCase</span>
            <input type="checkbox" className="accent-indigo-600" onChange={() => setIncludeLower(!includeLower)}/>
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span>Include Numbers</span>
            <input type="checkbox" className="accent-indigo-600" onChange={() => setIncludeNumbers(!includeNumbers)}/>
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span>Include Symbols</span>
            <input type="checkbox" className="accent-indigo-600" onChange={() => setIncludeSymbols(!includeSymbols)}/>
          </label>
          <button className="w-full p-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition cursor-pointer">
            Generate Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
