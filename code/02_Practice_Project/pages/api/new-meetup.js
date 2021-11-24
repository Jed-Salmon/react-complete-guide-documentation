// allows us to connect to our mongo database
import { MongoClient } from "mongodb";

// With NextJS we must use the folder name 'api'.
// We must place the api folder in the 'pages' folder.
// JavaScript file names act as path segments in the URL.
// Any JavaScript files stored within, NextJS turns into api routes, i.e. endpoints that can be targeted by requests and that should receive and return JSON.
// These API routes are not about defining, rendering or returning components.
// We instead define functions that contain server-side code because API routes will only run on the server never on the client.
// As they are never exposed to the client, we can use credentials in API routes without compromising them.
// These functions are triggered whenever a requests is sent to the specific route.
// The route for this file would be: '/api/new-meetup'

const handler = async (req, res) => {
  // The request object contains data about the incoming request.
  // The response object is used for sending back a response.
  // we can access the request fields: headers, body, method.
  if (req.method === "POST") {
    // access data from the request
    const data = req.body;

    // connect method returns a promise (requires async/await)
    const client = await MongoClient.connect(
      "mongodb+srv://jED:nlN6HKPByPPVipKE@cluster0.jljg1.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    // mongodb is a NoSQL database that works with collections full of documents.
    // collections would be tables in sql database and documents entries in tables.
    // a single meetup would be a document and the collection holds multiple meetups.
    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);
    // insertOne returns a promise so must be awaited.
    // It's a built in query command for inserting one new document into the collection.
    // A document is just a JavaScript object so we can pass in our raw data.

    console.log(result);
    // We could also add error handling for whether connecting or inserting failed.

    client.close(); // close the database connection once done

    // send back a response
    res.status(201).json({
      message: "Meetup successfully inserted.",
    });
    // Sets the HTTP status code which will be returned.
    // 201 status code indicates that something was inserted successfully.
    // chain JSON call to prepare the JSON data that will be added to the response.
  }
};

export default handler;
