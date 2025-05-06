import { Client, Databases, ID } from 'appwrite'

const client = new Client().setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT)
    .setProject(process.env.REACT_APP_APPWRITE_PROJECT);

const databases = new Databases(client);

async function getVisitorInfo() {
    const res = await fetch('https://ipapi.co/json/');
    const data = await res.json();
  
    return {
      ip: data.ip,
      address: `${data.city}, ${data.region}, ${data.country_name}`,
    };
  }

export const logTraffic =  async function logTraffic() {
    const { ip, address } = await getVisitorInfo();
    const access_time = new Date().toISOString();
  
    await databases.createDocument(
      process.env.REACT_APP_APPWRITE_DATABASE,         // your database ID
      process.env.REACT_APP_APPWRITE_COLLECTION,        // your collection ID
      ID.unique(),             // generate unique doc ID
      {
        ip,
        address,
        access_time,
      }
    );}
