# Campfire Chronicles - Campsite Review Website

Campfire Chronicles is a captivating portfolio app that showcases my adeptness with a wide range of technologies, including MongoDB, JavaScript, HTML, CSS, Bootstrap, Node.js, Leaflet.js mapping, Express, Cloudinary image storing, and Passport.js. As a campsite review application, Campfire Chronicles is designed to offer outdoor enthusiasts a seamless and immersive experience in exploring and sharing their camping adventures.

## [Live Demo](https://campfirechronicles.onrender.com/)
This app is deployed on [Render](https://campfirechronicles.onrender.com/) free tier. So please give the service time to spin up for the demo.

## Technologies

- MongoDB
- JavaScript
- HTML
- CSS
- Bootstrap v5.3
- Node.js
- Leaflet.js
- Express
- EJS
- Cloudinary
- Passport.js
- Axios
- Mongoose

## Features

- Robust backend powered by MongoDB, Node.js, and Express for efficient data storage and retrieval.
- Modern and intuitive frontend user interface built with HTML, CSS, and Bootstrap.
- Interactive maps powered by Leaflet.js for easy navigation and visualization of campsite locations.
- Cloudinary integration for secure and accessible image storage and sharing.
- Passport.js for secure user authentication and authorization, enabling personalized features and interactions within the app's community.
- Using the [US Census API](https://geocoding.geo.census.gov/geocoder/Geocoding_Services_API.html) for geocoding to intergrate with Leaflet.js & [OpenStreetMap](https://www.openstreetmap.org/copyright) tiles.

## Description

With its robust backend powered by MongoDB, Node.js, and Express, Campfire Chronicles efficiently handles data storage, retrieval, and manipulation. The integration of MongoDB allows for flexible and scalable data management, ensuring a seamless user experience even as the app grows in popularity.

The frontend of Campfire Chronicles boasts a modern and intuitive user interface built using HTML, CSS, and Bootstrap, providing users with a visually appealing and responsive design across various devices. The implementation of Leaflet.js mapping further enhances the app's functionality, enabling users to easily navigate and visualize campsite locations with interactive maps.

One of the standout features of Campfire Chronicles is its integration with Cloudinary for image storage. Users can effortlessly upload and share their camping photos, which are securely stored and easily accessible. This integration showcases my ability to handle media assets effectively, providing users with a rich visual experience.

To ensure a secure and personalized experience, Campfire Chronicles employs Passport.js for user authentication and authorization. This enables users to create accounts, log in securely, and access features such as leaving campsite reviews and interacting with other users within the app's community via comments.

Overall, Campfire Chronicles demonstrates my proficiency in a comprehensive stack of web development technologies. From its seamless integration of databases and server-side technologies to its visually appealing and user-friendly frontend, the app serves as a testament to my skills in creating dynamic and engaging web applications.

## Deployment

To deploy Campfire Chronicles:

1. Clone the repository:
   ```
   git clone https://github.com/Hthrace/CampfireChronicles.git
   ```

2. Install dependencies:
   ```
   cd CampfireChronicles
   npm install
   ```

3. Set environment variables:
   ```
   DB_URL=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_KEY=your_cloudinary_api_key
   CLOUDINARY_SECRET=your_cloudinary_api_secret
   SESSION_SECRET=your_session_secret
   ```

4. Run:
   ```
   node index.js
   ```

6. Access the app at your server's domain/IP address.

Notes:
- Ensure you have signed up for [Cloudinary](https://cloudinary.com) & either use [MongoDB](https://www.mongodb.com) local or create a free cluster on their [site](https://www.mongodb.com).


## Contribution

This project is a personal portfolio app, and I currently do not accept contributions. However, you are free to fork the repository and modify it to suit your needs. If you have any suggestions or find issues, feel free to create an issue in the repository. This app is deployed on [Render](https://render.com) free tier using [Cloudinary](https://cloudinary.com) free tier for images and [MongoDB](https://www.mongodb.com) free cluster for database. 

## License

The content of this project is licensed under the [MIT License](LICENSE).
---


