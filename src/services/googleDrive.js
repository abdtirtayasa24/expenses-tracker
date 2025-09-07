import { gapi } from 'gapi-script';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

class GoogleDriveService {
  constructor() {
    this.isAuthenticated = false;
  }

  initClient = () => {
    return new Promise((resolve, reject) => {
      try {
        gapi.load('client:auth2', async () => {
          await gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            scope: SCOPES,
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
          });
          
          this.isAuthenticated = gapi.auth2.getAuthInstance().isSignedIn.get();
          resolve(this.isAuthenticated);
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  signIn = () => {
    return new Promise((resolve, reject) => {
      const authInstance = gapi.auth2.getAuthInstance();
      if (authInstance.isSignedIn.get()) {
        this.isAuthenticated = true;
        resolve(true);
      } else {
        authInstance.signIn()
          .then(() => {
            this.isAuthenticated = true;
            resolve(true);
          })
          .catch(reject);
      }
    });
  };

  signOut = () => {
    const authInstance = gapi.auth2.getAuthInstance();
    authInstance.signOut();
    this.isAuthenticated = false;
  };

  saveData = async (data) => {
    try {
      const fileContent = JSON.stringify(data, null, 2);
      const fileName = 'expense-tracker-data.json';
      
      // Check if file already exists
      const existingFile = await this.findFile(fileName);
      
      if (existingFile) {
        // Update existing file
        return await this.updateFile(existingFile.id, fileContent);
      } else {
        // Create new file
        return await this.createFile(fileName, fileContent);
      }
    } catch (error) {
      console.error('Error saving to Google Drive:', error);
      throw error;
    }
  };

  loadData = async () => {
    try {
      const fileName = 'expense-tracker-data.json';
      const existingFile = await this.findFile(fileName);
      
      if (existingFile) {
        const response = await gapi.client.drive.files.get({
          fileId: existingFile.id,
          alt: 'media'
        });
        return JSON.parse(response.body);
      }
      return null;
    } catch (error) {
      console.error('Error loading from Google Drive:', error);
      return null;
    }
  };

  findFile = async (fileName) => {
    try {
      const response = await gapi.client.drive.files.list({
        q: `name = '${fileName}' and trashed = false`,
        fields: 'files(id, name)'
      });
      
      return response.result.files && response.result.files[0];
    } catch (error) {
      console.error('Error finding file:', error);
      return null;
    }
  };

  createFile = async (fileName, content) => {
    const fileMetadata = {
      name: fileName,
      mimeType: 'application/json'
    };
    
    const file = new Blob([content], { type: 'application/json' });
    
    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(fileMetadata)], { type: 'application/json' }));
    form.append('file', file);
    
    return gapi.client.request({
      path: '/upload/drive/v3/files',
      method: 'POST',
      params: { uploadType: 'multipart' },
      headers: { 'Content-Type': 'multipart/related' },
      body: form,
    });
  };

  updateFile = async (fileId, content) => {
    const file = new Blob([content], { type: 'application/json' });
    
    return gapi.client.request({
      path: `/upload/drive/v3/files/${fileId}`,
      method: 'PATCH',
      params: { uploadType: 'media' },
      headers: { 'Content-Type': 'application/json' },
      body: file,
    });
  };
}

const googleDriveService = new GoogleDriveService();
export default googleDriveService;