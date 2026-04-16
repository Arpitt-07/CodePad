const { JDOODLE_CLIENT_ID, JDOODLE_CLIENT_SECRET, JDOODLE_CONFIG } = require('../config/jdoodle');

const compileCode = async (req, res) => {
  const { code, languageId } = req.body;
  const langId = Number(languageId);
  if (typeof code !== 'string' || !code.trim()) {
    return res.status(400).json({ stderr: 'Code cannot be empty.' });
  }
  if (!JDOODLE_CONFIG[langId]) {
    return res.status(400).json({ stderr: `Unsupported languageId: ${langId}.` });
  }

  const { language, versionIndex } = JDOODLE_CONFIG[langId];

  try {
    console.log(`🚀 Sending ${language} code to JDoodle API...`);
    
    const response = await fetch('https://api.jdoodle.com/v1/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        clientId: JDOODLE_CLIENT_ID,
        clientSecret: JDOODLE_CLIENT_SECRET,
        script: code,
        language: language,
        versionIndex: versionIndex
      })
    });

    const data = await response.json();
    if (data.error) {
      return res.json({ stderr: `JDoodle Error: ${data.error}` });
    }

    const outputString = data.output || "";
    if (outputString.toLowerCase().includes("error") || outputString.toLowerCase().includes("exception")) {
       return res.json({ stderr: outputString });
    }

    res.json({ stdout: outputString });

  } catch (error) {
    console.error('JDoodle Network Error:', error);
    res.status(500).json({ stderr: 'Failed to connect to execution engine.' });
  }
};

module.exports = {
  compileCode
};
