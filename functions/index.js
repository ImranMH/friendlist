/*const functions = require('firebase-functions');

const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');
const cors = require('cors')({origin:true})
const Busboy = require('busboy');
 // Initialize Firebase
  var config = {
    // apiKey: "AIzaSyCyVqqTwpI62Grb-PcxfTyXdu3yKieQkoE",
    // authDomain: "testwithvue-24462.firebaseapp.com",
    // databaseURL: "https://testwithvue-24462.firebaseio.com",
    // projectId: "testwithvue-24462",
    // storageBucket: "testwithvue-24462.appspot.com",
    // messagingSenderId: "172335638494"
    projectId:'testwithvue-24462',
    keyFilename: 'testwithvue-24462-firebase-adminsdk-wulde-bd6c27a2ac.json'
  };

const gcs = require('@google-cloud/storage')(config);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.onFileChange = functions.storage.object().onFinalize (event => {

  console.log('file uploading complited, start execution function')
  const bucket = event.bucket;
  const contentType = event.contentType
  const filePath = event.name


  if (path.basename(filePath).startsWith('thumbnail-')){
    console.log('we alrady renamed that file')
    return;
  }
  //  if (event.resourceState=== 'not_exists'){
  //   console.log('deleted a file')
  //   return
  // } 
  // Download file from bucket.
  const destBucket = gcs.bucket(bucket)
  const tempFilePath = path.join(os.tmpdir(), path.basename(filePath) )
  const metadata = {
    contentType: contentType,
  };
  
  return destBucket.file(filePath).download({
    destination: tempFilePath
  }).then(()=>{
    return spawn('convert', [tempFilePath, '-resize', '300x200', tempFilePath])
  }).then(()=>{
    return destBucket.upload(tempFilePath, {
      destination: 'thumbnail-'+ path.basename(filePath),
      metadata: metadata
    })
  }).then(() => fs.unlinkSync(tempFilePath));
});

exports.fileUpload = functions.https.onRequest((request, response) => {
  cors(request,response,()=>{
    if (request.method !== "POST") {
     return response.status(500).json({
       message: "it is not a post request",
       status: 'Access denied'
     });
    }
  var busboy = new Busboy({ headers: request.headers });
  let uploadData ;
  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    const tmpFilePath = path.join(os.tmpdir(), filename )
    uploadData ={
      file:tmpFilePath, type:mimetype
    }
    console.log(uploadData)
    file.pipe(fs.createWriteStream(tmpFilePath))
  })
  busboy.on('finish',()=>{
    const bucket = gcs.bucket('testwithvue-24462.appspot.com')
    bucket.upload(uploadData.file, {
      uploadType: 'media',
      metadata:{
        metadata:{
          contentType:uploadData.type
        }
      }
    }).then(()=>{     
      response.status(200).json({
        message: "Hello from Firebase!",
        status: 'its work correctly'
      })
     
    }
  ).catch((err) => {
      return response.json({
        error: err,
        msg: 'error uploading image'
      })
    }) 
  })
  busboy.end(response.rawBody)
  })

});
*/
const functions = require("firebase-functions");
const os = require("os");
const path = require("path");
const spawn = require("child-process-promise").spawn;
const cors = require("cors")({
  origin: true
});
const Busboy = require("busboy");
const fs = require("fs");

const gcconfig = {
  projectId: "testwithvue-24462",
  keyFilename: "testwithvue-24462-firebase-adminsdk-wulde-bd6c27a2ac.json"
};

const gcs = require("@google-cloud/storage")(gcconfig);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.onFileChange = functions.storage.object().onFinalize(event => {

  console.log('file uploading complited, start execution function')
  const bucket = event.bucket;
  const contentType = event.contentType
  const filePath = event.name


  if (path.basename(filePath).startsWith('thumbnail-')) {
    console.log('we alrady renamed that file')
    return;
  }
  //  if (event.resourceState=== 'not_exists'){
  //   console.log('deleted a file')
  //   return
  // } 
  // Download file from bucket.
  const destBucket = gcs.bucket(bucket)
  const tempFilePath = path.join(os.tmpdir(), path.basename(filePath))
  const metadata = {
    contentType: contentType,
  };

  return destBucket.file(filePath).download({
    destination: tempFilePath
  }).then(() => {
    return spawn('convert', [tempFilePath, '-resize', '300x200', tempFilePath])
  }).then(() => {
    return destBucket.upload(tempFilePath, {
      destination: 'thumbnail-' + path.basename(filePath),
      metadata: metadata
    })
  }).then(() => fs.unlinkSync(tempFilePath));
});

exports.uploadFile = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== "POST") {
      return res.status(500).json({
        message: "Not allowed"
      });
    }
    const busboy = new Busboy({
      headers: req.headers
    });
    let uploadData = null;

    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      const filepath = path.join(os.tmpdir(), filename);
      uploadData = {
        file: filepath,
        type: mimetype
      };
      file.pipe(fs.createWriteStream(filepath));
    });

    busboy.on("finish", () => {
      const bucket = gcs.bucket('testwithvue-24462.appspot.com');
      bucket
        .upload(uploadData.file, {
          uploadType: "media",
          metadata: {
            metadata: {
              contentType: uploadData.type
            }
          }
        })
        .then(() => {
          res.status(200).json({
            message: "It worked!"
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    });
    busboy.end(req.rawBody);
  });
});

exports.onDataAdded = functions.database.ref('/message/{id}').onCreate(event => {
  const data = event.data.val();
  const newData = {
    msg: event.params.id + '-' + data.msg.toUpperCase()
  };
  return event.data.ref.child('copiedData').set(newData);
});


/* 
  file upload api endpoint ============

  https: //us-central1-testwithvue-24462.cloudfunctions.net/uploadFile

*/