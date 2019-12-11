var viewer;
var loadedModel = false;

function launchViewer(urn) {
  var options = {
    env: 'AutodeskProduction',
    getAccessToken: getForgeToken
  };

  if (loadedModel === false) {
    Autodesk.Viewing.Initializer(options, () => {
      viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), { extensions: ['HandleSelectionExtension'] });
      viewer.start();
      var documentId = 'urn:' + urn;
      Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
    });
  }
  else {

    var documentIdNextModel = 'urn:' + urn;
    Autodesk.Viewing.Document.load(documentIdNextModel, onDocumentLoadNextSuccess, onDocumentLoadFailure);
  }
  
}

function onDocumentLoadSuccess(doc) {
  var viewables = doc.getRoot().getDefaultGeometry();
  viewer.loadDocumentNode(doc, viewables).then(i => {
    // documented loaded, any action?
    loadedModel = true
  });
}

function onDocumentLoadNextSuccess(doc) {

  var viewables = doc.getRoot().getDefaultGeometry();
  var lmvDoc = doc;
  var initialViewable = viewables.children[0];
  var svfUrl = lmvDoc.getViewablePath(initialViewable);
  var points = {x:0,y:0,z:0};


  var modelOptions = {
    sharedPropertyDbPath: lmvDoc.getFullPath(doc.getRoot().findPropertyDbPath()),
    placementTransform: buildTransformMatrix(points)
  };

  viewer.loadModel(svfUrl, modelOptions , (model) => {});
}



function onDocumentLoadFailure(viewerErrorCode) {
  console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
}

function getForgeToken(callback) {
  fetch('/api/forge/oauth/token').then(res => {
    res.json().then(data => {
      callback(data.access_token, data.expires_in);
    });
  });
}
