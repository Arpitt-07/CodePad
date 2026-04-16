const JDOODLE_CLIENT_ID = process.env.JDoodle_ClientID; 
const JDOODLE_CLIENT_SECRET = process.env.JDoodle_Client_Secrete;

const JDOODLE_CONFIG = {
  63: { language: 'nodejs',  versionIndex: '4' }, 
  54: { language: 'cpp17',   versionIndex: '1' }, 
  71: { language: 'python3', versionIndex: '4' }, 
};

module.exports = {
  JDOODLE_CLIENT_ID,
  JDOODLE_CLIENT_SECRET,
  JDOODLE_CONFIG
};
